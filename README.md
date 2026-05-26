# CV Web Profesional - Nicol Tamara Nieves Quiñonez

Este proyecto corresponde a un CV web profesional, responsive, editable y desplegable con Docker.

## Características

- Diseño moderno y responsive.
- CV con mínimo 50 secciones tipo hojas.
- Información personal actualizable.
- Componentes vinculados a redes sociales.
- Modo oscuro.
- Buscador interno.
- Edición de datos con JavaScript.
- Guardado de información en localStorage.
- Descarga de datos en formato JSON.
- Opción de imprimir o guardar como PDF.
- Despliegue con Docker y Nginx.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx
- GitHub

## Ejecutar con Docker

```bash
docker build -t cv-web-nicol .
docker run -d --name cv-web-nicol -p 8081:80 cv-web-nicol