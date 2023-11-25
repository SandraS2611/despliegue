import jwt from "jsonwebtoken";
import { userModel } from "../models/user-model.js";

export const guardMiddleware = (req, res, next) => {
  //todo pasa por todas las rutas

  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  const token = authorization;

  try {
    const { id } = jwt.verify(token, "secret");

    const user = userModel.findOne(id);

    next();

  } catch (error) {}
return res.sendStatus(401)
};
