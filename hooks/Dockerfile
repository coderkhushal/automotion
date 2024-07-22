from node:18-alpine

WORKDIR /app

COPY package*.json . 

RUN npm install
COPY . .

RUN npx tsc -b
RUN npx prisma generate
EXPOSE 3000

CMD ["node", "dist/index.js"]