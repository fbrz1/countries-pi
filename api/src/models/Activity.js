const { DataTypes } = require("sequelize");

// Tabla Activity. Cada propiedad es el nombre de cada columna en la tabla.
module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'),
        allowNull: true,
      },
      season: {
        type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
      },
    },
    {
      timestamps: false,
    }
  );
};