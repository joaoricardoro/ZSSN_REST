'use strict';
module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        water: DataTypes.INTEGER,
        food: DataTypes.INTEGER,
        medication: DataTypes.INTEGER,
        ammunition: DataTypes.INTEGER
    }, {});
    Inventory.associate = function(models) {
        Inventory.belongsTo(models.Survivor);
    };
    return Inventory;
};