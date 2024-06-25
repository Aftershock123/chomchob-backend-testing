const { Sequelize} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_User,  process.env.DB_Password, {
  host: process.env.DB_Host ,
  port: process.env.DB_Port ,
  dialect: process.env.DB_Tool,
  dialectOptions: {
    allowPublicKeyRetrieval: true
  }
});

const User = require('./user')(sequelize, Sequelize);
const Item = require('./item')(sequelize, Sequelize);
const Purchase = require('./purchase')(sequelize, Sequelize);
const Code = require('./code')(sequelize, Sequelize);
const Promotion = require('./promotion')(sequelize, Sequelize);
const Bundle = require('./bundle')(sequelize, Sequelize);
const BundleItem = require('./bundleItem')(sequelize, Sequelize);

// Associations
User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

Item.hasMany(Purchase, { foreignKey: 'itemId' });
Purchase.belongsTo(Item, { foreignKey: 'itemId' });

Purchase.hasOne(Code, { foreignKey: 'purchaseId' });
Code.belongsTo(Purchase, { foreignKey: 'purchaseId' });

Item.hasMany(Promotion, { foreignKey: 'itemId' });
Promotion.belongsTo(Item, { foreignKey: 'itemId' });

Bundle.belongsToMany(Item, { through: BundleItem, foreignKey: 'bundleId' });
Item.belongsToMany(Bundle, { through: BundleItem, foreignKey: 'itemId' });


sequelize.sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => {
    console.error("Error creating database:", err);
  });
  
module.exports = {User,Item,Purchase,Code,Promotion,Bundle,BundleItem,sequelize};
