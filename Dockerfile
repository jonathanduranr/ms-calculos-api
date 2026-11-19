# Imagen base ultraliviana con servidor web Nginx
FROM nginx:alpine

# Copiamos los archivos compilados desde dist/ hacia el directorio web de Nginx
COPY dist/ /usr/share/nginx/html/

# Exponemos el puerto estándar HTTP
EXPOSE 80
