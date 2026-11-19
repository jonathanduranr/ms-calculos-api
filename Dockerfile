# Imagen base oficial de Node.js ultraliviana
FROM node:24-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos definición del proyecto y código fuente
COPY package.json ./
COPY src/ ./src/

# Exponemos el puerto del microservicio
EXPOSE 3000

# Comando de inicio en producción
CMD ["node", "src/server.js"]
