import type { APIRoute } from 'astro';
import { getGenres } from '../lib/catalog';

// With works in only one genre, the top page (index.astro) is a page that moves the reader on to that genre's list,
// and its link to the list shows for a moment while it does. This writes dist/_redirects so Cloudflare sends the
// reader on before that page loads. index.astro stays as it is, for the dev server and for hosts that don't read
// _redirects. A file named _redirects can't be a page of its own (Astro skips names starting with "_"), hence the
// parameter. With two or more genres the top page is a real page and no file is written.
export async function getStaticPaths() {
	const genres = await getGenres();
	return genres.length < 2 ? [{ params: { redirects: '_redirects' }, props: { path: `/${genres[0] ?? 'novels'}` } }] : [];
}

export const GET: APIRoute = ({ props }) =>
	new Response(`/ ${props.path} 302\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
