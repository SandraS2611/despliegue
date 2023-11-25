import express from "express";
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"

import { postRouter } from "./routes/posts.routes.js";
import { userRouter } from "./routes/users.routes.js";

import { env } from "../settings/envs.js"; 
import { authenticationMiddleware } from "./middleware/authentication-middleware.js";
import { authorizationMiddleware } from "./middleware/authorization-middleware.js";


const app = express();

//!MIDDLEWARE

//comunes
app.use(morgan("dev"))
app.use(cors())
app.use(helmet())


//TODO PARA QUE FUNCIONE EL BODY
app.use(express.json());
app.use(express.static("public"))


//PARA QUE FUNCIONEN LOS FORMULARIOS DE HTML
app.use(express.urlencoded({ extended: false }));

//!VALIDAIÓN PERSONALIZADA

// app.use(validarPost)

//127.0.0.1:3000 ===localhost:3000
// http:/localhost:3000/

app.get('/', (req,res) => {  //!RENDERIZA
    res.sendFlie('index.html')
})

app.use('/posts', authenticationMiddleware, authorizationMiddleware, postRouter)
app.use('/users', userRouter)

app.listen(env.PORT, () => {

    console.log(`server on port ${env.PORT}`);
});
