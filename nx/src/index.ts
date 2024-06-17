import { Hono } from 'hono';
import { html } from 'hono/html';
import { parse } from 'node-html-parser';
import { FC } from 'hono/jsx';

const app = new Hono();

app.get('/', async (c) => {
	let image_api_url = c.env.TWIT_IMAGE_URL;
	let tweet_api_url = c.env.TWIT_CONTENT_URL;

	const tweet_param = c.req.query('tweet');
	if (tweet_param) {
		const twit_image = `${image_api_url}${tweet_param}`;
		const twit_resp = await fetch(`${tweet_api_url}${tweet_param}`);
		let twit_contents: string | undefined = undefined;

		if (twit_resp.ok) {
			twit_contents = await twit_resp.text();
		}

		return c.html(
			html`<!doctype html>
  <head>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Twit" />
		<meta property="og:description" content="${twit_contents}" />
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
</html>`
		);
	} else {
		return c.text('Tweet not supplied', 500);
	}
});

app.get('/notfound', (c) => {
	return c.notFound();
});

export default app;
