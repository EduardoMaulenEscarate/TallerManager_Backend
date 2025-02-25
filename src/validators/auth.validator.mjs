import User from '../models/user.model.mjs';
import * as val from '../validators/global.validator.mjs';
import { Op } from 'sequelize';

/* export const  validateRegisterInput = async ({username, email, password, name, lastname }) =>  {
  // Valida nombre de usuario, que no esté vacío y largo
  let result = val.emptyField(username, 'Nombre de usuario');
  if (!result.isValid) return result;

  result = val.stringLength(username, 3, 45, 'Nombre de usuario');
  if (!result.isValid) return result;

  // Valida nombre, que no esté vacío y largo
  result = val.emptyField(name, 'Nombre');
  if (!result.isValid) return result;

  result = val.stringLength(name, 3, 45, 'Apellido');
  if (!result.isValid) return result;

  // Valida apellido, que no esté vacío y largo
  result = val.emptyField(lastname, 'Apellido');
  if (!result.isValid) return result;

  result = val.stringLength(lastname, 3, 45, 'Apellido');
  if (!result.isValid) return result;

  // Valida correo electrónico, que no esté vacío, largo y formato
  result = val.emptyField(email, 'Correo');
  if (!result.isValid) return result;

  result = val.stringLength(email, 3, 45, 'Correo');
  if (!result.isValid) return result;

  result = val.validateMailFormat(email);
  if (!result.isValid) return result;

  // Valida contraseña, que no esté vacía, largo y complejidad
  result = val.emptyField(password, 'Contraseña');
  if (!result.isValid) return result;

  result = val.stringLength(password, 6, 45, 'Contraseña');
  if (!result.isValid) return result;

  result = val.validatePasswordStrength(password);
  if (!result.isValid) return result;



  try {
    // Busca un usuario con el mismo username o email
    const user = await User.findOne({
      where: {
          [Op.or]: [
              { username },
              { email }
          ]
      }
    });

    
    if (user) {
      if (user.username === username) {
          return { isValid: false, msg: 'El nombre de usuario ya está en uso' };
        }
        if (user.email === email) {
            return { isValid: false, msg: 'El correo electrónico ya está en uso' };
        }
    }

  } catch (error) {
      console.error(error);
      return { isValid: false, msg: 'Error al verificar el usuario. Inténtalo más tarde.' };
  }
  
  return result;
}
 */

export const validateLoginInput = ({ email, password }) => {
  // Valida correo electrónico, que no esté vacío, largo y formato
  let result = val.emptyField(email, 'Correo');
  if (!result.isValid) return result;

  result = val.stringLength(email, 3, 45, 'Correo');
  if (!result.isValid) return result;

  result = val.validateMailFormat(email);
  if (!result.isValid) return result;

  // Valida contraseña, que no esté vacía, largo y complejidad
  result = val.emptyField(password, 'Contraseña');
  if (!result.isValid) return result;


  return result;
}



