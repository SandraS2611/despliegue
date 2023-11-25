import { body, param } from "express-validator";

export const updatePostsValidation = [
  param("postId").isNumeric().withMessage("La id debe ser un número.").toInt(),
  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser un string."),
  body("desc")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un string."),
  body("image").optional().isURL().withMessage("La imagen debe ser una url."),
];
