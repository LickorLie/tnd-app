import { useEffect, useState } from 'react';

/* Land + regio voor Deals en Agenda.
   1. De speler kan zelf kiezen (onthouden op dit apparaat).
   2. Anders: land automatisch via /api/geo (alleen het land, niets opgeslagen). */

export const COUNTRIES: { code: string; name: string; regions: string[] }[] = [
  { code: 'NL', name: 'Nederland', regions: ['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'Noord-Brabant', 'Noord-Holland', 'Overijssel', 'Utrecht', 'Zeeland', 'Zuid-Holland'] },
  { code: 'BE', name: 'België', regions: ['Antwerpen', 'Brussel', 'Henegouwen', 'Limburg (BE)', 'Luik', 'Luxemburg', 'Namen', 'Oost-Vlaanderen', 'Vlaams-Brabant', 'Waals-Brabant', 'West-Vlaanderen'] },
  { code: 'DE', name: 'Deutschland', regions: [] },
  { code: 'GB', name: 'United Kingdom', regions: [] },
  { code: 'FR', name: 'France', regions: [] },
  { code: 'ES', name: 'España', regions: [] },
];

export type Place = { country: string; region: string; city?: string; lat?: number; lng?: number; radius?: number };

/* Plaatsen voor 'afstand vanaf jou' (centrum van de plaats, afgerond). */
export const CITIES: { name: string; country: string; region: string; lat: number; lng: number }[] = [
  ['Amsterdam','NL','Noord-Holland',52.37,4.90],['Haarlem','NL','Noord-Holland',52.38,4.64],['Zaandam','NL','Noord-Holland',52.44,4.83],['Alkmaar','NL','Noord-Holland',52.63,4.75],['Hoorn','NL','Noord-Holland',52.64,5.06],['Den Helder','NL','Noord-Holland',52.96,4.76],['Hilversum','NL','Noord-Holland',52.22,5.18],
  ['Rotterdam','NL','Zuid-Holland',51.92,4.48],['Den Haag','NL','Zuid-Holland',52.08,4.30],['Leiden','NL','Zuid-Holland',52.16,4.49],['Delft','NL','Zuid-Holland',52.01,4.36],['Dordrecht','NL','Zuid-Holland',51.81,4.67],['Gouda','NL','Zuid-Holland',52.01,4.71],['Zoetermeer','NL','Zuid-Holland',52.06,4.49],
  ['Utrecht','NL','Utrecht',52.09,5.12],['Amersfoort','NL','Utrecht',52.16,5.39],
  ['Almere','NL','Flevoland',52.37,5.22],['Lelystad','NL','Flevoland',52.52,5.47],
  ['Eindhoven','NL','Noord-Brabant',51.44,5.48],['Tilburg','NL','Noord-Brabant',51.56,5.09],['Breda','NL','Noord-Brabant',51.59,4.78],["'s-Hertogenbosch",'NL','Noord-Brabant',51.69,5.30],['Helmond','NL','Noord-Brabant',51.48,5.66],['Bergen op Zoom','NL','Noord-Brabant',51.49,4.29],
  ['Maastricht','NL','Limburg',50.85,5.69],['Venlo','NL','Limburg',51.37,6.17],['Roermond','NL','Limburg',51.19,5.99],['Heerlen','NL','Limburg',50.89,5.98],['Sittard','NL','Limburg',51.00,5.87],
  ['Arnhem','NL','Gelderland',51.98,5.91],['Nijmegen','NL','Gelderland',51.84,5.86],['Apeldoorn','NL','Gelderland',52.21,5.97],['Ede','NL','Gelderland',52.04,5.66],
  ['Zwolle','NL','Overijssel',52.52,6.08],['Enschede','NL','Overijssel',52.22,6.89],['Deventer','NL','Overijssel',52.25,6.16],
  ['Groningen','NL','Groningen',53.22,6.57],['Leeuwarden','NL','Friesland',53.20,5.80],['Assen','NL','Drenthe',52.99,6.56],['Emmen','NL','Drenthe',52.78,6.90],['Middelburg','NL','Zeeland',51.50,3.61],
  ['Antwerpen','BE','Antwerpen',51.22,4.40],['Mechelen','BE','Antwerpen',51.03,4.48],['Turnhout','BE','Antwerpen',51.32,4.94],['Gent','BE','Oost-Vlaanderen',51.05,3.72],['Aalst','BE','Oost-Vlaanderen',50.94,4.04],
  ['Brussel','BE','Brussel',50.85,4.35],['Leuven','BE','Vlaams-Brabant',50.88,4.70],['Hasselt','BE','Limburg (BE)',50.93,5.34],['Genk','BE','Limburg (BE)',50.97,5.50],
  ['Brugge','BE','West-Vlaanderen',51.21,3.22],['Kortrijk','BE','West-Vlaanderen',50.83,3.26],['Luik','BE','Luik',50.63,5.57],['Namen','BE','Namen',50.47,4.87],['Charleroi','BE','Henegouwen',50.41,4.44],
].map(([name, country, region, lat, lng]) => ({ name, country, region, lat, lng } as { name: string; country: string; region: string; lat: number; lng: number }));

/* Hemelsbrede afstand in km */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* Ruwe reistijd met de auto: ~1,3x hemelsbreed, gemiddeld 75 km/u */
export const driveMinutes = (km: number) => Math.max(5, Math.round((km * 1.3) / 75 * 60 / 5) * 5);

export const formatTrip = (km: number) => {
  const m = driveMinutes(km);
  return `${Math.round(km)} km · ≈ ${m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}`}`;
};

type Located = { country?: string | null; region?: string | null; lat?: number | null; lng?: number | null };

/* Afstand van een item tot de gekozen plaats, of null */
export function itemDistance(item: Located, place: Place): number | null {
  if (place.lat == null || place.lng == null || item.lat == null || item.lng == null) return null;
  return distanceKm({ lat: place.lat, lng: place.lng }, { lat: item.lat, lng: item.lng });
}
const KEY = 'lol_place';

export function countryName(code: string) {
  return COUNTRIES.find(c => c.code === code)?.name || code || 'Worldwide';
}

export function usePlace(): [Place, (p: Place) => void] {
  const [place, setPlaceState] = useState<Place>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null') || { country: '', region: '' }; } catch { return { country: '', region: '' }; }
  });

  useEffect(() => {
    if (place.country) return;
    fetch('/api/geo')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d?.country) setPlaceState(p => (p.country ? p : { country: d.country, region: '' })); })
      .catch(() => { /* lokaal of offline: geen land */ });
  }, [place.country]);

  const setPlace = (p: Place) => {
    setPlaceState(p);
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  };
  return [place, setPlace];
}

/* Een item past bij de plek als het geen land heeft (overal), of hetzelfde land
   en (geen regio of dezelfde regio). */
export function matchesPlace(item: Located, place: Place) {
  // Met een gekozen plaats: binnen de straal (items zonder coördinaten vallen dan weg, behalve 'overal'-items)
  if (place.lat != null && place.lng != null) {
    const d = itemDistance(item, place);
    if (d !== null) return !place.radius || d <= place.radius;
    // Items zonder coördinaten (bv. deals): op land/regio, zoals hieronder
  }
  if (!item.country) return true;
  if (!place.country) return true;
  if (item.country !== place.country) return false;
  if (!item.region || !place.region) return true;
  return item.region === place.region;
}
