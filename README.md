# PsyMatch Frontend 🧠💙

**PsyMatch** es una plataforma digital innovadora que conecta pacientes con profesionales de salud mental de manera eficiente y personalizada. Nuestro frontend está construido con Next.js y ofrece una experiencia de usuario moderna, intuitiva y accesible.

## 🌟 Características Principales

-   **Matching Inteligente**: Algoritmo de recomendación que conecta pacientes con psicólogos según especialidades, ubicación y preferencias
-   **Autenticación Avanzada**: Sistema de login con Google OAuth y autenticación tradicional
-   **Dashboard Especializado**: Interfaces diferenciadas para pacientes, psicólogos y administradores
-   **Sistema de Citas**: Gestión completa de citas médicas con calendario integrado
-   **Pagos Integrados**: Procesamiento de pagos con MercadoPago
-   **Geolocalización**: Búsqueda de profesionales por proximidad usando Mapbox
-   **Reviews y Calificaciones**: Sistema de evaluación y comentarios
-   **Responsive Design**: Diseño adaptativo optimizado para todos los dispositivos

## 🚀 Tecnologías Utilizadas

### Core Framework

-   **Next.js 15.4.5** - Framework React con App Router
-   **React 19.0.0** - Biblioteca de interfaz de usuario
-   **TypeScript** - Tipado estático para JavaScript

### Styling & UI

-   **Tailwind CSS 3.4.17** - Framework de CSS utilitario
-   **Flowbite 3.1.2** & **Flowbite React 0.12.7** - Componentes UI prediseñados
-   **Radix UI** - Componentes accesibles (Dialog, Select, Alert Dialog)
-   **Lucide React** - Iconografía moderna
-   **CSS Variables** - Sistema de theming personalizado

### Forms & Validation

-   **Formik 2.4.6** - Gestión de formularios
-   **Yup 1.7.0** - Validación de esquemas
-   **React Phone Input 2** - Input especializado para números telefónicos

### Data Visualization & Charts

-   **ApexCharts 5.3.3** - Gráficos interactivos
-   **React ApexCharts 1.7.0** - Integración con React

### State Management & Context

-   **React Context API** - Gestión de estado global
-   **Custom Hooks** - Lógica reutilizable

### Integrations

-   **MercadoPago SDK** - Procesamiento de pagos
-   **Mapbox** - Servicios de geolocalización y mapas
-   **Google OAuth** - Autenticación social
-   **Cloudinary** - Gestión de imágenes

### Developer Experience

-   **ESLint** - Linting de código
-   **Prettier** - Formateo de código
-   **js-cookie** - Gestión de cookies
-   **React Toastify** - Notificaciones toast
-   **DayJS** - Manipulación de fechas

## 📁 Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── (auth)/                   # Grupo de rutas de autenticación
│   ├── about/                    # Página sobre nosotros
│   ├── api/                      # API Routes
│   ├── auth/                     # Autenticación
│   ├── dashboard/                # Dashboard principal
│   ├── how-does-it-work/         # Cómo funciona
│   ├── panel-profesional-nuevo/  # Panel de registro profesional
│   ├── payment/                  # Procesamiento de pagos
│   ├── profile/                  # Perfil de usuario
│   ├── search-professionals/     # Búsqueda de profesionales
│   ├── session/                  # Gestión de sesiones
│   └── userProfile/              # Perfil detallado de usuario
├── components/                   # Componentes reutilizables
│   ├── Home/                     # Componentes de la página principal
│   ├── dashboard-admin/          # Componentes del dashboard admin
│   ├── dashboard-profesional/    # Componentes del dashboard profesional
│   ├── login-form/               # Formularios de login
│   ├── payments/                 # Componentes de pagos
│   ├── register-user-form/       # Formularios de registro
│   ├── session/                  # Componentes de sesión
│   └── ui/                       # Componentes UI base
├── config/                       # Configuraciones
├── constants/                    # Constantes de la aplicación
├── context/                      # Context providers
├── helpers/                      # Funciones auxiliares
├── hooks/                        # Custom hooks
├── lib/                         # Utilidades de librerías
├── middlewares/                 # Middlewares de Next.js
├── services/                    # Servicios API
├── types/                       # Definiciones de tipos TypeScript
└── utils/                       # Utilidades generales
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

-   Node.js 18.0 o superior
-   npm, yarn, pnpm o bun

### Instalación

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/PsyMatch/PsyMatch-Frontend.git
    cd PsyMatch-Frontend
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3. **Configurar variables de entorno**

    Crear un archivo `.env.local` en la raíz del proyecto:

    ```env
    # API Configuration
    API_URL=http://localhost:8080
    NEXT_PUBLIC_API_URL=http://localhost:8080

    # Mapbox Configuration
    NEXT_PUBLIC_MAPBOX_TOKEN=tu_mapbox_token_aqui

    # Google OAuth (opcional)
    GOOGLE_CLIENT_ID=tu_google_client_id
    GOOGLE_CLIENT_SECRET=tu_google_client_secret

    # MercadoPago (opcional)
    NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_mercadopago_public_key
    ```

### Desarrollo

4. **Ejecutar el servidor de desarrollo**

    ```bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    ```

5. **Abrir la aplicación**

    Navega a [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta ESLint para verificar el código
```

## 🎨 Características de Diseño

### Sistema de Theming

-   **CSS Variables** para colores dinámicos
-   **Dark Mode** preparado (configuración en `tailwind.config.js`)
-   **Responsive Design** mobile-first
-   **Accesibilidad** siguiendo estándares WCAG

### Componentes UI

-   **Radix UI** para componentes accesibles
-   **Flowbite** para componentes prediseñados
-   **Custom Components** en la carpeta `ui/`
-   **Animations** con Tailwind CSS Animate

## 🔐 Autenticación y Seguridad

-   **Google OAuth 2.0** integrado
-   **JWT Tokens** para sesiones seguras
-   **Cookie-based authentication** con `js-cookie`
-   **Middleware de autenticación** para rutas protegidas
-   **Validación client-side** con Formik + Yup

## 📱 Funcionalidades Principales

### Para Usuarios (Pacientes)

-   Registro y autenticación
-   Búsqueda de psicólogos por especialidad y ubicación
-   Sistema de matching personalizado
-   Reserva y gestión de citas
-   Sistema de pagos integrado
-   Evaluación y reviews de profesionales
-   Dashboard personal con historial

### Para Profesionales (Psicólogos)

-   Panel de registro profesional especializado
-   Dashboard con gestión de citas
-   Configuración de disponibilidad
-   Gestión de pacientes
-   Estadísticas y analytics
-   Sistema de notificaciones

### Para Administradores

-   Dashboard administrativo completo
-   Gestión de usuarios y profesionales
-   Moderación de reviews
-   Analytics y reportes
-   Configuración del sistema

## 🌍 Internacionalización

El proyecto está preparado para múltiples idiomas y actualmente soporta español como idioma principal.

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno
3. Desplegar automáticamente

### Otras Plataformas

-   **Netlify**: Compatible con configuración mínima
-   **AWS Amplify**: Soporte completo para Next.js
-   **Docker**: Dockerfile incluido para contenedores

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📋 Roadmap

-   [ ] Implementación de chat en tiempo real
-   [ ] Notificaciones push
-   [ ] Aplicación móvil con React Native
-   [ ] Integración con más pasarelas de pago
-   [ ] Sistema de videollamadas integrado
-   [ ] ML para mejores recomendaciones

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un issue en GitHub con:

-   Descripción detallada del problema
-   Pasos para reproducir
-   Screenshots si es aplicable
-   Información del navegador/dispositivo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

-   **Frontend Team**: Especialistas en React/Next.js
-   **Backend Team**: Desarrolladores Node.js/NestJS
-   **UI/UX Team**: Diseñadores de experiencia de usuario
-   **DevOps Team**: Especialistas en infraestructura

---

**PsyMatch** - Conectando mentes, transformando vidas 💙🧠
