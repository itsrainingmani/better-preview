import { ImageResponse } from "@vercel/og";
import type { VercelRequest } from "@vercel/node";
import { parse } from "node-html-parser";

export const config = {
  runtime: "edge",
};

export default async function handler(request: VercelRequest) {
  try {
    const fontData = await fetch(
      new URL("../../assets/berkeley-mono.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    const { searchParams } = new URL(request.url ?? "");

    // ?title=<title>
    const hasTitle = searchParams.has("url");
    const title = hasTitle
      ? searchParams.get("url")?.slice(0, 100)
      : "https://twitter.com/KateKozuch/status/1753425540025856483";

    const twitter_oembed = `https://publish.twitter.com/oembed?url=${title}&omit_script=1&lang=en`;

    const resp = await fetch(twitter_oembed);
    let data = await resp.json();

    const domstring = parse(data["html"]);
    const blockquote =
      domstring.getElementsByTagName("blockquote")[0].innerText;

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              // marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
              fontFamily: "Berkeley Mono",
            }}
          >
            {blockquote}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Berkeley Mono",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
