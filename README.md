# TallerManager_Backend
TallerManager API es el backend desarrollado en Node.js y Express que gestiona la información de un taller mecánico. Se encarga de manejar usuarios, clientes, vehículos, órdenes de trabajo y la autenticación mediante JWT.

# - Tecnologías Utilizadas

* Node.js + Express: Framework para el desarrollo del backend.
* MySQL: Base de datos relacional.
* JWT (JSON Web Tokens): Autenticación segura mediante cookies.
* Multer: Manejo de archivos para la carga de imágenes.
* WhatsApp API: Notificaciones automáticas a clientes cuando una orden cambia de estado.
>[!Warning]
>El uso de la API de WhatsApp aún no está implementado



# - Instalación y Configuración

### Clonar el repositorio:
    git clone https://github.com/EduardoMaulenEscarate/TallerManager_Backend.git

### Acceder al directorio del backend:
    cd backend

### Instalar dependencias:
    npm install

### Configurar las variables de entorno:
Crear un archivo .env en la raíz del backend con el siguiente contenido:
    
    PORT=3000
    DATABASE_HOST=mysql
    DATABASE_USER=root
    DATABASE_PASSWORD=root
    DATABASE_NAME=tallerManager
    
    JWT_SECRET=clave_secreta_super_segura
    JWT_EXPIRES_IN=1h

### Iniciar el servidor en desarrollo:
    npm run dev

# - Estructura del Proyecto

    backend/
    │-- src/
    │   │-- config/
    │   │-- controllers/
    │   │-- middlewares/
    │   │-- models/
    │   │-- routes/
    │   │-- services/
    │   │-- validations/
    │   │-- server.mjs
    │-- .env
    │-- .gitignore
    │-- Dockerfile
    │-- package.json
    │-- README.md

# - Endpoints Principales

### Autenticación

* POST /api/auth/login → Inicia sesión y devuelve un token JWT almacenado en cookies.

### Clientes

* GET /api/clients → Lista todos los clientes.
* POST /api/clients → Crea un nuevo cliente.
* PUT /api/clients/:id → Edita un cliente.
* DELETE /api/clients/:id → Elimina un cliente.

### Órdenes de Trabajo

* GET /api/orders → Lista todas las órdenes.

* POST /api/orders → Crea una nueva orden.

* PUT /api/orders/:id → Edita una orden.

* DELETE /api/orders/:id → Elimina una orden.

> [!NOTE]
> Notificación a clientes: Cuando una orden cambia de estado, se envía un mensaje automático al cliente mediante la API de WhatsApp.

# - Seguridad y Autenticación

> [!IMPORTANT]
> La API utiliza JWT para autenticar a los usuarios. El token se envía mediante cookies para mayor seguridad y comodidad.

