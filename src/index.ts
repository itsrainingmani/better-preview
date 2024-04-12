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
		const twit_data: any = await twit_resp.json();
		let twit_contents;

		if (twit_data) {
			twit_contents = twit_data['content'];
		}

		return c.html(
			html`<!doctype html>
  <head>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${twit_contents ?? 'Twit'}" />
    <meta property="og:url" content="${tweet_param}" />
    <meta property="og:image" content="${twit_image}" />
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
