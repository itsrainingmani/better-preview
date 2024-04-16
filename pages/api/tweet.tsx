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
		} else {
			// Handle decimal entities
			return String.fromCharCode(decimal);
		}
	});
}

export default async function handler(request: VercelRequest) {
	try {
		const { searchParams } = new URL(request.url ?? '');

		// ?title=<title>
		const hasTitle = searchParams.has('url');
		let tweet_text = '';
		let display_text = '';
		if (hasTitle) {
			const title = hasTitle
				? searchParams.get('url')?.slice(0, 100)
				: 'https://twitter.com/KateKozuch/status/1753425540025856483';

			const twitter_oembed = `https://publish.twitter.com/oembed?url=${title}&omit_script=1&lang=en`;

			const resp = await fetch(twitter_oembed);
			let data = await resp.json();

			const domstring = parse(data['html']);
			tweet_text = decodeHtmlEntities(
				domstring.getElementsByTagName('blockquote')[0].innerText
			);
			console.log(tweet_text);

			let last_emdash = tweet_text.lastIndexOf('— ');

			let split_name_and_date = tweet_text
				.slice(last_emdash + 2, tweet_text.length)
				.split(')');
			let display_name = split_name_and_date[0].trim() + ')';
			let tweet_date = split_name_and_date[1].trim();

			display_text = `${display_name} | ${tweet_date}`;
			tweet_text = tweet_text.slice(0, last_emdash);

			if (tweet_text.length >= MAX_TWEET_LENGTH) {
				tweet_text = tweet_text.slice(0, MAX_TWEET_LENGTH - 3);
			}

			if (tweet_text.substring(tweet_text.length - 3, tweet_text.length)) {
				tweet_text += '...';
			}
		} else {
			tweet_text = 'twitter';
		}

		return new Response(display_text + '\n' + tweet_text);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to get tweet contents`, {
			status: 500,
		});
	}
}
