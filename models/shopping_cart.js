module.exports = function (sequelize, DataTypes) {
    var cart = sequelize.define("Cart", {

        recipeId: {
            type: DataTypes.STRING
        }, 
        ingredientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qty: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
<<<<<<< HEAD

    cart.associate = function (models) {
        cart.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        cart.hasMany(models.Favorite, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
=======
 

>>>>>>> 98cf5ba9c5cea52fbb243421a77a97d8c6e343c2
    return cart;
};