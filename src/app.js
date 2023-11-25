import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import * as url from "url";

import { postRouter } from "./routes/posts.routes.js";
import { userRouter } from "./routes/users.routes.js";

import { env } from "../settings/envs.js";
import { authenticationMiddleware } from "./middleware/authentication-middleware.js";
import { authorizationMiddleware } from "./middleware/authorization-middleware.js";

import path from "node:path";
import fs from "node:fs/promises";

import { createTransport } from "nodemailer";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

//!MIDDLEWARE

//comunes
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true, //para que use arch temp
    tempFileDir: "./temp/", //la dir temp donde estarán
  })
);


// TODO ruta para subir archivos
app.post("/upload", async (req, res) => {
  const { image } = req.files;
  
  fs.mkdir(path.join(__dirname, "uploads"), { recursive: true });
  
  await image.mv(path.join(__dirname, "uploads", image.name));
  
  fs.rmdir(path.join(__dirname, "temp"), { recursive: true });
  
  res.send("upload");
});

//TODO PARA QUE FUNCIONE EL BODY
app.use(express.json());
app.use(express.static("public"));

//! SERVIR UNA IMAGEN DESDE LA PAGINA
app.use(express.static("uploads")) 

//PARA QUE FUNCIONEN LOS FORMULARIOS DE HTML
app.use(express.urlencoded({ extended: false }));

//!VALIDAIÓN PERSONALIZADA

// app.use(validarPost)

//127.0.0.1:3000 ===localhost:3000
// http:/localhost:3000/

//!RENDERIZA
app.get("/", (req, res) => {
  res.sendFlie("index.html");
});

app.use(
  "/posts",
  authenticationMiddleware,
  authorizationMiddleware,
  postRouter
);
app.use("/users", userRouter);

const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "sssandra1980@gmail.com",
    pass: env.MAIL_PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
try {
  const { destinatario, motivo, mensaje } = req.body

  const response = await transporter.sendMail({
    from: "sssandra1980@gmail.com",
    to: destinatario,
    subject: motivo,
    text: mensaje,
  })

  res.send("email send")

} catch (error) {
  res.status(500).send("error")
}
 
});

app.listen(env.PORT, () => {
  console.log(`server on port ${env.PORT}`);
});
