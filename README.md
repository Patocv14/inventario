# Proyecto

## Pasos para ejectuar el programa

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando `npm install`
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejecturar el comando

```
   npx prisma migrate dev
   npx prisma generate
```
5. Ejecutar `npx prisma db seed` Esto creara el user de admin `email: admin@admin.com, password: admin`
6. Ejecutar `npm run dev`

Si hay cambios en el schema.prisma ejectuar `npx prisma generate` y luego `npx prisma migrate dev`
