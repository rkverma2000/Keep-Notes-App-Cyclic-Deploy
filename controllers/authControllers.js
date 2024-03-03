import userModel from "../model/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken"

const registerController = async (req, res) => {
    try {

        const { name, emailId, password } = req.body;

        if (!name) {
            res.send({ message: "name is required" })
        }
        if (!emailId) {
            res.send({ message: "emailId is required" })
        }
        if (!password) {
            res.send({ message: "password is required" })
        }

        const existingUser = await userModel.findOne({ emailId });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "user alerady exists"
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, emailId, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: "user registerd successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in registration',
            error
        })

    }
}

const loginController = async (req, res) => {
    try {

        const { emailId, password } = req.body;

        if (!emailId) {
            res.send({ message: "emailId is required" })
        }
        if (!password) {
            res.send({ message: "password is required" })
        }

        const user = await userModel.findOne({ emailId });

        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registered"
            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid email id or password'
            })
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: 'login successful',
            user: {
                name: user.name,
                emailId: user.emailId
            },
            token
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })


    }
}

export { registerController, loginController };