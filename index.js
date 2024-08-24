import express from "express";
import mongoose from "mongoose";
import routerClientes from "./routes/ClienteRouter.js";
import routerProductos from "./routes/ProductRouter.js";
import routerPedido from "./routes/PedidoRouter.js";
import routerUsuarios from "./routes/UsuarioRouter.js";
import cors from 'cors'
import dotenv from 'dotenv'

//Variables de entorno
dotenv.config()

//Cors Permite que un cliente se conecte a otro servidor para el intercambio de recursos

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        family: 4,
      });
      console.log("Conectado a MongoDB")
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    process.exit(1); // Salir del proceso con error
  }
};

connectDB();

//crear app
const app = express();

//activar mandado json y post
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Definir un dominio(s) para recibir peticiones
const whiteList = [process.env.FRONTED_URL]
const corsOptions = {
  origin: (origin, callback) => {
    if(!origin || whiteList.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error('No permitido por Cors'))
    }
  }
}
//habilitar cors
app.use(cors(corsOptions))
//rutas app {EndPoints}

app.use("/clientes", routerClientes);
app.use("/productos", routerProductos); //localhost:3000/productos/...
app.use("/pedidos", routerPedido)
app.use("/usuarios", routerUsuarios)
//Carpeta Publica
app.use(express.static('uploads'))

//puerto
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
  console.log("el puerto esta funcionando");
});
