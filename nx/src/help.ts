import { html } from "hono/html";

export function help_msg() {
	return html`<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/itsrainingmani/better-preview/main/twit.png"
				/>
				<title>Better Tweet Previews</title>
				<link
					rel="icon"
					href="https://github.com/itsrainingmani/better-preview/assets/10191300/095f820a-4b77-476c-b8ae-aad68cc9efe2"
				/>
				<style>
					:root {
						--bg-color: #f0f2f5;
						--text-color: #1c1e21;
						--card-bg-color: #ffffff;
						--shadow-color: rgba(0, 0, 0, 0.1);
					}

					@media (prefers-color-scheme: dark) {
						:root {
							--bg-color: #18191a;
							--text-color: #f5f6f7;
							--card-bg-color: #242526;
							--shadow-color: rgba(255, 255, 255, 0.1);
						}
					}

					html,
					body {
						height: 100%;
						margin: 0;
						padding: 0;
					}

					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
							Helvetica, Arial, sans-serif;
						background-color: var(--bg-color);
						color: var(--text-color);
						line-height: 1.6;
					}
					.container {
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
						padding-bottom: 60px; /* Add space for the footer */
						position: relative;
						min-height: 100vh;
					}
					h2 {
						color: #1da1f2;
						text-align: center;
						font-size: 28px;
						margin-bottom: 30px;
					}
					.step {
						background-color: var(--card-bg-color);
						border-radius: 15px;
						padding: 20px;
						margin-bottom: 20px;
						box-shadow: 0 1px 2px var(--shadow-color);
						display: flex;
						align-items: center;
					}
					.step-number {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #0084ff;
						color: #ffffff;
						width: 30px;
						height: 30px;
						text-align: center;
						border-radius: 50%;
						margin-right: 15px;
						flex-shrink: 0;
					}
					.step-content {
						flex-grow: 1;
					}
					a {
						color: #0084ff;
						text-decoration: none;
					}
					a:hover {
						text-decoration: underline;
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
					footer {
						width: 100%;
						padding: 10px 0;
						font-size: 14px;
						color: #777;
						text-align: center;
						border-top: 1px solid var(--card-bg-color);
						position: absolute;
						bottom: 0;
						left: 0;
					}

					footer a {
						color: #0084ff;
						text-decoration: none;
					}

					footer a:hover {
						color: #333;
						text-decoration: underline;
					}

					@keyframes draw {
						to {
							stroke-dashoffset: 0;
						}
					}
					@media (max-width: 480px) {
						.container {
							padding: 10px;
						}
						h1 {
							font-size: 24px;
						}
						.step {
							padding: 15px;
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
					<h2>Better Tweet Previews with Twit.RIP</h2>
					<div class="step">
						<span class="step-number">1</span>
						<span class="step-content">
							Download and Install the
							<a
								href="https://www.icloud.com/shortcuts/d366252a721e4c1a8336503021de1a9b"
								>Twit</a
							>
							Shortcut
						</span>
					</div>
					<div class="step">
						<span class="step-number">2</span>
						<span class="step-content">
							Use the <i>Share via...</i> option when sharing a tweet and select
							the <strong>Twit</strong> Shortcut
						</span>
					</div>
					<div class="step">
						<span class="step-number">3</span>
						<span class="step-content">
							Send your Better Tweet Link to your FB Messenger Contacts!
						</span>
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
								fill="url(#a)"
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
					made by
					<a
						href="https://twitter.com/itsrainingmani"
						target="_blank"
						rel="noopener noreferrer"
						>@itsrainingmani</a
					>
					<span style="color: #ccc;">|</span>
					<a
						href="https://github.com/itsrainingmani"
						target="_blank"
						rel="noopener noreferrer"
						>github</a
					>
				</footer>
			</body>
		</html> `;
}
