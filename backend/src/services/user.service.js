const userRepository = require('../repositories/user.repository');

class UserService {

  async getAllUsers(search) {
    return await userRepository.findAll(search);
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    return user;
  }

  async updateUser(id, updates) {
    const updatedUser = await userRepository.update(id, updates);
    if (!updatedUser) {
      throw new Error('USER_NOT_FOUND');
    }
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) {
      throw new Error('USER_NOT_FOUND');
    }
    return deletedUser;
  }
}

module.exports = new UserService();