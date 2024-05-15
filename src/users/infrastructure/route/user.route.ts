import { Router } from "express";
import { UserCases } from "../../application/userCases";
import { PrismaRepository } from "../repository/prisma.repository";
import { UserController } from "../controller/user.controller";

const userRouter = Router()

const userRepo = new PrismaRepository() // aqui realmente debemos instanciar un repositorio real

const useUserCases = new UserCases(userRepo)

const userController = new UserController(useUserCases)

//route.get('/list', userController.getAllUsers)
userRouter.post('/register', userController.registerUser)

export default userRouter