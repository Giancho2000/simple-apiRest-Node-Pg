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
    console.log(`✅ Conexión a PostgreSQL exitosa y esta corrirendo en el puerto ${process.env.PORT}`);

    // Sincronizar tablas (solo en desarrollo)
    await sequelizeConn.sync();
    /* app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${process.env.PORT}`);
    }); */
  } catch (error) {
    console.error("❌ Error al iniciar:", error);
    process.exit(1);
  }
};


