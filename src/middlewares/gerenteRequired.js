export default function gerenteRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json("Faça login");
  }

  if (req.user.perfil !== "gerente") {
    return res.status(403).json("Acesso negado: somente gerente");
  }

  return next();
}
