# Alejandra García — Sitio Web Inmobiliario

Sitio web catálogo de proyectos inmobiliarios para **Alejandra García Oropeza**, Ejecutiva de Ventas de Incrementa Group, con cobertura en Huaral, Chancay y Huacho.

## 📁 Estructura del proyecto

```
sitio/
├── index.html                    Página principal (landing)
├── torres-de-huaral.html         Proyecto: Torres de Huaral
├── torres-de-huaral-2.html       Proyecto: Torres de Huaral 2
├── industrias-100.html           Proyecto: Industrias 100
├── hectareas-km98.html           Proyecto: Hectáreas Km 98
├── costa-beach.html              Proyecto: Paraiso Beach
├── 404.html                      Página de error personalizada
├── estilos.css                   Estilos compartidos
├── script.js                     JavaScript compartido
├── favicon.svg                   Ícono del sitio
├── netlify.toml                  Configuración de Netlify
├── imagenes/
│   └── alejandra.jpg             Foto de la asesora
└── videos/
    ├── phone-version.mp4         Video del hero (móviles)
    └── pc-version.mp4            Video del hero (desktop)
```

## 🚀 Cómo subir a GitHub y conectar con Netlify

### Paso 1: Crear repositorio en GitHub

1. Entra a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `alejandra-garcia-inmobiliaria`
3. Visibilidad: Public (o Private si lo prefieres)
4. NO marques "Add a README"
5. Click en **Create repository**

### Paso 2: Subir los archivos al repositorio

**Opción A — Arrastrar y soltar (más fácil):**
1. En la página del repositorio recién creado, click en **uploading an existing file**
2. Arrastra todos los archivos y carpetas del proyecto a la página
3. Escribe un mensaje de commit: `Sitio inicial`
4. Click en **Commit changes**

**Opción B — Por línea de comandos:**
```bash
cd ruta/al/sitio
git init
git add .
git commit -m "Sitio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/alejandra-garcia-inmobiliaria.git
git push -u origin main
```

### Paso 3: Conectar con Netlify

1. Entra a [app.netlify.com](https://app.netlify.com) y haz login con tu cuenta de GitHub
2. Click en **Add new site** → **Import an existing project**
3. Selecciona **GitHub** como proveedor
4. Autoriza a Netlify a acceder a tu repositorio
5. Selecciona el repositorio `alejandra-garcia-inmobiliaria`
6. Configuración del build:
   - **Branch to deploy:** `main`
   - **Build command:** (déjalo vacío)
   - **Publish directory:** `.` (un punto, raíz)
7. Click en **Deploy site**

Netlify desplegará el sitio en pocos segundos. Te dará una URL automática del tipo `nombre-aleatorio.netlify.app`.

### Paso 4: Personalizar el dominio (opcional)

En el panel de Netlify del sitio:
1. Click en **Domain settings**
2. **Options** → **Edit site name**
3. Elige un nombre: por ejemplo `alejandra-garcia-inmobiliaria.netlify.app`

## 🔄 Cómo actualizar el sitio en el futuro

Cada vez que hagas un cambio en los archivos y los subas a GitHub, Netlify desplegará automáticamente la nueva versión. Solo necesitas hacer **commit + push** y esperar 30 segundos.

## ✅ Funcionalidades incluidas

- ✅ Página principal con video hero (fallback a degradado animado en iOS Low Power Mode)
- ✅ 5 páginas individuales de proyecto con información detallada
- ✅ Catálogo con filtros por zona (Huaral, Chancay, Huacho)
- ✅ Contador animado de estadísticas
- ✅ Sección de beneficios con badge de respaldo
- ✅ Mapa de cobertura interactivo
- ✅ Sección "Sobre Alejandra" con foto y bio
- ✅ Sección "¿Quiénes somos?" de Incrementa Group
- ✅ Formulario de contacto que envía a WhatsApp
- ✅ Botón flotante de WhatsApp en todas las páginas
- ✅ Navbar fija con scroll y menú móvil
- ✅ Breadcrumb en páginas de proyecto
- ✅ Optimizado para iOS, Android, escritorio
- ✅ SEO completo: meta tags, Open Graph, Schema.org JSON-LD
- ✅ Favicon
- ✅ Página 404 personalizada
- ✅ Headers de seguridad configurados

## 📞 Datos de la asesora

- **Nombre:** Alejandra García Oropeza
- **Cargo:** Ejecutiva de Ventas — Incrementa Group
- **WhatsApp:** +51 910 799 332
- **Email:** asesorainmobiliaria.alejandra@gmail.com
- **Instagram:** [@aleinmobiliaria29](https://www.instagram.com/aleinmobiliaria29)
- **Facebook:** [Inmobiliaria en tus manos](https://www.facebook.com/share/1Cuha6rJAZ/)
