import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-choice-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-choice-test.component.html',
  styleUrls: ['./multi-choice-test.component.css']
})
export class MultiChoiceTestComponent implements OnInit {
  // Embedded TSV (header + a few sample rows). Replace or extend with the full dataset if desired.
  private rawTsv = `Thématique	Notions	Connaisance	Question	Reponse
Principes et valeurs de la République	Devise et symboles de la République	Connaitre et comprendre la République	Qu'est-ce que c'est une republique?	Un mode d'organisation des pouvoirs
Principes et valeurs de la République	Devise et symboles de la République	Connaitre et comprendre la République	Que dit l'art. 1er de la Constitution de l'unité et indivisibilité de la République?	« La France est une République indivisible, laïque, démocratique et sociale »
Principes et valeurs de la République	Devise et symboles de la République	Connaitre et comprendre la République	Que dit l'art. 3 de la Constitution de la souveraineté nationale?	« La souveraineté nationale appartient au peuple qui l'exerce par ses représentants et par la voie du référendum »
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : liberté	Quel est le sens de la liberté?	Respecter les autres dans leur intégrité et leur diversité, respecter la diversité des croyances et des convictions
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : liberté	Quelles sont les différents types de libertés individuelles et collectives?	Liberté de pensée, d'opinion, d'expression, de religion, de travail, de circulation, de réunion et d'association, de choix sexuels et de mariage (interdiction de la polygamie : principe et conséquences) ;
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : liberté	Quelles sont les différentes formes d'engagement dans la vie associative et locale?	Droit de créer et d'adhérer à une association, droit syndical.
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : égalité et fraternité	Quel est le sens de l'égalité?	égalité des droits et des devoirs, égalité entre les femmes et les hommes, accès aux droits fondamentaux, égalité devant la loi
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : égalité et fraternité	Que signifie respecter les droits d'autrui et accepter les différences?	Lutte contre les discriminations, le racisme, l'antisémitisme et la haine anti-LGBT.
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : égalité et fraternité	Quel est le sens de la fraternité ?	comprendre la valeur de fraternité comme la capacité à voir en autrui un semblable, malgré les différences. C'est pourquoi la fraternité républicaine est une fraternité civique, et non pas ethnique ou religieuse.
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre la devise française : égalité et fraternité	Differentes formes de solidarité?	• Collective : le principe de solidarité signifie que la Nation assure aux individus libres et égaux en droit une protection. Remplir ses obligations fiscales est un acte solidaire qui permet de financer les services publics au bénéfice de tous ; le principe de solidarité exige aussi que chaque citoyen doive défendre la Nation en cas de danger ; • Intergénérationnelle : le principe de solidarité signifie le soutien entre différentes générations (exemple : retraites).
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre les symboles républicains mentionnés par la Constitution et d'autres symboles coutumiers	Quel est le drapeau de la France?	Bleu, Blanc, Rouge (Le drapeau tricolore).
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre les symboles républicains mentionnés par la Constitution et d'autres symboles coutumiers	Comment s'appele l'hymne?	La Marseillaise
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre les symboles républicains mentionnés par la Constitution et d'autres symboles coutumiers	Quelle est la devise de la France?	Liberté, Égalité, Fraternité
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre les symboles républicains mentionnés par la Constitution et d'autres symboles coutumiers	Qui est la Marianne?	Un symbole de la République française, représentant la Liberté et la Raison.
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre les symboles républicains mentionnés par la Constitution et d'autres symboles coutumiers	Quuand est la fête nationale ?	14 juillet (prise de la Bastille)
Principes et valeurs de la République	Devise et symboles de la République	Connaître et comprendre les symboles républicains mentionnés par la Constitution et d'autres symboles coutumiers	Pourquoi le coq est le symbole de la France ?	L'association du coq et de la France est née d'un jeu de mot : le mot latin gallus signifie à la fois « gaulois » et « coq »
Principes et valeurs de la République	Devise et symboles de la République	Savoir que le français est la langue nationale et officielle	Quel est la langue officielle de la republique?	« Le français est la langue de la République française » (article 2 de la Constitution).
Principes et valeurs de la République	Laïcité	Connaître et comprendre le principe de laïcité	Comment la France est devenue laïque? 	La loi de 1905 est la conclusion de siècles de lutte entre les pouvoirs religieux et politiques en France. La laïcité n'est pas la négation des religions, elle organise les relations entre l'Etat et les religions
Principes et valeurs de la République	Laïcité	Connaître et comprendre le principe de laïcité	Quel est le principe de liberté de conscience?	La laïcité garantit la liberté de conscience et l'égalité de tous les citoyens, quelles que soient leurs croyances ; la neutralité de l'État à l'égard des religions et le libre exercice des cultes (loi de 1905). La liberté de conscience est celle de croire, celle de ne pas croire et celle de ne plus croire, celle aussi de changer de croyance ou de religion (droit à l'apostasie et droit de se convertir). La liberté de conscience inclut le droit au blasphème. L'exercice de cette liberté peut être limité dans le respect des principes constitutionnels (ex. interdiction du prosélytisme abusif) ;
Principes et valeurs de la République	Laïcité	Connaître et comprendre le principe de laïcité	Quelle est la place des religions en France et le rôle de l'Etat face a elles?	Principe de séparation des Eglises et de l'Etat, principe de libre organisation des cultes. Principe de neutralité : l'Etat protège et sécurise les lieux de culte et lutte contre les actes antireligieux. L'Etat est garant de la liberté religieuse y compris dans les lieux de privation de liberté. L'Etat punit la pression forte sur une personne de croire ou de ne pas croire
Principes et valeurs de la République	Laïcité	Connaître et comprendre le principe de laïcité	Que dit le principe de laïcité pour l'usager du service public?	Tous les usagers sont égaux devant le service public. Ils ont le droit d'exprimer leurs convictions religieuses dans la limite du respect de l'ordre public. Les usagers doivent s'abstenir de toute forme de prosélytisme. Le principe de laïcité interdit à quiconque de se prévaloir de ses croyances religieuses pour s'affranchir des règles communes (Voir Charte de la laïcité des usagers des services publics)
Principes et valeurs de la République	Laïcité	Connaître et comprendre le principe de laïcité	Quel est le principe de laïcité au travail?	Chacun a le droit d'avoir ses croyances ou convictions. Dans les institutions publiques, les agents sont soumis au principe de neutralité. Dans le secteur privé, la liberté de manifester sa religion peut toutefois être restreinte pour des impératifs d'hygiène, de sécurité ou si son exercice empêche le bon déroulement de l'activité de l'entreprise ;
Principes et valeurs de la République	Laïcité	Connaître et comprendre le principe de laïcité	Quel est le principe de laïcité à l'école publique?	La laïcité impose des règles à tous les membres de la communauté scolaire afin de protéger la liberté de choix de chaque enfant et préserver le fonctionnement de l'école. Il est interdit de choisir les enseignements en fonction de ses croyances religieuses (Voir Charte de la laïcité à l'école).
Le système institutionnel et politique	Démocratie et droit de vote	Connaître et comprendre les caractéristiques de notre démocratie	Quel est le principe d'Etat de droit?	Système dans lequel la loi est au-dessus de tous : elle s'applique à toutes les personnes y compris les autorités publiques. Cela garantit que les droits et libertés de chacun sont protégés ;
Le système institutionnel et politique	Démocratie et droit de vote	Connaître et comprendre les caractéristiques de notre démocratie	Quels sont les trois pouvoirs?	législatif, exécutif, autorité judiciaire
Le système institutionnel et politique	Démocratie et droit de vote	Connaître et comprendre les caractéristiques de notre démocratie	Decrit le rôle des trois pouvoirs et les principaux acteurs	faire les lois (députés et sénateurs), appliquer les lois (gouvernement), rendre la justice (les juges) ;
Le système institutionnel et politique	Démocratie et droit de vote	Connaître et comprendre les caractéristiques de notre démocratie	Decrit le principe de la séparation des pouvoirs et sa mise en œuvre	Principe constitutionnel consacré par l'article 16 de la Déclaration des droits de l'homme et du citoyen qui établit un équilibre entre les pouvoirs : responsabilité du gouvernement devant le Parlement, pouvoirs du président de la République élu au suffrage universel direct, indépendance de la justice.
Le système institutionnel et politique	Démocratie et droit de vote	Connaître et comprendre le droit de vote et les élections	Quelles sont les conditions pour voter en France? 	Avoir la nationalité française, être majeur, ne pas avoir été privé de ses droits civils et politiques suite à une condamnation
Le système institutionnel et politique	Démocratie et droit de vote	Connaître et comprendre le droit de vote et les élections	Que dit le principe de pluralité des partis?	Condition nécessaire de la démocratie, vise à assurer une représentation des différents courants d'expression socioculturels
Le système institutionnel et politique	Organisation de la République française	Connaître et comprendre le découpage administratif et institutionnel	Citez les trois niveaux de l'organisation territoriale de l'État.	Organisation territoriale en trois niveaux : la Commune, le Département, la Région. L'État est représenté par les préfectures de région et de département.
Le système institutionnel et politique	Organisation de la République française	Connaître et comprendre le découpage administratif et institutionnel	Quelles sont les principales institutions politiques de la Ve République? 	• pouvoir exécutif : le président de la République, le gouvernement composé du Premier ministre et des ministres ; • pouvoir législatif : le Parlement composé de l'Assemblée nationale et du Sénat ; • pouvoir judicaire : les tribunaux (ordres judiciaire et administratif) ; • autres institutions : Conseil constitutionnel, Défenseur des droits, Banque de France.
Le système institutionnel et politique	Organisation de la République française	Connaître et comprendre le fonctionnement démocratique	Decrit le rôle des acteurs politiques au niveau national et local	le président de la République, le Premier ministre, le maire ;
Le système institutionnel et politique	Organisation de la République française	Connaître et comprendre le fonctionnement démocratique	Quelles sont les différents types d'élections?	 présidentielles, législatives, européennes, locales
Le système institutionnel et politique	Organisation de la République française	Connaître et comprendre le fonctionnement démocratique	Quelle est la durée des principaux mandats électifs (Président, Députés, Maires) ?	Président de la République : 5 ans ; Députés : 5 ans ; Maires : 6 ans ; Sénateurs : 6 ans (renouvelés par moitié tous les 3 ans).
Le système institutionnel et politique	L'Union européenne et ses institutions	Connaître et comprendre les fondements de l'Union européenne	Quelles sont les principales étapes historiques et le nombre actuel d'États membres de l'UE ?	L'UE a été fondée sur le Traité de Rome (1957) et compte actuellement 27 États membres.
Le système institutionnel et politique	L'Union européenne et ses institutions	Connaître et comprendre les fondements de l'Union européenne	Quels sont le drapeau et l'hymne de l'Union européenne?	Hymne: l'«Ode à la joie» de Beethoven, drapeau blueu avec un cercle conformé par 12 etoiles dorées.
Le système institutionnel et politique	L'Union européenne et ses institutions	Connaitre et comprendre le fonctionnement de l'Union européenne	Quelles sont les institutions européennes ? 	Parlement européen, Conseil de l'Union européenne, Commission européenne
Le système institutionnel et politique	L'Union européenne et ses institutions	Connaitre et comprendre le fonctionnement de l'Union européenne	Quels sont les principes essentiels de l'Union européenne	citoyenneté européenne, libre circulation, coopération économique
Le système institutionnel et politique	L'Union européenne et ses institutions	Connaitre et comprendre le fonctionnement de l'Union européenne	À quelles élections les citoyens étrangers européens résidant en France peuvent-ils voter ?	Les citoyens de l'Union européenne résidant en France peuvent voter et être éligibles aux élections municipales et aux élections européennes.
Droits et devoirs	Droits fondamentaux	Connaitre les droits fondamentaux et leurs fondements	Citez des exemples de libertés individuelles et collectives en France.	Liberté de circulation, liberté de mariage et de divorce, liberté d'opinion, de conscience, d'expression et de croyances.
Droits et devoirs	Droits fondamentaux	Connaitre les droits fondamentaux et leurs fondements	Quels sont les droits sociaux et économiques ?	Les droits qui visent à assurer à chaque individu des conditions de vie dignes et équitables (ex: droit au travail, droit à la protection sociale).
Droits et devoirs	Droits fondamentaux	Connaitre les droits fondamentaux et leurs fondements	Citez les principales notions relatives aux droits fondamentaux.	Dignité humaine, intégrité physique et psychologique, citoyenneté, État de droit, démocratie, respect des droits de l'homme.
Droits et devoirs	Droits fondamentaux	Connaitre les droits fondamentaux et leurs fondements	Quels sont les principaux textes qui garantissent les droits fondamentaux en France ?	La Constitution de la Ve République (1958), la Déclaration des droits de l'homme et du citoyen (1789), la Charte de l'environnement (2004).
Droits et devoirs	Obligations et devoirs des personnes résidant en France	Comprendre les obligations et devoirs des personnes résidant en France	Par quoi les libertés individuelles sont-elles limitées ?	Les libertés sont encadrées par la loi et limitées par les libertés des autres et par la défense de l'ordre public (sécurité, tranquillité, salubrité, dignité humaine).
Droits et devoirs	Obligations et devoirs des personnes résidant en France	Comprendre les obligations et devoirs des personnes résidant en France	Citez une obligation des résidents et les conséquences du non-respect des lois.	Obligation de payer les impôts et cotisations sociales. La police et la gendarmerie assurent le respect des lois. Le non-respect entraîne des infractions (contraventions, délits, crimes).
Droits et devoirs	Obligations et devoirs des personnes résidant en France	Comprendre les obligations et devoirs des personnes résidant en France	Quelle attitude citoyenne favorise la vie au sein de la collectivité nationale ?	Contribuer au bien collectif (par le travail), respecter les règles communes, autrui et l'environnement.
Droits et devoirs	Obligations et devoirs des personnes résidant en France	Comprendre les obligations et devoirs des personnes résidant en France	Quelles sont les formes de participation des citoyens français au fonctionnement des institutions ?	Voter, être juré dans un procès.
Histoire, géographie et culture	Principales périodes et personnages historiques	Connaître les repères historiques	Citez trois grandes périodes historiques qui ont marqué la France.	Monarchie (jusqu'en 1789), Révolution Française (dès 1789), Empire de Napoléon (création du Code Civil), Installation de la République (école laïque, gratuite et obligatoire dès 1880).
Histoire, géographie et culture	Principales périodes et personnages historiques	Connaître les repères historiques	Citez des événements majeurs qui ont eu lieu au XXe siècle.	Grande Guerres (1914-1918 et 1939-1945), Résistance (Appel du 18 juin), Droit de vote des femmes (1944), Création de l'ONU (1945), Création de la CEE (1957).
Histoire, géographie et culture	Principales périodes et personnages historiques	Connaître les repères historiques	Quelles sont les étapes importantes de la construction de la Ve République ?	Constitution de la Ve République, Suffrage universel direct pour le président, Décolonisation (1950-1962), Abolition de la peine de mort (1981 - F. Mitterrand), Naissance de l'UE (1992) et de l'Euro (2002).
Histoire, géographie et culture	Territoires et géographie	Connaître la situation geographique et demographique	Citez les 4 principaux fleuves et un massif montagneux de France, ainsi que les DROM.	Fleuves (Seine, Loire, Garonne, Rhône, Rhin), Massifs montagneux (Alpes, Pyrénées, Massif Central), 5 DROM (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte).
Histoire, géographie et culture	Territoires et géographie	Connaître la situation geographique et demographique	Citez des pays voisins et des mers/océans qui bordent la France.	Frontières terrestres : Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, Andorre. Mers et Océans : Manche, Mer du Nord, Océan Atlantique, Mer Méditerranée.
Histoire, géographie et culture	Territoires et géographie	Connaître la situation geographique et demographique	Quelle est la population française et comment est-elle répartie sur le territoire ?	Population française : environ 68 millions d'habitants. 9/10 habitent en aires urbaines. La France est la 1ère destination touristique mondiale (Grandes villes, côtes, montagnes).
Histoire, géographie et culture	Territoires et géographie	Connaître la situation geographique et demographique	Où se situent principalement les activités économiques en France ?	Les principales activités économiques se situent à proximité des grandes villes et des axes de communication (autoroutes, voies ferrées).
Histoire, géographie et culture	Patrimoine français	Connaître les repères culturels de la société française	Citez trois monuments historiques ou lieux emblématiques de la France.	Tour Eiffel, Arc de Triomphe, Cathédrale Notre-Dame de Paris, Château de Versailles, Mont Saint-Michel.
Histoire, géographie et culture	Patrimoine français	Connaître les repères culturels de la société française	Citez des artistes ou auteurs français célèbres.	Victor Hugo, Molière, Albert Camus (auteurs) ; Claude Monet, Auguste Renoir (artistes).
Histoire, géographie et culture	Patrimoine français	Connaître les repères culturels de la société française	Citez des plats typiques de la gastronomie française.	Bœuf Bourguignon, Coq au Vin, Ratatouille, Crêpes, Macarons, Baguette, Fromages.
Histoire, géographie et culture	Patrimoine français	Connaître les repères culturels de la société française	Quelles sont les principales fêtes célébrées en France ?	Fête Nationale (14 juillet - bal des pompiers, défilé militaire), Noël (repas de famille), Nouvel An, Fête du Travail (1er mai).
Histoire, géographie et culture	Patrimoine français	Connaître les repères culturels de la société française	Quel est le rayonnement de la langue française dans le monde ?	5e langue mondiale, parlée par 321 millions de personnes, promue par l'Organisation Internationale de la Francophonie (OIF).
Vivre dans la société française	S'installer et résider en France	Connaître les démarches essentielles pour garantir son installation et sa résidence dans le respect de la loi	Citez des démarches administratives du quotidien.	Assurance responsabilité civile, échange du permis de conduire, déclaration des revenus, changement d'adresse.
Vivre dans la société française	S'installer et résider en France	Connaître les démarches essentielles pour garantir son installation et sa résidence dans le respect de la loi	Où effectue-t-on les démarches de demande et renouvellement du titre de séjour ?	Procédures de demande et renouvellement du titre de séjour (à la préfecture/sous-préfecture).
Vivre dans la société française	S'installer et résider en France	Connaître les démarches essentielles pour garantir son installation et sa résidence dans le respect de la loi	Quels sont les principes et procédures d'accès à la nationalité française ?	Principe d'assimilation. Procédures par déclaration (mariage, ascendants) ou par demande de naturalisation (résidence).
Vivre dans la société française	S'installer et résider en France	Connaître les démarches essentielles pour garantir son installation et sa résidence dans le respect de la loi	Où doit-on déclarer une naissance, un mariage, ou un décès ?	Déclaration d'état civil (naissance, mariage, décès) à la mairie. Démarches auprès des organismes sociaux (CAF, CPAM) pour les prestations familiales et sociales.
Vivre dans la société française	S'installer et résider en France	Connaître les démarches essentielles pour garantir son installation et sa résidence dans le respect de la loi	Que doit-on connaître concernant le logement en France ?	Connaître les droits et obligations du propriétaire et du locataire (bail, dépôt de garantie, préavis).
Vivre dans la société française	L'accès aux soins	Connaître le parcours de santé	Citez les différentes offres de soins disponibles.	Hôpitaux, cliniques, urgences, médecin traitant, spécialistes.
Vivre dans la société française	L'accès aux soins	Connaître le parcours de santé	Comment la prise en charge des soins de santé est-elle assurée ?	Assurance maladie (Sécurité Sociale) et Mutuelle (complémentaire santé).
Vivre dans la société française	L'accès aux soins	Connaître le parcours de santé	Y a-t-il des obligations vaccinales en France ?	Certains vaccins sont obligatoires pour les enfants (ex: diphtérie, tétanos, polio).
Vivre dans la société française	L'accès aux soins	Connaître le parcours de santé	Quels sont les numéros d'urgence à connaître ?	15 (SAMU), 17 (Police/Gendarmerie), 18 (Pompiers), 112 (Numéro d'urgence européen).
Vivre dans la société française	L'accès aux soins	Connaître les droits du patient	Quel est le principe concernant le choix du praticien ?	Le patient est libre de choisir son médecin traitant et son établissement de soin.
Vivre dans la société française	L'accès aux soins	Connaître les droits du patient	Quel est le principe de confidentialité dans le domaine de la santé ?	Respect du secret médical : le professionnel de santé ne peut divulguer les informations concernant le patient.
Vivre dans la société française	L'accès aux soins	Connaître les droits du patient	Quel droit fondamental le patient possède-t-il concernant son état de santé ?	Le patient a le droit d'être informé sur son état de santé et sur les traitements proposés.
Vivre dans la société française	Travailler en France	Connaître et comprendre les principales notions du droit du travail	Quel est le cadre général du travail en France (durée, congés, droits) ?	Durée légale de travail (35h/semaine), congés payés, contrat de travail, droit syndical, sécurité au travail.
Vivre dans la société française	Travailler en France	Connaître et comprendre les principales notions du droit du travail	Citez des acteurs ou organismes pour la recherche d'emploi.	Pôle Emploi, agences d'intérim, sites d'emploi, réseaux professionnels.
Vivre dans la société française	Travailler en France	Connaître et comprendre les principales notions du droit du travail	Citez des acteurs ou organismes pour entreprendre en France.	Chambres de Commerce et d'Industrie (CCI), Chambres de Métiers et de l'Artisanat (CMA), URSSAF, Guichet unique (Inpi).
Vivre dans la société française	Autorité parentale et système éducatif	Connaître et comprendre la notion d'autorité parentale	Quelles sont les obligations et responsabilités des parents envers leurs enfants mineurs ?	Autorité parentale (droit et devoir de garde, surveillance, éducation et protection de l'enfant).
Vivre dans la société française	Autorité parentale et système éducatif	Connaître et comprendre la notion d'autorité parentale	Quel est le cadre légal de protection des enfants ?	Protection contre la maltraitance et le droit au respect de leur intégrité physique et morale (ex: interdiction des châtiments corporels).
Vivre dans la société française	Autorité parentale et système éducatif	Connaître et comprendre le système éducatif	Quel est le principe de l'obligation de scolarité en France ?	Instruction obligatoire (de 3 à 16 ans). Obligation de scolarité et interdiction de contester les enseignements (principe de neutralité).
Vivre dans la société française	Autorité parentale et système éducatif	Connaître et comprendre le système éducatif	Comment le système scolaire est-il organisé ?	École maternelle, École primaire, Collège, Lycée, Enseignement supérieur.
Vivre dans la société française	Autorité parentale et système éducatif	Connaître et comprendre le système éducatif	Quelles sont les obligations des parents d'élèves ?	Obligation d'instruction (scolariser l'enfant ou assurer l'instruction en famille) et de respecter le règlement intérieur de l'école.`;

  questions: Array<{ question: string; answer: string; thematique?: string; notions?: string; options?: string[] }> = [];
  pool: string[] = [];
  current = 0;
  correctCount = 0;
  incorrectCount = 0;
  choices: string[] = [];
  selected: string | null = null;
  finished = false;

  ngOnInit(): void {
    this.questions = this.parseTsv(this.rawTsv);
    this.pool = this.buildOptionsPool(this.questions);
    this.shuffle(this.questions);
    if (this.questions.length) this.renderQuestion();
  }

  private parseTsv(tsv: string) {
    const lines = (tsv || '').split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) return [];
    const header = lines[0].split('\t').map(h => h.trim());
    const qIndex = header.findIndex(h => /question/i.test(h));
    const aIndex = header.findIndex(h => /reponse|réponse|answer/i.test(h));
    const themIndex = header.findIndex(h => /th[eé]matique|thematique/i.test(h));
    const notionsIndex = header.findIndex(h => /notion/i.test(h));
    const items: Array<{question:string, answer:string, thematique?: string, notions?: string}> = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split('\t');
      const q = (cols[qIndex] || cols[3] || '').trim();
      const a = (cols[aIndex] || cols[4] || '').trim();
      const t = (cols[themIndex] || cols[0] || '').trim();
      const n = (cols[notionsIndex] || cols[1] || '').trim();
      if (q && a) items.push({ question: q, answer: a, thematique: t, notions: n });
    }
    return items;
  }

  private buildOptionsPool(questions: Array<{question:string,answer:string}>) {
    return questions.map(q => q.answer).filter(Boolean);
  }

  private shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  private makeChoicesFor(index: number) {
    const correct = this.questions[index].answer;
    const others = this.pool.filter(a => a !== correct);
    this.shuffle(others);
    const picks = others.slice(0, Math.min(3, others.length));
    const opts = [correct, ...picks];
    this.shuffle(opts);
    return opts;
  }

  renderQuestion() {
    if (!this.questions.length) return;
    this.choices = this.makeChoicesFor(this.current);
    this.selected = null;
    this.finished = false;
  }

  selectOption(option: string) {
    if (this.selected) return; // already selected
    this.selected = option;
    const correct = this.questions[this.current].answer;
    if (option === correct) {
      this.correctCount++;
    } else {
      this.incorrectCount++;
    }
  }

  next() {
    if (this.current >= this.questions.length - 1) {
      this.finished = true;
      return;
    }
    this.current++;
    this.renderQuestion();
  }

  restart() {
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.current = 0;
    this.shuffle(this.questions);
    this.renderQuestion();
  }
}