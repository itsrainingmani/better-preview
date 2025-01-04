import { html } from "hono/html";

export function help_msg() {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/itsrainingmani/better-preview/main/twit.png"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Inter"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Fanwood+Text"
          rel="stylesheet"
        />
        <title>Better Tweet Previews</title>
        <style>
          :root {
            --text-color: #1c1e21;
            --card-bg-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --accent-color: #1da1f2;
            --messenger-color: #0084ff;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --text-color: #f5f6f7;
              --card-bg-color: rgba(36, 37, 38, 0.8);
              --shadow-color: rgba(255, 255, 255, 0.1);
            }
          }

          body {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, Helvetica, Arial, sans-serif;
            color: var(--text-color);
            line-height: 1.6;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: linear-gradient(135deg, #1a1c2e 0%, #2a3045 100%);
            position: relative;
            overflow-x: hidden;
          }

          /* Animated background pattern */
          body::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(
                circle at 15% 50%,
                rgba(29, 161, 242, 0.1) 0%,
                transparent 25%
              ),
              radial-gradient(
                circle at 85% 30%,
                rgba(0, 132, 255, 0.1) 0%,
                transparent 25%
              );
            animation: breathe 8s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes breathe {
            0%,
            100% {
              opacity: 0.3;
            }

            50% {
              opacity: 0.7;
            }
          }

          .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
            flex-grow: 1;
            position: relative;
            z-index: 1;
          }

          .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 30px 20px;
          }

          h1 {
            color: #fff;
            font-size: 3em;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #1da1f2 0%, #0084ff 100%);
            background-clip: var(--text-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientText 3s ease-in-out infinite;
          }

          @keyframes gradientText {
            0%,
            100% {
              filter: hue-rotate(0deg);
            }

            50% {
              filter: hue-rotate(10deg);
            }
          }

          .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.5em;
            max-width: 600px;
            margin: 0 auto;
          }

          .problem {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 35px;
            margin-bottom: 60px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.9);
          }

          .problem h2 {
            color: #fff;
            margin-top: 0;
          }

          .steps {
            display: grid;
            gap: 30px;
          }

          .step {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 35px;
            display: flex;
            align-items: flex-start;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease;
          }

          .step:hover {
            transform: translateY(-5px);
          }

          .step-number {
            background: linear-gradient(135deg, #1da1f2 0%, #0084ff 100%);
            color: white;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 25px;
            flex-shrink: 0;
            font-size: 1.2em;
            box-shadow: 0 4px 15px rgba(29, 161, 242, 0.3);
          }

          .step-content {
            flex-grow: 1;
            color: rgba(255, 255, 255, 0.9);
          }

          .step-title {
            font-weight: bold;
            font-size: 1.4em;
            margin-bottom: 15px;
            color: #fff;
          }

          .note {
            background: rgba(29, 161, 242, 0.1);
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            font-size: 0.95em;
            border: 1px solid rgba(29, 161, 242, 0.2);
          }

          a {
            color: #1da1f2;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          a:hover {
            color: #0084ff;
            text-decoration: none;
          }

          footer {
            text-align: center;
            padding: 30px;
            background: rgba(0, 0, 0, 0.3);
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9em;
            backdrop-filter: blur(10px);
          }

          .divider {
            margin: 0 10px;
            color: rgba(255, 255, 255, 0.3);
          }

          ol,
          ul {
            color: rgba(255, 255, 255, 0.9);
            padding-left: 1.2em;
          }

          li {
            margin-bottom: 0.5em;
          }

          .icon-flow {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
          }

          .icon-flow svg {
            width: 40px;
            height: 40px;
          }

          .icon-flow .arrow {
            font-size: 24px;
            margin: 0 15px;
          }

          .loopy-arrow {
            width: 60px;
            height: 40px;
            margin: 0 15px;
          }

          .loopy-arrow path {
            fill: none;
            stroke: #0084ff;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: draw 2s linear forwards infinite;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @media (max-width: 600px) {
            .container {
              padding: 20px 15px;
            }

            .header {
              padding: 40px 20px;
            }

            h1 {
              font-size: 2.5em;
            }

            .step {
              padding: 25px;
            }

            .icon-flow svg {
              width: 30px;
              height: 30px;
            }

            .icon-flow .arrow {
              font-size: 20px;
              margin: 0 10px;
            }

            .loopy-arrow {
              width: 40px;
              height: 30px;
              margin: 0 10px;
            }
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="header">
            <h1>Fix Your Tweet Previews in Messenger</h1>
            <em
              >Share tweets on Facebook Messenger with working previews,
              thumbnails, and links</em
            >
          </div>

          <div class="problem">
            <h2>The Problem</h2>
            <p>
              When you share Twitter/X.com links on Facebook Messenger, the
              previews are broken - no images, no content, just ugly links. This
              tool fixes that by converting your Twitter links into a format
              that Messenger understands.
            </p>
          </div>

          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <div class="step-title">Install the iOS Shortcut</div>
                <p>
                  Download and add the
                  <a
                    href="https://www.icloud.com/shortcuts/d366252a721e4c1a8336503021de1a9b"
                    >Twit shortcut</a
                  >
                  to your iPhone, iPad or Macbook.
                </p>
                <div class="note">
                  💡 When installing, make sure to tap "Add Shortcut" when
                  prompted. This is a one-time setup.
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="step-title">Share a Tweet</div>
                <p>When viewing a tweet you want to share:</p>
                <ol>
                  <li>Tap the Share button on the tweet</li>
                  <li>Scroll through the share options</li>
                  <li>Select the "Twit" shortcut</li>
                </ol>
                <div class="note">
                  💡 The shortcut will automatically convert the link into a
                  Messenger-friendly format and copy it to your clipboard
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="step-title">Paste in Messenger</div>
                <p>
                  Open Messenger and paste the converted link into your chat.
                  You'll now see a proper preview with:
                </p>
                <ul>
                  <li>Tweet text content</li>
                  <li>Images and media</li>
                  <li>Profile information</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="icon-flow">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                fill="#1DA1F2"
              />
            </svg>
            <svg class="loopy-arrow" viewBox="0 0 60 40">
              <path d="M5,20 Q20,5 30,20 T55,20" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
              <radialGradient
                id="a"
                cx="101.9"
                cy="809"
                r="1.1"
                gradientTransform="matrix(800 0 0 -800 -81386 648000)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" style="stop-color:#09f" />
                <stop offset=".6" style="stop-color:#a033ff" />
                <stop offset=".9" style="stop-color:#ff5280" />
                <stop offset="1" style="stop-color:#ff7061" />
              </radialGradient>
              <path
                fill="u rl(#a)"
                d="M400 0C174.7 0 0 165.1 0 388c0 116.6 47.8 217.4 125.6 287 6.5 5.8 10.5 14 10.7 22.8l2.2 71.2a32 32 0 0 0 44.9 28.3l79.4-35c6.7-3 14.3-3.5 21.4-1.6 36.5 10 75.3 15.4 115.8 15.4 225.3 0 400-165.1 400-388S625.3 0 400 0z"
              />
              <path
                fill="#FFF"
                d="m159.8 501.5 117.5-186.4a60 60 0 0 1 86.8-16l93.5 70.1a24 24 0 0 0 28.9-.1l126.2-95.8c16.8-12.8 38.8 7.4 27.6 25.3L522.7 484.9a60 60 0 0 1-86.8 16l-93.5-70.1a24 24 0 0 0-28.9.1l-126.2 95.8c-16.8 12.8-38.8-7.3-27.5-25.2z"
              />
            </svg>
          </div>
        </div>

        <footer>
          Created by
          <a
            href="https://x.com/itsrainingmani"
            target="_blank"
            rel="noopener noreferrer"
            >@itsrainingmani</a
          >
          <span class="divider">|</span>
          <a
            href="https://github.com/itsrainingmani/better-preview"
            target="_blank"
            rel="noopener noreferrer"
            >github</a
          >
        </footer>
      </body>
    </html>`;
}
