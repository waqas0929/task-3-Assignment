import { compare, hash } from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";
import userValidators from "../validation/userValidation.js";
import sendEmailNotification from "../services/emailNotificationServices.js";

const userController = {
  signUp: async (req, res) => {
    try {

      userValidators.signup(req, res, async (error) => {
        if (error) {
          return res.status(400).json({ message: "Invalid Data", error });
        }

      const { firstName, lastName, email, password } = req.body;

      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exist" });
      }

      //hash the password
      const hashedPassword = await hash(password, 10);

      //create new user
      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const subject = "Welcome to our Website"
      const content = "Thank You for signing up!"
      await sendEmailNotification(email, subject, content)

      res.status(200).json({ message: "User created successfully" });
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  signIn: async (req, res) => {
    try {

      userValidators.signin(req, res, async (error) => {
        if (error) {
          return res.status(400).json({ message: "Invalid Data", error });
        }

      const { email, password } = req.body;

      const user = await userModel.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const comparePassword = await compare(password, user.password);
      if (!comparePassword) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const data = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
      const tokenExpiration = new Date(Date.now() + 10 * 60 * 1000);

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hour",
      });

      await tokenModel.create({
        token,
        tokenExpiration,
        userId: user.id,
      });
      // await tokenModel.destroy({ where: { userId: user.id } });

      const subject = "Welcome to our Website"
      const content = "Your account is signedIn!"
      await sendEmailNotification(email, subject, content)

      res.json({ data, token });
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getUserAllId: async (req, res) => {
    try {
      const user = await userModel.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // updateUserProfile
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const user = await userModel.findByPk(req.user.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "user with this is is not available" });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();

      res.status(200).json({ message: "Details update successfully" });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // deleteUserProfile
  userDeleted: async (req, res) => {
    try {
      const user = await userModel.findByPk(req.user.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "user with this is is not available" });
      }

      const userEmail = user.email;

      await user.destroy();

      const subject = "Account Deleted Successfully";
      const content = "Thank You for using our website!";
      await sendEmailNotification(userEmail, subject, content);

      

      res.status(200).json({ message: "User Deleted successfully" });
    } catch (error) {
      console.error("Delete Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default userController;
