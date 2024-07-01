import { Hono } from "hono";
import { html } from "hono/html";
import { help_msg } from "./help";

const app = new Hono();

function gen_meta(
	username: string | undefined,
	tweet_param: string,
	twit_image: string,
) {
	return html`<!doctype html>
  <head>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${
			username ? `by @${username}` : "Twit"
		}" />
    <meta property="og:url" content="${tweet_param}" />
    <meta property="og:image" content="${twit_image}" />
		<meta property="og:image:width" content="800" />
		<meta property="og:image:height" content="400" />
    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", (event) => {
        window.location.href = "${tweet_param}";
      });
    </script>
  </head>
  <body>
  </body>
</html>`;
}

app.get("/", async (c) => {
	const image_api_url = c.env?.TWIT_IMAGE_URL;

	const tweet_param = c.req.query("tweet");
	if (tweet_param) {
		const twit_image = `${image_api_url}${tweet_param}`;

		return c.html(gen_meta(undefined, tweet_param, twit_image));
	}
	return c.html(help_msg());
});

// tweets are in the format - https://x.com/:username/status/:tweet_id
app.get("/:username/status/:tweet_id", async (c) => {
	const image_api_url = c.env?.TWIT_IMAGE_URL;

	const { username, tweet_id } = c.req.param();
	const tweet_param = `https://x.com/${username}/status/${tweet_id}`;
	const twit_image = `${image_api_url}${tweet_param}`;

	return c.html(gen_meta(username, tweet_param, twit_image));
});

app.get("/notfound", (c) => {
	return c.notFound();
});

export default app;
