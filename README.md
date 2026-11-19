# Demo CI/CD con GitHub Actions - Duoc UC (ISY1101)

Este proyecto implementa un flujo real de **GitHub Flow + CI/CD** diseñado para la **Clase Simulada de Selección Docente** en Duoc UC.

---

## 🎯 Cómo funciona el Pipeline (`.github/workflows/ci.yml`)

| Evento | Job 1: `integracion-continua` (Tests) | Job 2: `entrega-continua` (Build + Artefacto + Deploy) |
| :--- | :---: | :---: |
| **Pull Request hacia `main`** | ✅ **Se ejecuta** | ⏭️ **Omitido** (No se despliega código sin aprobar) |
| **Merge / Push a `main`** | ✅ **Se vuelve a ejecutar** | 🚀 **Se ejecuta** (Solo si Job 1 pasó en verde) |

---

## 🚀 Subir el proyecto inicial a GitHub

```bash
cd /Users/jonathanduran/.gemini/antigravity/scratch/demo-devops-ci

git init
git add .
git commit -m "feat: configuracion inicial de proyecto y pipeline CI/CD"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/duoc-devops-ci.git
git push -u origin main
```

---

## 🔒 Regla de Gobernanza en GitHub (Protección de `main`)

Durante la clase se debe enfatizar que la rama `main` está **protegida**:
1. **Prohibido el `push` directo a `main`:** Todo cambio debe entrar obligatoriamente mediante un **Pull Request (PR)**.
2. **Doble validación para hacer Merge:**
   * **Validación Humana:** Aprobación de un revisor / Líder Técnico (*Code Review*).
   * **Validación Automática (CI):** El workflow `1. CI - Pruebas Unitarias` debe terminar en **Verde (✔)**.

> **Nota para la Demo en vivo:** En *Settings > Branches* de tu repositorio, activa *"Require status checks to pass"* (y opcionalmente muestra la casilla de *"Require approvals"*), asegurándote de que como administrador puedas hacer *Merge* en vivo sin quedarte bloqueado por no poder auto-aprobar tu propio PR.

---

## 🎬 Guion del Live Demo en la Sala (Flujo Completo en 4 Actos)

### Acto 1: Crear una rama y provocar un error en el Pull Request (4 min)
1. En la terminal, crea una rama nueva simulando un desarrollo:
   ```bash
   git checkout -b feature/nueva-funcion
   ```
2. En VS Code, abre `test/math.test.js` y rompe un test a propósito (ej. espera `99` en vez de `5`).
3. Haz commit y push de la rama:
   ```bash
   git commit -am "feat: ajuste en logica de suma"
   git push -u origin feature/nueva-funcion
   ```
4. En GitHub, abre el **Pull Request** hacia `main`.
5. **Momento clave en pantalla:** Muestra cómo GitHub Actions se dispara automáticamente dentro del PR, ejecuta **solo CI** y marca una **X Roja (❌)** bloqueando el merge seguro.
6. Haz clic en *Details* → muestra el log exacto (`AssertionError: 5 == 99`) y pregunta a los evaluadores qué pasó.

### Acto 2: Corregir en la rama y ver el CI en verde (2 min)
1. En VS Code, corrige el test devolviendo el valor a `5`.
2. Haz commit y push a la misma rama:
   ```bash
   git commit -am "fix: correccion de prueba unitaria"
   git push
   ```
3. Vuelve al Pull Request en GitHub: el check se pondrá en **Verde (✔)** y en la pestaña *Actions* se verá que `integracion-continua` pasó y `entrega-continua` fue omitido (`Skipped`).

### Acto 3: Hacer Merge a `main` y activar CD (3 min)
1. Haz clic en **"Merge pull request"** → **"Confirm merge"** en GitHub.
2. Ve a la pestaña **Actions**.
3. Muestra la magia visual del pipeline completo de 2 cajas conectadas:
   * Primero vuelve a correr **1. CI - Pruebas Unitarias** sobre `main`.
   * Cuando termina en verde, automáticamente arranca **2. CD - Artefacto y Despliegue**.

### Acto 4: Descargar el Artefacto de Producción (1 min)
1. Al terminar la ejecución en verde, baja hasta la sección **Artifacts** en el resumen del workflow.
2. Descarga `paquete-produccion.zip` y abre `index.html` en el navegador para mostrar el resultado final empaquetado.
