import express from 'express';
import { startServer } from '../db/config.js';
// =====================
//  CREAMOS EL SERVIDOR
// =====================
import router  from '../routes/user.js';
import authRouter from '../routes/auth.js';

const userRoutes = router;

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
          userPath : '/api/users',
          authPath : '/api/auth'
        };

        // data base connection
        this.bdConnection();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async bdConnection() {
        await startServer();
    }

    routes() {
        // Definir rutas aquí
        this.app.use(this.paths.userPath, userRoutes);
        this.app.use(this.paths.authPath, authRouter);
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

/* // Rutas de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

app.get("/users", async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;
    const nuevoUsuario = await User.create({ nombre, email, rol });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
}); */