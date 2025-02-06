# syntax=docker/dockerfile:1

# Usar una imagen base de Node.js
FROM node:18-alpine


# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app


# Copiar package.json y package-lock.json al contenedor
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .



# Instalar nodemon globalmente
RUN npm install -g nodemon

RUN chown -R node /usr/src/app
USER node

# Exponer el puerto por el que correrá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]