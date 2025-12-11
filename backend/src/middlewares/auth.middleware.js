const { verifyJWT } = require("../utils/jwtUtils");
const { getAuthToken } = require("../utils/cookieUtils");
const userRepository = require("../repositories/user.repository");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Obtener token de la cookie
    const token = getAuthToken(req.cookies);
    if (!token) throw new Error("NO_TOKEN");

    // 2. Verificar firma del token
    const decoded = verifyJWT(token);
    if (!decoded || !decoded.idUser) throw new Error("INVALID_TOKEN");

    // 3. Verificar si el usuario sigue activo en la BD
    const isActive = await userRepository.isActive(decoded.idUser);
    if (!isActive) throw new Error("USER_INACTIVE");

    // 4. Guardar datos del usuario en la request para usarlos luego
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "No autorizado, por favor inicie sesión." });
  }
};

module.exports = authMiddleware;
