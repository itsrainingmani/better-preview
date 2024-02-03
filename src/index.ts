import { Hono } from "hono";
import { html } from "hono/html";
import { parse } from "node-html-parser";
import { FC } from "hono/jsx";

const app = new Hono();

app.get("/", async (c) => {
  let image_api_url = c.env.TWIT_IMAGE_URL;

  const tweet_param = c.req.query("tweet");
  if (tweet_param) {
    const twit_image = `${image_api_url}${tweet_param}`;

    return c.html(
      html`<!doctype html>
  <head>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Twit" />
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
</html>`,
    );
  } else {
    return c.text("Tweet not supplied", 500);
  }
});

app.get("/notfound", (c) => {
  return c.notFound();
});

export default app;
