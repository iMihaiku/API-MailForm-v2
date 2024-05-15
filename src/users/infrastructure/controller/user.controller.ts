import { Request, Response } from "express";
import { UserCases } from "../../application/userCases";
import { UserValue } from "../../domain/user.value";

export class UserController {
  constructor(private userCases: UserCases) {
    this.registerUser = this.registerUser.bind(this);
  }

  public async registerUser(req: Request, res: Response){
    const { username, password, email } = req.body;
    try {
      await this.userCases.registerUser({ username, password, email });
      res.status(201).json({ message: "User registered Succesfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
