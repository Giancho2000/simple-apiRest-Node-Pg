import { Sequelize, DataTypes } from "sequelize";

// =====================
//  CONFIGURACIÓN
// =====================

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ ERROR: No se encontró DATABASE_URL en las variables de entorno.");
  process.exit(1);
}

// =====================
//  CONEXIÓN SEQUELIZE
// =====================
export const sequelizeConn = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const startServer = async () => {
  try {
    await sequelizeConn.authenticate();
    await sequelizeConn.sync();
    console.log(`✅ Conexión a PostgreSQL exitosa y esta corrirendo en el puerto ${process.env.PORT}`);

  } catch (error) {
    console.error("❌ Error al iniciar:", error);
    process.exit(1);
  }
};


