# Usar la imagen oficial de Node.js
FROM node:18

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del backend
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre la API
EXPOSE 5000

# Comando para ejecutar el backend
CMD ["npx", "nodemon", "server.js"]
