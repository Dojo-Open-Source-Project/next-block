# Next Block — Bitcoin Fee Estimator

Next Block is a service that estimates the fee rate likely to get your Bitcoin transaction confirmed in the next block. It ingests mempool data via @samouraiwallet/one-dollar-fee-estimator and updates the UI live using Server‑Sent Events (SSE). You’ll see Low / Medium / High targets and details about the most recent block.

- Tech: Remix (Vite), React, Express server
- Live updates: SSE endpoint at `/sse/fees`
- Min Node version: 18+

## Getting started (development)

Prerequisites:
- Node.js 18+
- pnpm or npm

Install dependencies:
```sh
pnpm install
# or
npm install
```

Start the dev server (Express + Vite middleware):
```sh
pnpm dev
# or
npm run dev
```

By default the app listens on http://localhost:3000 (set PORT to change). Vite handles hot reloading during development.

## Environment configuration (.env)

This app uses environment variables for configuration.
- The HTTP server reads PORT (default 3000) in server.mjs.
- App settings and Bitcoin Core RPC credentials are loaded via dotenv from a .env file in the project root (see app/config/config.server.ts).
- If any required variable is missing, the app will throw at startup with a helpful message.

Required variables
- HOSTNAME: Public host used to build absolute URLs
- BITCOIND_HOST: Bitcoin Core RPC host (e.g., 127.0.0.1)
- BITCOIND_PORT: Bitcoin Core RPC port (e.g., 28256)
- BITCOIND_USERNAME: Bitcoin Core RPC username
- BITCOIND_PASSWORD: Bitcoin Core RPC password

Optional variables
- PORT: Web server port (defaults to 3000)

Example .env
```env
# Web server
PORT=3000
HOSTNAME=localhost:3000

# Bitcoin Core RPC
BITCOIND_HOST=127.0.0.1
BITCOIND_PORT=8332
BITCOIND_USERNAME=your_rpc_user
BITCOIND_PASSWORD=your_rpc_password
```

Notes
- Do not commit your .env file. Add it to .gitignore if needed.
- In production you can either provide a .env file or, preferably, set real environment variables via your process manager (e.g., PM2) or system service (systemd, Docker, etc.). dotenv will load .env when present.
- The current RPC protocol in app/services/estimator.server.ts is set to "http". Ensure your node is reachable over HTTP on the specified host/port, or adjust as needed.

## Production build and run

Build the app:
```sh
pnpm build
# or
npm run build
```

Run in production mode:
```sh
PORT=3000 NODE_ENV=production pnpm start
# or
PORT=3000 NODE_ENV=production npm start
```

The production server is `server.mjs` (Express + Remix). Static client assets are emitted to `build/client/assets` and SSR output to `build/server`.

### Process manager (optional)
You can run this with a process manager like PM2 for zero‑downtime restarts and automatic restarts on crash. A sample config is provided:
- `pm2.config.cjs.example`

Typical usage:
```sh
pm2 start pm2.config.cjs.example --env production
pm2 logs
pm2 restart <name>
```

## Deployment notes

- Ensure Node.js 18+ on the server.
- Build on the target machine or in CI and deploy the `build/` artifacts along with app files.
- Set environment variables as needed (e.g., `PORT`).
- Run `NODE_ENV=production node server.mjs` (or use PM2 as above).

### Reverse proxy configuration (SSE required)
This app relies on Server‑Sent Events at `/sse/fees`. If you deploy behind a reverse proxy (like Nginx), make sure SSE is not buffered and HTTP/1.1 is used. Here’s a minimal Nginx example:

```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;

    # Required for SSE
    proxy_http_version 1.1;
    proxy_set_header Connection ""; # disable header that can trigger keep-alive issues
    proxy_set_header X-Accel-Buffering no; # disable nginx buffering
    proxy_buffering off;
    proxy_cache off;
    proxy_read_timeout 3600s; # keep the stream open

    # Optional headers
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Without these settings, the live updates may stall or never arrive because the proxy buffers or closes the SSE stream.

## Scripts reference
- `pnpm dev` / `npm run dev` — start development server with Vite middleware
- `pnpm build` / `npm run build` — build client and server bundles
- `pnpm start` / `npm start` — start production server (expects prior build)
- `pnpm typecheck` — TypeScript type checking
- `pnpm lint` / `pnpm lint:fix` / `pnpm format` — code quality tools

## License
AGPL-3.0 © Katana Cryptographic Ltd.
