//import jwt from 'jsonwebtoken'; // Importation d'une bibliothèque pour la gestion des JSON Web Tokens (JWT)

const authMiddleware = (req, res, next) => {
  // Vérifie la présence d'un token d'authentification dans les en-têtes de la requête
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token d\'authentification requis' });
  }

  // Vérifie et décode le token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }

    // Attache les informations de l'utilisateur décodées à la requête
    req.user = user;
    next(); // Passe à la prochaine fonction middleware ou au gestionnaire de route
  });
};

export default authMiddleware;
