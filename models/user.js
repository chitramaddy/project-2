var bcrypt = require("bcrypt-nodejs");
var userfavs = require("./userfavs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // The user name cannot be null, and must be a proper user name before creation
        userName: {
            type: DataTypes.STRING,
<<<<<<< HEAD
            unique: true,
=======
            unique: true
>>>>>>> 160a7436747bcc437af3d2962571ee2ccc9c99b9
        },
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING
        },
        // The about is optional where the user describe themselves
        about: {
            type: DataTypes.STRING,
            allowNull: true
        },
        img_url: {
            type: DataTypes.STRING,
            link: "http://fillmurray.com/200/300"
        },
        like_dislike: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    });


    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
}