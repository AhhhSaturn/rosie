FROM oven/bun

WORKDIR /app

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

COPY ./ ./

ENV NODE_ENV=production

RUN bun --bun run build

CMD ["bun", "--bun", "./build/index.js"]

EXPOSE 3000