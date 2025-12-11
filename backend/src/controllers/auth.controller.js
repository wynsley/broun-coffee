const authService = require("../services/auth.service");
const { cookieName, cookieOptions } = require("../utils/cookieUtils");

const register = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: newUser.idUser,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "El correo o teléfono ya están registrados." });
    }
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({ message: "El correo ya existe." });
    }
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);

    // Guardar token en cookie
    res.cookie(cookieName, token, cookieOptions);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      userId: user.idUser,
      user: { name: user.firstName, role: user.role },
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    if (error.message === "USER_INACTIVE") {
      return res.status(403).json({ message: "Usuario inactivo" });
    }
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

const aboutMe = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.idUser);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const logout = (req, res) => {
  res.clearCookie(cookieName);
  return res.status(200).json({ message: "Sesión cerrada correctamente" });
};

module.exports = { register, login, aboutMe, logout };
