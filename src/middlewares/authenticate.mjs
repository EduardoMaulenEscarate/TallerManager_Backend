import jwt from 'jsonwebtoken';
const { verify } = jwt; // Extrae 'verify
import { JWT } from '../config/config.mjs';

/**
 * Middleware para autenticar las rutas, verifica que el token sea válido.
 * y agrega el usuario a la petición.
 */
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Lee el token de la cookie HTTP-only
    console.log(token);
    
    if (!token) return res.status(401).json({ login: false, error: 'Token no proporcionado' });

    verify(token, JWT.SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err.message); // Registra el error en el servidor
            res.status(403).json({ 
                login: false, 
                error: err.name === 'TokenExpiredError' 
                    ? 'Token expirado' 
                    : 'Token inválido' 
            });
        }
        console.log(user);
        
        req.user = user;
        next();
    });
}

export default authenticateToken;
