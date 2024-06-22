const bcrypt = require('bcryptjs');

function generateRandomUid() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

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
    },
    Uid: {
      type: DataTypes.STRING,
      unique: true 
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.Uid = generateRandomUid();
      }
    }
  });

  sequelize.sync().then(async () => {
    const adminUser = await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        role: 'admin',
        Uid: generateRandomUid() 
      }
    });

    if (adminUser) {
      console.log('Admin user created successfully.');
    }
  });

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
