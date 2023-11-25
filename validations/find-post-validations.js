import { param } from "express-validator";

export const findPostsValidation = [
    param("postId")
    .isNumeric()
    .withMessage("La id debe ser un número")
    .toInt()
];
