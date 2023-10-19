FROM oven/bun

WORKDIR /

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "./src/index.ts"]