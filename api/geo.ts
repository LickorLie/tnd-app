// Vercel Edge Function: geeft alleen het land (en regio-code) terug op basis van het IP.
// Er wordt niets opgeslagen.
export const config = { runtime: 'edge' };

export default function handler(req: Request): Response {
  const country = req.headers.get('x-vercel-ip-country') || '';
  const region = req.headers.get('x-vercel-ip-country-region') || '';
  return new Response(JSON.stringify({ country, region }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
