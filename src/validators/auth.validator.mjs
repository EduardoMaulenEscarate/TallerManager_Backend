import User from '../models/user.model.mjs';
import * as val from '../validators/global.validator.mjs';
import { Op } from 'sequelize';

/* 
* ⚠️ Pendiente de refactoriozación
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



