import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import './leaflet-global';
import 'leaflet-textpath';

// leaflet-textpath has no published types; declare the bit of its API we use.
declare module 'leaflet' {
  interface Polyline {
    setText(
      text: string | null,
      options?: {
        repeat?: boolean;
        offset?: number;
        attributes?: Record<string, string>;
        center?: boolean;
      }
    ): this;
  }
}

// leaflet-textpath repeats the (padded) text back-to-back to fill the whole path length;
// the gap between repeats is the padding on either side of the name. A small pad makes
// the name repeat almost continuously ("the river made of words"), so this needs to be
// wide enough to leave real blank stretches of river between each label.
const RIVER_LABEL_GAP = ' '.repeat(28);

// Repeats the river name at wide intervals along its whole course so the label stays
// readable no matter which part of the river is in view, and follows the line's curve
// instead of sitting horizontally.
const RIVER_TEXT_OPTIONS = {
  repeat: true,
  offset: -6,
  attributes: {
    fill: '#add8e6',
    'font-size': '12',
    'font-weight': '600',
    stroke: '#fbfbf9',
    'stroke-width': '3',
    'paint-order': 'stroke'
  }
};

/**
 * SVG textPath orients each glyph to follow the line's tangent direction, which comes
 * from the order its coordinates are stored in. Natural Earth's river coordinates run
 * in whatever direction they were digitized (often mouth-to-source), which is why the
 * labels were rendering upside down: reverse any line that runs right-to-left overall
 * so the text always reads left-to-right / upright.
 */
function orientLeftToRight(geometry: GeoJSON.Geometry): GeoJSON.Geometry {
  const fixLine = (line: [number, number][]): [number, number][] =>
    line[line.length - 1][0] < line[0][0] ? [...line].reverse() : line;

  if (geometry.type === 'LineString') {
    return { type: 'LineString', coordinates: fixLine(geometry.coordinates as [number, number][]) };
  }
  if (geometry.type === 'MultiLineString') {
    return { type: 'MultiLineString', coordinates: (geometry.coordinates as [number, number][][]).map(fixLine) };
  }
  return geometry;
}

/**
 * Douglas-Peucker line simplification: keeps only the points that deviate from the
 * straight line between two "anchor" points by more than `tolerance` (in degrees).
 * Used to build a smoothed stand-in path purely for text placement — SVG textPath
 * follows every kink of the actual line literally, which makes a label crooked and
 * unreadable at sharp bends. Leaflet has no OpenLayers-style `maxAngle` to skip that;
 * anchoring the text to a straighter, simplified copy of the line sidesteps it instead.
 */
function simplifyLine(points: [number, number][], tolerance: number): [number, number][] {
  if (points.length < 3) return points;

  const start = points[0];
  const end = points[points.length - 1];
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;

  const perpendicularDistance = ([x, y]: [number, number]): number => {
    if (lengthSquared === 0) return Math.hypot(x - x1, y - y1);
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / lengthSquared));
    return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
  };

  let maxDist = 0;
  let splitIndex = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i]);
    if (dist > maxDist) {
      maxDist = dist;
      splitIndex = i;
    }
  }

  if (maxDist <= tolerance) return [start, end];

  const left = simplifyLine(points.slice(0, splitIndex + 1), tolerance);
  const right = simplifyLine(points.slice(splitIndex), tolerance);
  return [...left.slice(0, -1), ...right];
}

// In degrees; smooths away sharp local kinks while keeping the river's overall shape.
const TEXT_PATH_SIMPLIFY_TOLERANCE = 0.06;

function simplifyGeometry(geometry: GeoJSON.Geometry, tolerance: number): GeoJSON.Geometry {
  if (geometry.type === 'LineString') {
    return { type: 'LineString', coordinates: simplifyLine(geometry.coordinates as [number, number][], tolerance) };
  }
  if (geometry.type === 'MultiLineString') {
    return {
      type: 'MultiLineString',
      coordinates: (geometry.coordinates as [number, number][][]).map((line) => simplifyLine(line, tolerance))
    };
  }
  return geometry;
}

interface MountainRange {
  name: string;
  lat: number;
  lng: number;
}

const MOUNTAIN_RANGES: MountainRange[] = [
  { name: 'Alpes', lat: 45.2, lng: 6.6 },
  { name: 'Pyrénées', lat: 42.8, lng: 0.6 },
  { name: 'Massif Central', lat: 45.3, lng: 3.0 },
  { name: 'Jura', lat: 46.6, lng: 6.1 },
  { name: 'Vosges', lat: 48.15, lng: 7.0 },
  { name: 'Ardennes', lat: 49.8, lng: 4.8 }
];

// A small silhouette with a few overlapping peaks, instead of a single triangle.
const MOUNTAIN_SVG = `<svg width="26" height="16" viewBox="0 0 26 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 16 L4 7 L7 11 L12 2 L16 10 L20 6 L26 16 Z" />
</svg>`;

// Departments and river labels only appear once the user has zoomed in enough: showing
// every river name at the same time as the (much fewer) regions is too dense to read.
const DEPARTMENTS_MIN_ZOOM = 8;
const RIVER_LABELS_MIN_ZOOM = 8;

@Component({
  selector: 'app-geography-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geography-explorer.component.html',
  styleUrls: ['./geography-explorer.component.css']
})
export class GeographyExplorerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map: L.Map | null = null;
  private departmentsLayer: L.GeoJSON | null = null;
  private departmentsShown = false;
  private riverLines: { layer: L.Polyline; name: string }[] = [];
  private riverLabelsShown = false;
  loading = true;
  loadError = false;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }

  private initMap(): void {
    const map = L.map(this.mapContainer.nativeElement, {
      center: [46.6, 2.5],
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
      attributionControl: false
    });
    this.map = map;

    L.control
      .attribution({ prefix: false })
      .addAttribution('Tracés : © IGN — france-geojson (Etalab) · Natural Earth')
      .addTo(map);

    this.addMountainLabels(map);
    void this.loadOverlays(map);

    map.on('zoomend', () => this.updateZoomDependentLayers(map));

    // Leaflet needs a layout pass once the container has its final size.
    setTimeout(() => map.invalidateSize(), 0);
  }

  private addMountainLabels(map: L.Map): void {
    for (const range of MOUNTAIN_RANGES) {
      const icon = L.divIcon({ className: 'mountain-icon', html: MOUNTAIN_SVG, iconSize: [26, 16], iconAnchor: [13, 16] });
      L.marker([range.lat, range.lng], { icon, interactive: false })
        .bindTooltip(range.name, { permanent: true, direction: 'right', className: 'mountain-label', offset: [6, -6] })
        .addTo(map);
    }
  }

  private async loadOverlays(map: L.Map): Promise<void> {
    try {
      const [regions, departements, rivers] = await Promise.all([
        this.fetchGeoJson('assets/geo/regions.geojson'),
        this.fetchGeoJson('assets/geo/departements.geojson'),
        this.fetchGeoJson('assets/geo/rivers.geojson')
      ]);

      const riversCollection = rivers as GeoJSON.FeatureCollection;
      const orientedRivers: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: riversCollection.features.map((feature) => ({
          ...feature,
          geometry: orientLeftToRight(feature.geometry)
        }))
      };

      L.geoJSON(orientedRivers, {
        style: { color: '#add8e6', weight: 1.5, opacity: 0.7 }
      }).addTo(map);

      // A separate, smoothed and invisible copy of each river purely to anchor the
      // label text (see simplifyGeometry above) — the visible line keeps full detail.
      const labelRivers: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: orientedRivers.features.map((feature) => ({
          ...feature,
          geometry: simplifyGeometry(feature.geometry, TEXT_PATH_SIMPLIFY_TOLERANCE)
        }))
      };

      L.geoJSON(labelRivers, {
        style: { opacity: 0, weight: 1 },
        interactive: false,
        onEachFeature: (feature, layer) => {
          const name = feature.properties?.['name'];
          if (name && layer instanceof L.Polyline) {
            this.riverLines.push({ layer, name });
          }
        }
      }).addTo(map);

      const regionsLayer = L.geoJSON(regions, {
        style: { color: '#2f6f4f', weight: 1.5, fillColor: '#2f6f4f', fillOpacity: 0.05 },
        onEachFeature: (feature, layer) => {
          const name = feature.properties?.['nom'];
          if (name) {
            layer.bindTooltip(name, { permanent: true, direction: 'center', className: 'region-label' });
          }
        }
      }).addTo(map);
      map.fitBounds(regionsLayer.getBounds(), { padding: [10, 10] });

      this.departmentsLayer = L.geoJSON(departements, {
        style: { color: '#b45309', weight: 1, dashArray: '2,3', fillOpacity: 0.02 },
        onEachFeature: (feature, layer) => {
          const name = feature.properties?.['nom'];
          if (name) {
            layer.bindTooltip(name, { permanent: true, direction: 'center', className: 'department-label' });
          }
        }
      });

      this.updateZoomDependentLayers(map);
      this.loading = false;
    } catch {
      this.loading = false;
      this.loadError = true;
    }
  }

  private updateZoomDependentLayers(map: L.Map): void {
    const zoom = map.getZoom();

    if (this.departmentsLayer) {
      const shouldShow = zoom >= DEPARTMENTS_MIN_ZOOM;
      if (shouldShow && !this.departmentsShown) {
        this.departmentsLayer.addTo(map);
        this.departmentsShown = true;
      } else if (!shouldShow && this.departmentsShown) {
        map.removeLayer(this.departmentsLayer);
        this.departmentsShown = false;
      }
    }

    const shouldShowRiverLabels = zoom >= RIVER_LABELS_MIN_ZOOM;
    if (shouldShowRiverLabels !== this.riverLabelsShown) {
      for (const { layer, name } of this.riverLines) {
        layer.setText(shouldShowRiverLabels ? `${RIVER_LABEL_GAP}${name}${RIVER_LABEL_GAP}` : null, RIVER_TEXT_OPTIONS);
      }
      this.riverLabelsShown = shouldShowRiverLabels;
    }
  }

  private async fetchGeoJson(path: string): Promise<GeoJSON.GeoJsonObject> {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return response.json();
  }
}
