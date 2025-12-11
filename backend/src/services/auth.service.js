const userRepository = require("../repositories/user.repository");
const { hashPassword, verifyPassword } = require("../utils/bcryptUtils");
const { createJWT } = require("../utils/jwtUtils");

class AuthService {
  async register(data) {
    // 1. Verificar duplicados
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) throw new Error("EMAIL_ALREADY_EXISTS");

    // 2. Encriptar contraseña
    const hashedPassword = await hashPassword(data.password);

    // 3. Preparar objeto (sin repassword y con valores por defecto)
    const userToCreate = {
      ...data,
      password: hashedPassword,
      role: "C", // Cliente
      state: "active",
      verify: false,
    };
    delete userToCreate.repassword;

    // 4. Crear usuario
    return await userRepository.create(userToCreate);
  }

  async login(email, password) {
    // 1. Buscar usuario
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("INVALID_CREDENTIALS");

    // 2. Verificar contraseña
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) throw new Error("INVALID_CREDENTIALS");

    // 3. Verificar estado
    if (user.state !== "active") throw new Error("USER_INACTIVE");

    // 4. Generar Token
    const tokenPayload = {
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    };
    const token = createJWT(tokenPayload);

    return { token, user };
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("USER_NOT_FOUND");
    return user;
  }
}

module.exports = new AuthService();
