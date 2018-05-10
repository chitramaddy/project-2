module.exports = function(sequelize, DataTypes) {
    var cart = sequelize.define("cart", {
        shopping: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    cart.associate = function (models) {
        cart.hasMany(models.cart, {
            onDelete: "cascade"
        });
        cart.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

  return cart;  
};