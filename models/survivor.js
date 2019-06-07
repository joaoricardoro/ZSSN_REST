'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survivor = sequelize.define('Survivor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING,
        latitude: DataTypes.DECIMAL(10, 6),
        longitude: DataTypes.DECIMAL(10, 6)
    }, {});

    Survivor.associate = function(models) {
        Survivor.hasOne(models.Inventory);
    };
    return Survivor;
};