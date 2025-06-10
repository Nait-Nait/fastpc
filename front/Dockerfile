# Imagen base oficial de Node.js
FROM node:20-alpine

# Crea y usa el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json primero para aprovechar caché
COPY . .

RUN npm install -g pnpm && pnpm install

RUN pnpm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
