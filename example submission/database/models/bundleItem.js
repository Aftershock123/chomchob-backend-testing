module.exports = (sequelize,Sequelize) => {
  const BundleItem = sequelize.define('BundleItem', {
    bundleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Bundles',
        key: 'id'
      }
    },
    itemId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Items',
        key: 'id'
      }
    }
  });
    return BundleItem;
  };
  