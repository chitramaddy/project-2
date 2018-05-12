module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        fav: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
       reciepe_img: {
        type: DataTypes.STRING,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        foreignKey: {
            type: DataTypes.STRING,
        },
        reciepe_id: {
            type:DataTypes.INTEGER
        }, 
        reciepe_title: {
            type: DataTypes.TEXT
        }
    });

    Favorite.associate = function (models) {
        Favorite.hasMany(models.Favorite, {
            onDelete: "cascade"
        });
        Favorite.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Favorite;
};