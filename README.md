# POS System - Backend ⚙️

> ⚠️ **Estado del proyecto:** En desarrollo activo (Fase de APIs de gestión de productos, autenticación y checkout).

API REST desarrollada con **NestJS**, **TypeORM** y **SQLite** para alimentar el sistema de Punto de Venta (POS). Proporciona endpoints para la gestión de productos, búsqueda avanzada por SKU/nombre y respuestas estandarizadas para el cliente web.

---

## 🚀 Tecnologías utilizadas

* **Framework:** NestJS
* **Lenguaje:** TypeScript
* **Base de Datos:** SQLite
* **ORM:** TypeORM
* **Seguridad / Auth:** Passport + JWT (Bearer Tokens)

---

## 📌 Funcionalidades principales

* 🔍 **Búsqueda flexible de productos:** Endpoint capaz de encontrar productos por `id`, `sku` exacto o coincidencia parcial en el `name` (`Like`).
* 📦 **Respuestas estandarizadas:** Estructura de salida limpia y enmarcada (`{ data: ... }`) para mantener consistencia en las respuestas de la API.
* 🛡️ **Seguridad:** Autenticación de endpoints mediante JWT Guards.

---

## 🛠️ Endpoints principales

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Autenticación de usuario y generación de Token JWT |
| `GET` | `/products` | Lista completa de productos registrados |
| `GET` | `/products/:term` | Búsqueda dinámica de producto por ID, SKU o Nombre |

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/Sanmgon20/pos-backend.git](https://github.com/Sanmgon20/pos-backend.git)

2. npm install

3. Configurar variables de entorno: Crear un archivo .env en la raíz (ej: puerto, clave secreta JWT).

4. npm run start:dev

La API se ejecutará en: http://localhost:3000/