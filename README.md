# ms-calculos-api

Microservicio API REST de operaciones matemáticas construido en Node.js. Implementa flujo profesional **Git Flow + CI/CD** con **GitHub Actions** y empaquetado en contenedor **Docker** (`node:24-alpine`).

---

## 🚀 Endpoints Disponibles

| Método | Ruta | Descripción | Ejemplo de Respuesta |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | *Health Check* del servicio | `{"status":"UP","service":"ms-calculos-api"}` |
| `GET` | `/sumar?a=2&b=3` | Suma dos números | `{"operacion":"sumar","a":2,"b":3,"resultado":5}` |
| `GET` | `/restar?a=10&b=4` | Resta dos números | `{"operacion":"restar","a":10,"b":4,"resultado":6}` |
| `GET` | `/multiplicar?a=3&b=4` | Multiplica dos números | `{"operacion":"multiplicar","a":3,"b":4,"resultado":12}` |

---

## 📋 Ejecución Local

* **Node.js** v24 LTS (o v20+)
* **Docker** (opcional para ejecución en contenedor)

```bash
# Ejecutar suite de pruebas unitarias
npm test

# Levantar el microservicio localmente
npm start

# Construir y levantar en contenedor Docker
docker build -t ms-calculos-api:local .
docker run -p 3000:3000 ms-calculos-api:local
```

---

## 📁 Estructura del Proyecto

```text
├── .github/
│   └── workflows/
│       └── ci.yml        # Pipeline automatizado CI/CD
├── src/
│   ├── math.js           # Lógica de negocio
│   └── server.js         # Servidor HTTP / API REST
├── test/
│   └── math.test.js      # Pruebas unitarias automatizadas
├── Dockerfile            # Imagen Docker (node:24-alpine)
├── .dockerignore
└── package.json
```

---

## 🛡️ Flujo de Trabajo y Reglas de Contribución (Git Flow)

Para proteger la estabilidad de producción, la rama **`main` está protegida**. **Está prohibido realizar `push` directo a `main`.**

Todo desarrollador debe seguir obligatoriamente este flujo:

### 1. Crear una rama desde `main`
```bash
git checkout main
git pull origin main
git checkout -b feature/nombre-del-cambio
```

### 2. Desarrollar y validar localmente
```bash
npm test
```

### 3. Subir la rama y abrir un Pull Request (PR)
```bash
git add .
git commit -m "feat: descripcion clara del cambio"
git push -u origin feature/nombre-del-cambio
```
Luego, abre un **Pull Request** en GitHub apuntando hacia `main`.

### 4. Validaciones obligatorias para el Merge
El PR únicamente podrá integrarse a `main` cuando cumpla con **ambos candados**:
1. **Validación Automática (CI):** El workflow `1. CI - Pruebas Unitarias` debe terminar en **Aprobado (✔)**.
2. **Validación Humana (Code Review):** Debe contar con la aprobación de un revisor o **Líder Técnico**.

---

## ⚙️ Arquitectura del Pipeline (CI/CD)

| Etapa | Disparador (*Trigger*) | Acciones ejecutadas |
| :--- | :--- | :--- |
| **1. Integración Continua (CI)** | `pull_request` y `push` a `main` | Descarga el código, configura Node.js 24 y ejecuta las pruebas unitarias (`npm test`). |
| **2. Entrega Continua (CD)** | Solo `push` (Merge) a `main` | Si CI pasa: construye imagen Docker taggeada `prod-<run_number>`, levanta el contenedor para validar `/health` y `/sumar` (*Smoke Test*), y almacena la imagen empaquetada como artefacto. |
