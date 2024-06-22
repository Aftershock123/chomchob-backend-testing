const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    }
  });

  sequelize.sync().then(async () => {
    const adminUser = await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        role: 'admin'
      }
    });

    if (adminUser) {
      console.log('Admin user created successfully.');
    }
  });

  User.prototype.validPassword = async function (password) {
    console.log("1",this.password);
    console.log("2",password);
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
