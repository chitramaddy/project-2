User.associate = function (models) {
    User.hasMany(models.Favorite, {
        // through: {
        //     model: userfavs
        // }
    });
}