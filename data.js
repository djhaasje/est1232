/* ============================================================
   data.js — Centrale content-store voor de 800 jaar Eindhoven site
   Wordt gebruikt door: render.js (voorpagina) en admin.js (CMS)
   Persistentie: localStorage (per browser). Gebruik Export/Import
   in het beheerpaneel om content te delen of te back-uppen.
   ============================================================ */

const CMS_STORAGE_KEY = 'eindhoven800_cms_v1';

const DEFAULT_DATA = {
  hero: {
    kicker: '1232 — 2032',
    title: '800 JAAR<br>EINDHOVEN',
    subtitle: "Van middeleeuws stadje met stadsrechten tot dé Brainport van Nederland. Ontdek acht eeuwen geschiedenis, verteld in beeld, tijdlijn en verhaal.",
    image: 'assets/img/eindhoven-skyline-night.webp',
    imageAlt: 'Skyline van Eindhoven bij nacht met de Philips lichttoren en Blob'
  },

  history: {
    sections: [
      {
        title: '1232 — Stadsrechten van Hendrik I',
        text: 'Op 21 september 1232 verleende hertog Hendrik I van Brabant stadsrechten aan de nederzetting gelegen op de samenvloeiing van de rivieren de Dommel en de Gender. Deze plek — "Eindhoven", vermoedelijk vernoemd naar het "einde van de hoeven" (landbouwgronden) — groeide daarmee uit tot een officiële stad met een eigen marktrecht, ommuring en bestuur. Het is dit moment dat Eindhoven in 2032 precies 800 jaar viert.'
      },
      {
        title: 'Middeleeuwen: een bescheiden vestingstad',
        text: 'Eeuwenlang bleef Eindhoven een kleine, ommuurde vestingstad rond de huidige Markt en het Stadhuisplein. De stad kende felle branden (onder andere in 1420 en 1486) die grote delen van het centrum verwoestten, en lag door haar ligging nabij de grens vaak in de vuurlinie tijdens de Tachtigjarige Oorlog. Kasteel Eindhoven en het naburige Kasteel Blaarthem speelden een rol in het regionale bestuur.'
      },
      {
        title: '18e–19e eeuw: opkomst van de nijverheid',
        text: 'Vanaf de 18e eeuw ontwikkelde Eindhoven zich als centrum van textielnijverheid: wevers, ververs en later grote katoenfabrieken zoals die van Van Dissel & Zonen bepaalden het straatbeeld. In 1859 kreeg de stad een treinverbinding, wat de industrialisatie verder versnelde.'
      },
      {
        title: '1891 — Philips en de doorbraak',
        text: 'Op 1 mei 1891 richtten Gerard en Anton Philips een gloeilampenfabriek op. Wat begon als een klein bedrijf groeide uit tot een wereldwijd technologieconcern en tilde Eindhoven van provinciestad naar industriestad. Rond de fabrieken ontstonden arbeiderswijken, sociale voorzieningen en het beroemde Philips-voetbalelftal PSV (opgericht 1913).'
      },
      {
        title: '1920 — De grote annexatie',
        text: 'Op 1 januari 1920 gingen de zelfstandige gemeenten Woensel, Stratum, Gestel en Blaarthem, Strijp en Tongelre op in de gemeente Eindhoven. Hierdoor groeide Eindhoven in één klap uit tot de vijfde stad van Nederland.'
      },
      {
        title: '1942–1944 — Oorlog, bombardementen en bevrijding',
        text: 'Door de aanwezigheid van de Philipsfabrieken was Eindhoven een belangrijk doelwit tijdens de Tweede Wereldoorlog. Op 6 december 1942 troffen geallieerde bommenwerpers de fabrieken, met veel burgerslachtoffers in de wijk Woensel tot gevolg. Op 18 september 1944 werd Eindhoven, als onderdeel van Operatie Market Garden, bevrijd door Amerikaanse troepen van de 101st Airborne Division en Britse grondtroepen — de eerste grote Nederlandse stad die werd bevrijd.'
      },
      {
        title: 'Naoorlogse wederopbouw en groei',
        text: 'Na de oorlog werd fors geïnvesteerd in wederopbouw, woningbouw en de uitbreiding van Philips en later ook DAF (vrachtwagens, opgericht 1928). De TH Eindhoven (nu TU/e) opende in 1956 haar deuren en maakte van de stad een kennisstad.'
      },
      {
        title: '21e eeuw — Van industriestad naar Brainport',
        text: 'Na het vertrek van veel productie verschoof Eindhoven naar hightech, design en kennis. Voormalige Philipsterreinen zoals Strijp-S en Strijp-T werden herontwikkeld tot creatieve wijken. Eindhoven is nu het hart van Brainport Eindhoven, in 2011 door Forbes uitgeroepen tot "slimste regio ter wereld", en huisvest jaarlijks events als de Dutch Design Week en GLOW.'
      },
      {
        title: '2032 — 800 jaar Eindhoven',
        text: 'In 2032 is het precies 800 jaar geleden dat Eindhoven stadsrechten kreeg. Een mijlpaal die de stad groots viert: van een middeleeuws marktstadje tot internationale technologie- en designhoofdstad.'
      }
    ],
    facts: [
      '<strong>1232</strong> — Stadsrechten verleend door Hendrik I',
      '<strong>1891</strong> — Oprichting Philips',
      '<strong>1920</strong> — Annexatie van 5 randgemeenten',
      '<strong>1944</strong> — Bevrijding op 18 september',
      '<strong>1956</strong> — Opening TH Eindhoven (TU/e)',
      '<strong>2032</strong> — 800-jarig bestaan'
    ],
    quote: 'Van het einde van de hoeven, naar het hart van Brainport.'
  },

  timeline: [
    { year: '1232', title: 'Stadsrechten', text: 'Hertog Hendrik I van Brabant verleent Eindhoven officiële stadsrechten.', future: false },
    { year: '1420', title: 'Grote stadsbrand', text: 'Een verwoestende brand legt een groot deel van het middeleeuwse centrum in de as.', future: false },
    { year: '1486', title: 'Opnieuw vuur', text: 'Een tweede grote brand teistert de stad; herbouw bepaalt het stratenplan tot vandaag.', future: false },
    { year: '1581–1583', title: 'Tachtigjarige Oorlog', text: 'Eindhoven wisselt herhaaldelijk van bezetter en wordt zwaar beschadigd.', future: false },
    { year: '1859', title: 'De trein komt', text: 'Aansluiting op het spoorwegnet versnelt handel en industrialisatie.', future: false },
    { year: '1891', title: 'Philips opgericht', text: 'Gerard en Anton Philips starten hun gloeilampenfabriek — het begin van een wereldconcern.', future: false },
    { year: '1913', title: 'PSV opgericht', text: 'Philips Sport Vereniging wordt opgericht door en voor Philips-medewerkers.', future: false },
    { year: '1920', title: 'Grote annexatie', text: 'Woensel, Stratum, Gestel, Strijp en Tongelre gaan op in Eindhoven: de stad wordt de 5e van NL.', future: false },
    { year: '1928', title: 'DAF opgericht', text: 'Hub van Doorne start zijn aanhangwagenfabriek, later uitgegroeid tot vrachtwagenfabrikant DAF.', future: false },
    { year: '1942', title: 'Bombardement', text: 'Geallieerde bommenwerpers treffen de Philipsfabrieken; veel burgerslachtoffers.', future: false },
    { year: '1944', title: 'Bevrijding', text: 'Op 18 september bevrijden geallieerde troepen Eindhoven tijdens Operatie Market Garden.', future: false },
    { year: '1956', title: 'TH Eindhoven', text: 'De Technische Hogeschool (nu TU/e) opent haar deuren en maakt Eindhoven een kennisstad.', future: false },
    { year: '1998', title: 'Herstructurering Philips', text: 'Philips verkleint productie in Eindhoven; de stad zoekt een nieuwe economische koers.', future: false },
    { year: '2011', title: 'Slimste regio ter wereld', text: 'Brainport Eindhoven wordt door Forbes uitgeroepen tot "meest intelligente regio" ter wereld.', future: false },
    { year: '2012', title: 'Strijp-S herontwikkeld', text: 'Het voormalige Philipsterrein Strijp-S transformeert tot creatieve wijk vol cultuur en wonen.', future: false },
    { year: '2020', title: '100 jaar grote gemeente', text: 'Eindhoven viert 100 jaar sinds de annexatie van de vijf randgemeenten uit 1920.', future: false },
    { year: '2032', title: '800 jaar Eindhoven!', text: 'Eindhoven viert het 800-jarig bestaan van haar stadsrechten met een jaar vol festiviteiten.', future: true }
  ],

  gallery: {
    old: [
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Eindhoven%201583.jpg?width=600', caption: 'Eindhoven, 1583' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kasteel%20Blaarthem.jpg?width=600', caption: 'Kasteel Blaarthem' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Eindhoven%20Kloosterdreef%20briefkaart.jpg?width=600', caption: 'Kloosterdreef, oude briefkaart' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Koningin%20bezoekt%20Rij%20en%20Tractieschool%20te%20Eindhoven%2C%20Bestanddeelnr%20910-8118.jpg?width=600', caption: 'Koninklijk bezoek aan de Rij- en Tractieschool' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/RAF%20Mosquito%20Philipps%20Eindhoven%20NAN15Sep43.jpg?width=600', caption: 'Geallieerd bombardement op de Philipsfabrieken, 1943' },
      { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Royal%20Air%20Force-%202nd%20Tactical%20Air%20Force%2C%201943-1945.%20CL1397.jpg?width=600", caption: 'Bevrijding van Eindhoven, september 1944' },
      { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Atlas%20Schoemaker-NOORDBRABANT-2942-Noord-Brabant%2C%20Eindhoven.jpeg?width=600", caption: 'Historische kaart van Eindhoven' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/MVWE%20bij%20kerk%20Schootsestraat.jpg?width=600', caption: 'Kerk aan de Schootsestraat' }
    ],
    modern: [
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bomen%20op%20het%20dak%20in%20Strijp-S%20in%20Eindhoven%20(48023562136).jpg?width=600', caption: 'Strijp-S, herontwikkeld Philipsterrein' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Binnenstad%2C%205611%20Eindhoven%2C%20Netherlands%20-%20panoramio%20(18).jpg?width=600', caption: 'Binnenstad Eindhoven' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Centrum%20Eindhoven.jpg?width=600', caption: 'Centrum Eindhoven' },
      { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Boulevard%20d'Eindhoven.jpg?width=600", caption: 'Boulevard Eindhoven' },
      { src: "https://commons.wikimedia.org/wiki/Special:FilePath/'Velomove'%20Eindhoven%20(6588600995).jpg?width=600", caption: 'Fietsend door de stad' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/18septemberplein.jpg?width=600', caption: '18 Septemberplein, vernoemd naar de bevrijding' },
      { src: 'assets/img/eindhoven-skyline-night.webp', caption: 'Skyline van Eindhoven bij nacht' },
      { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Achtse%20Barrier-Hoeven%2C%20Eindhoven%2C%20Netherlands%20-%20panoramio%20(3).jpg?width=600', caption: 'Achtse Barrier-Hoeven' }
    ]
  },

  contact: {
    heading: 'EHV365 — het kloppend hart van Eindhoven',
    intro: 'Deze viering van 800 jaar Eindhoven wordt in de geest van <strong>Eindhoven365 (EHV365)</strong> gepresenteerd, de officiële citymarketingorganisatie van de stad. Wil je meer weten over evenementen, of heb je een vraag over de festiviteiten rond 800 jaar Eindhoven?',
    org: 'EHV365 / Eindhoven365',
    website: 'https://www.eindhoven365.nl/',
    email: 'info@eindhoven365.nl',
    social: '@eindhoven365',
    disclaimer: 'Let op: deze pagina is een fan-/jubileumwebsite gemaakt ter gelegenheid van 800 jaar Eindhoven en geen officiële website. Voor actuele, officiële informatie verwijzen we naar eindhoven365.nl.'
  },

  countdown: {
    label: 'Nog tot 800 jaar Eindhoven',
    targetDate: '2032-09-21T00:00:00'
  }
};

/* Diepe kloon zodat we DEFAULT_DATA nooit per ongeluk muteren */
function cloneData(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadCmsData() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return cloneData(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    // Merge ondiep zodat ontbrekende velden terugvallen op defaults
    return {
      hero: { ...cloneData(DEFAULT_DATA.hero), ...(parsed.hero || {}) },
      history: parsed.history || cloneData(DEFAULT_DATA.history),
      timeline: parsed.timeline || cloneData(DEFAULT_DATA.timeline),
      gallery: parsed.gallery || cloneData(DEFAULT_DATA.gallery),
      contact: { ...cloneData(DEFAULT_DATA.contact), ...(parsed.contact || {}) },
      countdown: { ...cloneData(DEFAULT_DATA.countdown), ...(parsed.countdown || {}) }
    };
  } catch (e) {
    console.warn('Kon CMS-data niet laden, val terug op standaardcontent.', e);
    return cloneData(DEFAULT_DATA);
  }
}

function saveCmsData(data) {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
}

function resetCmsData() {
  localStorage.removeItem(CMS_STORAGE_KEY);
}
