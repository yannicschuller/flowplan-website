# Flowplan website

The product website of [Flowplan](https://github.com/yannicschuller/flowplan) at [flowplan.org](https://flowplan.org), in German and English. The app runs at [app.flowplan.org](https://app.flowplan.org), the documentation at [docs.flowplan.org](https://docs.flowplan.org) ([flowplan-docs](https://github.com/yannicschuller/flowplan-docs)).

## Development

```bash
npm install
APP_URL=http://127.0.0.1:3000 npm run dev
```

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `APP_URL` | `https://app.flowplan.org` | The Flowplan app: sign-in, sign-up and demo links; the start page asks its `/api/site-info` whether sign-up and the demo are open. |
| `DOCS_URL` | `https://docs.flowplan.org` | The documentation. |

Old addresses of flowplan.org (`/share/…`, `/forms/…`, `/login`, `/docs/…`, `#page=…`) are forwarded to the app and the docs.

## Image

Every push to `main` publishes `ghcr.io/yannicschuller/flowplan-website:latest` (and `:sha-…`) for `linux/amd64` and `linux/arm64`. The container listens on port 3000 and has a healthcheck on `/api/health`.

## License

AGPL-3.0, like Flowplan.
