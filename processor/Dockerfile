from node:18-alpine

WORKDIR /app

COPY package*.json . 

RUN npm install

COPY . .
RUN npx tsc -b
RUN npx prisma generate

CMD ["sh", "-c", "npx prisma db pull && npx prisma generate &&  node dist/index.js"]