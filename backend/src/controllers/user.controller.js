const userService = require("../services/user.service");

// 1. Definir función getUsers
const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const users = await userService.getAllUsers(search);
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// 2. Definir función getUserById
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    if (error.message === "USER_NOT_FOUND")
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res
      .status(500)
      .json({ message: "Error interno", error: error.message });
  }
};

// 3. Definir función updateUser
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    return res
      .status(200)
      .json({ message: "Usuario actualizado", data: updatedUser });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND")
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res
      .status(500)
      .json({ message: "Error al actualizar", error: error.message });
  }
};

// 4. Definir función deleteUser
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res
      .status(200)
      .json({ message: "Usuario desactivado correctamente" });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND")
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res
      .status(500)
      .json({ message: "Error al eliminar", error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
