import { loginUser } from '../services/auth.service.mjs';
import { validateLoginInput } from '../validators/auth.validator.mjs';

/* async function register(req, res, next) {
    try {
        const { username, email, password, name, lastname } = req.body;
        
        // Validar datos
        const result = await validateRegisterInput({ username, email, password, name, lastname });
        
        console.log(result);
        
        if (!result.isValid) {
            return res.json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        // Si los datos son válidos, registra al usuario
        const user = await registerUser(username, name, lastname, email, password );
        res.status(201).json({ status: 'success', message: 'Usuario registrado', user, alertType: 'success' });
    } catch (error) {
        console.log(error);
        
        next(error);
    }
} */

async function login(req, res, next) {
    try {

        const { email, password } = req.body;

        //Validar los datos
        let result = validateLoginInput({ email, password });

        if (!result.isValid) {
            return res.status(200).json({ status: 'error', message: result.msg, alertType: 'error' });
        }

        // Loguear al usuario
        const { isValid, user, token } = await loginUser(email, password);

        if (!isValid) {
            return res.status(200).json({ status: 'error', message: 'Usuario o contraseña incorrectos', alertType: 'error' });
        }

        // Enviar el token en una cookie segura
        res.cookie('token', token, {
            httpOnly: true, // No accesible desde JavaScript
            secure: false/* process.env.NODE_ENV === 'production' */,   // Solo se envía en HTTPS
            sameSite: 'Strict',  // Evita envíos desde otros dominios (protección CSRF)
            maxAge: 3600000 // 1 hora
        });

        res.status(200).json({ user, token });

    } catch (error) {
        next(error);
    }
}

const logout = async (req, res) => {
    // Eliminar la cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // cambiar en producción
        samesite: 'Strict'
    })

    return res.status(200).json({ status: 'success', message: 'Sesión cerrada', alertType: 'success' });
}

export { login, logout };
