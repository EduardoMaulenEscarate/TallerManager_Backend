export const emptyField = (value, name) => {
  let isValid = true;
  let msg = '';

  if (!value) {
    isValid = false;
    msg = `El campo ${name} es requerido`;
  }

  return { isValid, msg };
}

export const stringLength = (value, min, max, name) => {
  let isValid = true;
  let msg = '';

  if (value.length < min || value.length > max) {
    isValid = false;
    msg = `El campo ${name} debe tener entre ${min} y ${max} caracteres`;
  }

  return { isValid, msg };
}

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

export const executeValidations = (validations) => {
  // Ejecuta validaciones
  for (const { value, method, args, optional } of validations) {
    if (optional && (value === undefined || value === "")) continue;
    const result = method(value, ...args);
    if (!result.isValid) return result;
  }

  return { isValid: true };
}