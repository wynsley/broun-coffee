const { Users } = require("../models");

class UserRepository {
  async create(userData) {
    return await Users.create(userData);
  }

  async findByEmail(email) {
    return await Users.findOne({ where: { email } });
  }

  async findById(id) {
    // Buscamos por ID pero excluimos la contraseña por seguridad
    return await Users.findByPk(id, {
      attributes: { exclude: ["password", "repassword"] },
    });
  }

  // Verificar estado activo
  async isActive(id) {
    const user = await Users.findByPk(id, { attributes: ["state"] });
    return user && user.state === "active";
  }
}

module.exports = new UserRepository();
