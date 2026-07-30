import * as L from 'leaflet';

/**
 * leaflet-textpath (like several older Leaflet plugins) patches `L.Polyline.prototype`
 * by referencing a *global* `L`, the way it would exist when Leaflet is loaded via a
 * <script> tag. Our bundler only exposes Leaflet as an ES module, so we publish it to
 * `window.L` ourselves before that plugin is imported. This file must be imported
 * before 'leaflet-textpath' for its side effect to run first.
 */
(window as unknown as { L: typeof L }).L = L;
