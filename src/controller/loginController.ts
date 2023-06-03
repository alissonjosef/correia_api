const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/User");

export const loginController = {
  login: async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
      // Verifique as credenciais do usuário no banco de dados
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Verifique a senha usando bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Gere um token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Envie o token para o cliente
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  register: async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
      // Verifique se o usuário já está registrado
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "Usuário já existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Crie o novo usuário no banco de dados
      const newUser = await User.create({ email, password: hashedPassword });

      // Gere um token JWT
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Envie o token para o cliente
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },
};
