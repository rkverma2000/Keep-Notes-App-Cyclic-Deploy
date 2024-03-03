import express from "express"
import { loginController, registerController } from "../controllers/authControllers.js";
import requiredSignIn from "../middlewares/authMiddlewares.js";

const router = express.Router()

router.post('/register', registerController);

router.post('/login', loginController);

router.get("/user-auth", requiredSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;