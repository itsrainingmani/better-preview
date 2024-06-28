import { ImageResponse } from '@vercel/og';
import type { VercelRequest } from '@vercel/node';
import { parse } from 'node-html-parser';

export const config = {
	runtime: 'edge',
};

const MAX_TWEET_LENGTH = 280;

function decodeHtmlEntities(html: string) {
	return html.replace(/&#(\d+);|&([^;\s]+);/g, (match, decimal, named) => {
		if (named) {
			// Handle named entities
			const map: Record<string, string> = {
				amp: '&',
				lt: '<',
				gt: '>',
				quot: '"',
				apos: "'",
				nbsp: '\u00A0',
				ndash: '–',
				mdash: '—',
				lsquo: '‘',
				rsquo: '’',
				sbquo: '‚',
				ldquo: '“',
				rdquo: '”',
				bdquo: '„',
			};
			return map[named] || match;
		}
		// Handle decimal entities
		return String.fromCharCode(decimal);
	});
}

export default async function handler(request: VercelRequest) {
	try {
		const fontData = await fetch(
			new URL('../../assets/berkeley-mono.ttf', import.meta.url)
		).then((res) => res.arrayBuffer());
		const { searchParams } = new URL(request.url ?? '');

		// ?title=<title>
		const hasTitle = searchParams.has('url');
		let image_text = '';
		let display_text = '';
		if (hasTitle) {
			const title = hasTitle
				? searchParams.get('url')?.slice(0, 100)
				: 'https://twitter.com/KateKozuch/status/1753425540025856483';

			const twitter_oembed = `https://publish.twitter.com/oembed?url=${title}&omit_script=1&lang=en`;

			const resp = await fetch(twitter_oembed);
			const data = await resp.json();

			const domstring = parse(data.html);
			image_text = decodeHtmlEntities(
				domstring.getElementsByTagName('blockquote')[0].innerText
			);
			console.log(image_text);

			const last_emdash = image_text.lastIndexOf('— ');

			const split_name_and_date = image_text
				.slice(last_emdash + 2, image_text.length)
				.split(')');
			const display_name = `${split_name_and_date[0].trim()})`;
			const tweet_date = split_name_and_date[1].trim();

			display_text = `${display_name} | ${tweet_date}`;
			image_text = image_text.slice(0, last_emdash);

			if (image_text.length >= MAX_TWEET_LENGTH) {
				image_text = image_text.slice(0, MAX_TWEET_LENGTH - 3);
			}

			if (image_text.substring(image_text.length - 3, image_text.length)) {
				image_text += '...';
			}
		} else {
			image_text = 'twitter';
		}

		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						height: '100%',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
						letterSpacing: -2,
						fontWeight: 700,
						textAlign: 'center',
						boxSizing: 'border-box',
					}}
				>
					<div
						style={{
							fontSize: 'clamp(14px, 4vw, 20px)',
							marginBottom: '10px',
							fontFamily: 'Berkeley Mono',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{display_text}
					</div>
					<div
						style={{
							fontSize: 'clamp(20px, 5vw, 40px)',
							fontStyle: 'normal',
							letterSpacing: '-0.025em',
							padding: '0 20px',
							lineHeight: 1.2,
							wordWrap: 'break-word',
							whiteSpace: 'pre-line',
							fontFamily: 'Berkeley Mono',
							maxHeight: '80%',
							overflow: 'hidden',
							display: '-webkit-box',
							WebkitLineClamp: '4',
							WebkitBoxOrient: 'vertical',
							textOverflow: 'ellipsis',
						}}
					>
						{image_text}
					</div>
				</div>
			),
			{
				width: 800,
				height: 400,
				fonts: [
					{
						name: 'Berkeley Mono',
						data: fontData,
						style: 'normal',
					},
				],
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response('Failed to generate the image', {
			status: 500,
		});
	}
}
