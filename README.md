# Better Preview

![Vercel](https://vercelbadge.vercel.app/api/itsrainingmani/better-preview?style=for-the-badge)

FB Messenger previews for any `x.com` / `twitter.com` links are completely borked.

Use this service to create links that will show previews on Facebook

## Usage

Replace `x.com` with `twit.rip` in any tweet link -> `https://twit.rip/:username/status/:tweet_id`

eg. -> <https://twit.rip/leostera/status/1753619722132750413>

## How it works

There are two components to this project.

- `twimage` uses Twitter OEmbed API to get the metadata associated with a given tweet and then generates the preview image using the Vercel OpenGraph Image Library.
- `nx` is a Cloudflare Worker running on a custom domain that "constructs" the `meta` tags necessary for FB to generate a proper link preview

## Upcoming Features

- [ ] Better UI for the Link Preview Images
- [ ] Parsing images within tweets and using that as the preview image
