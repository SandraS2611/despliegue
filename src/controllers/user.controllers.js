import { userModel } from "../models/user-model.js";
import jwt from "jsonwebtoken";


export const ctrlRegister = async (req, res) => {
 const newUser = userModel.create(req.body);

  if (!newUser) return res.sendStatus(400);

  const token = jwt.sign({ id: newUser.id }, "secret") //!SECRET DEBE ESTAR EN LA VARIABLE DE ENTORNO

  res.status(201).json({ token });
};

export const ctrlLogin = async (req, res) => {
const { email, password } = req.body

const user = userModel.findByEmail(email)

if (!user) return res.sendStatus(404)

if(user.password !== password) return res.sendStatus(404)

const token = jwt.sign({ id: user.id }, "secret")

res.status(201).json({ token });

};
