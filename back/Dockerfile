# Imagen base oficial de Node.js
FROM node:20-alpine

# Crea y usa el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json primero para aprovechar caché
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que corre Fastify (ajusta si usas otro)
EXPOSE 8888

# Comando por defecto para iniciar el servidor (ajusta si usas otro script)
CMD ["npm", "run", "dev"]
