import express from 'express'
import { registrarUsuario, autenticarUsuario } from '../controllers/UsuarioController.js'

const routerUsuarios = express.Router()

//endpoints
routerUsuarios.post("/crear-cuenta", registrarUsuario)
routerUsuarios.post("/iniciar-sesion",  autenticarUsuario)

export default routerUsuarios