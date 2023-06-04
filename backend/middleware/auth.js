import jwt from 'jsonwebtoken';
const secretKey="secretkey";

export default function auth (req, res, next)  {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretKey');
    const userId = decodedToken.id;
    console.log(userId)
    if (!userId) {
      throw 'Invalid user ID';
    } else {
      req.user = {id: userId}
      next();
    }
  } catch {
    res.status(401).json({
      error: 'token is missing or expired'
    });
  }
};