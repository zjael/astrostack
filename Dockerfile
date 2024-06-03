ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine AS base
RUN apk update && apk add --no-cache libc6-compat
RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune server --docker

FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN turbo build --filter=server
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

FROM base as runner
ARG PORT=3000
ARG PAYLOAD_CONFIG_PATH=/app/apps/cms/dist/payload.config.js
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=${PORT}
ENV PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/apps/server
EXPOSE ${PORT}

CMD node --conditions=serve dist/index.js