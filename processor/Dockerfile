from node:18-alpine

WORKDIR /app

COPY package*.json . 

RUN npm install

COPY . .
RUN npx tsc -b
RUN npx prisma generate
CMD [ "node","dist/index.js"]