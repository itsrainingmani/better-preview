import { ImageResponse } from "@vercel/og";
import type { VercelRequest } from "@vercel/node";
import { parse } from "node-html-parser";

export const config = {
	runtime: "edge",
};

const MAX_TWEET_LENGTH = 280;

function decodeHtmlEntities(html: string) {
	return html.replace(/&#(\d+);|&([^;\s]+);/g, (match, decimal, named) => {
		if (named) {
			// Handle named entities
			const map: Record<string, string> = {
				amp: "&",
				lt: "<",
				gt: ">",
				quot: '"',
				apos: "'",
				nbsp: "\u00A0",
				ndash: "–",
				mdash: "—",
				lsquo: "‘",
				rsquo: "’",
				sbquo: "‚",
				ldquo: "“",
				rdquo: "”",
				bdquo: "„",
			};
			return map[named] || match;
		}
		// Handle decimal entities
		return String.fromCharCode(decimal);
	});
}

export default async function handler(request: VercelRequest) {
	try {
		const regFontData = await fetch(
			new URL("../../assets/Lato-Regular.ttf", import.meta.url),
		).then((res) => res.arrayBuffer());
		const boldFontData = await fetch(
			new URL("../../assets/Lato-Bold.ttf", import.meta.url),
		).then((res) => res.arrayBuffer());

		const { searchParams } = new URL(request.url ?? "");

		const hasTitle = searchParams.has("url");
		let image_text = "";
		let user_info = "";
		if (hasTitle) {
			const title = hasTitle
				? searchParams.get("url")?.slice(0, 100)
				: "https://twitter.com/KateKozuch/status/1753425540025856483";

			const twitter_oembed = `https://publish.twitter.com/oembed?url=${title}&omit_script=1&lang=en`;

			const resp = await fetch(twitter_oembed);
			const data = await resp.json();

			const domstring = parse(data.html);
			image_text = decodeHtmlEntities(
				domstring.getElementsByTagName("blockquote")[0].innerText,
			);

			const last_emdash = image_text.lastIndexOf("— ");

			const split_name_and_date = image_text
				.slice(last_emdash + 2, image_text.length)
				.split(")");
			const display_name = `${split_name_and_date[0].trim()})`;
			const tweet_date = split_name_and_date[1].trim();

			user_info = `${display_name} | ${tweet_date}`;
			image_text = image_text.slice(0, last_emdash);
		} else {
			image_text = "twitter";
		}

		return new ImageResponse(
			<div
				style={{
					display: "flex",
					height: "100%",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					// backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
					// backgroundColor: "#1C1B1B",
					backgroundImage: "linear-gradient(135deg, #0A0A0A, #1A1A2E, #2A0A3D)",
					color: "#E7E9EA",
					letterSpacing: "normal",
					textAlign: "justify",
					fontFamily: "Lato",
					fontSize: 40,
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						fontSize: 20,
						marginBottom: "10px",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						fontWeight: 400,
						WebkitFontSmoothing: "always",
					}}
				>
					{user_info}
				</div>
				<div
					style={{
						fontSize: 30,
						lineHeight: 1.4,
						padding: "0 20px",
						wordWrap: "break-word",
						whiteSpace: "pre-line",
						maxHeight: "80%",
						overflow: "hidden",
						textOverflow: "ellipsis",
						fontWeight: 600,
						display: "-webkit-box",
						WebkitLineClamp: "7",
						WebkitBoxOrient: "vertical",
						WebkitFontSmoothing: "always",
					}}
				>
					{image_text}
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Lato",
						data: regFontData,
						weight: 400,
					},
					{
						name: "Lato",
						data: boldFontData,
						weight: 600,
					},
				],
			},
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response("Failed to generate the image", {
			status: 500,
		});
	}
}
