const jwt = require("jsonwebtoken");

export const authenticate = (req: any, res: any, next: any) => {
  // Obtenha o token JWT do cabeçalho da requisição
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.replace(/^Bearer\s+/, "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido" });
  }

  try {
    // Verifique e decodifique o token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Adicione o ID do usuário decodificado ao objeto de requisição para uso posterior
    req.userId = decodedToken.userId;

    // Prossiga para a próxima função de middleware ou rota
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de autenticação inválido" });
  }
};
