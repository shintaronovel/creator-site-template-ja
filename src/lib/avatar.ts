import { getImage } from 'astro:assets';
import { siteConfig } from '../site-config.mjs';
import { resolveImage } from './media';

/**
 * The author's icon from site.config.yaml, cut to a square from the middle, at `size` pixels; undefined when not set.
 * Used on the author page and as the site's icon (browser tabs, search results, phone home screens).
 */
export async function getAvatarUrl(size: number, format: 'png' | 'webp' = 'png'): Promise<string | undefined> {
	if (!siteConfig.avatar) return undefined;
	const image = resolveImage(siteConfig.avatar, 'site.config.yaml');
	const { src } = await getImage({ src: image, width: size, height: size, fit: 'cover', format });
	return src;
}
