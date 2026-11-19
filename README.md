# Servicio de Cálculos Empresariales

Módulo central de lógica matemática y utilidades operacionales. Este repositorio implementa prácticas estándar de **Integración Continua y Entrega Continua (CI/CD)** mediante **GitHub Actions** para garantizar la calidad del código, trazabilidad y generación automatizada de artefactos de despliegue.

---

## 📋 Requisitos y Ejecución Local

* **Node.js** v20 o superior (Recomendado: v24 LTS)

### Comandos principales
```bash
# Ejecutar suite de pruebas unitarias
npm test

# Compilar y generar paquete de distribución (carpeta dist/)
npm run build
```

---

## 📁 Estructura del Proyecto

```text
├── .github/
│   └── workflows/
│       └── ci.yml        # Pipeline automatizado de CI/CD
├── src/
│   └── math.js           # Lógica de negocio
├── test/
│   └── math.test.js      # Pruebas unitarias automatizadas
├── scripts/
│   └── build.js          # Script de empaquetado de producción
└── package.json
```

---

## 🛡️ Flujo de Trabajo y Reglas de Contribución (Git Flow)

Para mantener la estabilidad del ambiente productivo, la rama **`main` se encuentra protegida**. **No está permitido realizar `push` directo a `main`.**

Todo desarrollador debe seguir obligatoriamente el siguiente flujo para incorporar cambios:

### 1. Crear una rama desde `main`
Trabaja siempre en una rama dedicada usando prefijos descriptivos (`feature/`, `fix/`, `chore/`):
```bash
git checkout main
git pull origin main
git checkout -b feature/nombre-del-cambio
```

### 2. Desarrollar y validar localmente
Antes de subir tus cambios, asegúrate de que las pruebas unitarias pasen en tu entorno local:
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
El Pull Request únicamente podrá ser integrado a `main` cuando cumpla con **ambos candados**:
1. **Validación Automática (CI):** El workflow `1. CI - Pruebas Unitarias` debe finalizar en estado **Aprobado (✔)**.
2. **Validación Humana (Code Review):** Debe contar con la aprobación de al menos un revisor o **Líder Técnico**.

---

## ⚙️ Arquitectura del Pipeline (CI/CD)

El workflow configurado en `.github/workflows/ci.yml` opera en dos etapas:

| Etapa | Disparador (*Trigger*) | Acciones ejecutadas |
| :--- | :--- | :--- |
| **1. Integración Continua (CI)** | `pull_request` y `push` a `main` | Descarga el código, configura Node.js 24 y ejecuta todas las pruebas unitarias (`npm test`). |
| **2. Entrega Continua (CD)** | Solo `push` (Merge) a `main` | Si CI es exitoso: compila la aplicación (`npm run build`), almacena el artefacto `paquete-produccion` y ejecuta el despliegue. |
