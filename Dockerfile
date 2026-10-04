FROM node:26-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
FROM deps AS build
COPY . .
RUN chmod -R a+rX /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
FROM node:26-bookworm-slim AS runtime
LABEL org.opencontainers.image.title="flowplan-website" \
  org.opencontainers.image.source="https://github.com/yannicschuller/flowplan-website" \
  org.opencontainers.image.licenses="AGPL-3.0-only"
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
