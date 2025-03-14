/** 
 * @fileoverview Validaciones globales.
 */

/**
 * Valida si un campo está vacío.
 * @param {String} value Valor del campo.
 * @param {String} name Nombre del campo.
 * @returns {Object} Resultado de la validación.
 */
const emptyField = (value, name) => {
  let isValid = true;
  let msg = '';

  if (!value) {
    isValid = false;
    msg = `El campo ${name} es requerido`;
  }

  return { isValid, msg };
}

/**
 * Valida la longitud de un campo.
 * @param {String} value Valor del campo.
 * @param {Number} min Longitud mínima.
 * @param {Number} max Longitud máxima.
 * @param {String} name Nombre del campo.
 * @returns {Object} Resultado de la validación.
 */
export const stringLength = (value, min, max, name) => {
  let isValid = true;
  let msg = '';

  if (value.length < min || value.length > max) {
    isValid = false;
    msg = `El campo ${name} debe tener entre ${min} y ${max} caracteres`;
  }

  return { isValid, msg };
}

/**
 * Valida la fortaleza de una contraseña.
 * @param {String} password Contraseña.
 * @returns {Object} Resultado de la validación.
 */
export const validatePasswordStrength = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  let isValid = true;
  let msg = '';

  if (!re.test(password)) {
    isValid = false;
    msg = 'La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.';
  }

  return { isValid, msg };
};

/**
 * Valida el formato de un correo electrónico.
 * @param {String} email Correo electrónico.
 * @returns {Object} Resultado de la validación.
 */
export const validateMailFormat = (email) => {
  const re = /\S+@\S+\.\S+/;
  let isValid = true;
  let msg = '';

  if (!re.test(email)) {
    isValid = false;
    msg = 'El correo electrónico no es válido';
  }

  return { isValid, msg };
}

/**
 * Valida si un campo es un número.
 * @param {String} value Valor del campo.
 * @param {String} name Nombre del campo.
 * @returns {Object} Resultado de la validación.
 */
export const isNumber = (value, name) => {
  let isValid = true;
  let msg = '';

  if (isNaN(value)) {
    isValid = false;
    msg = `El campo ${name} debe ser un número`;
  }

  return { isValid, msg };
}

/**
 * Ejecuta validaciones.
 * @param {Array} validations Lista de validaciones.
 * @returns {Object} Resultado de la validación.
 */
export const executeValidations = (validations) => {
  // Ejecuta validaciones
  for (const { value, method, args, optional } of validations) {
    if (optional && (value === undefined || value === "")) continue;
    const result = method(value, ...args);
    if (!result.isValid) return result;
  }

  return { isValid: true };
}