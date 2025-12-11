const { Users, Sequelize } = require('../models');
const { Op } = Sequelize;

class UserRepository {
  
  async create(userData) {
    return await Users.create(userData);
  }

  async findByEmail(email) {
    return await Users.findOne({ where: { email } });
  }

  async findById(id) {
    return await Users.findByPk(id, {
      attributes: { exclude: ['password', 'repassword'] }
    });
  }

  async isActive(id) {
    const user = await Users.findByPk(id, { attributes: ['state'] });
    return user && user.state === 'active';
  }

  async findAll(search) {
    let whereCondition = {};
    
    if (search) {
      whereCondition = {
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    return await Users.findAll({ 
      where: whereCondition,
      attributes: { exclude: ['password', 'repassword'] }
    });
  }

  async update(id, updates) {
    const user = await Users.findByPk(id);
    if (!user) return null;
    return await user.update(updates);
  }

  async delete(id) {
    const user = await Users.findByPk(id);
    if (!user) return null;
    return await user.update({ state: 'inactive' }); 
  }
}

module.exports = new UserRepository();