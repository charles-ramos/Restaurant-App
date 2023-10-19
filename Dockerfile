FROM oven/bun

WORKDIR /

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "./src/index.ts"]