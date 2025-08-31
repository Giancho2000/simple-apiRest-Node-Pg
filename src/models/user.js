import { DataTypes, Sequelize } from 'sequelize';
  
export default (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("mesero", "admin", "super-admin"),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "users",
    timestamps: true,
  });
};
