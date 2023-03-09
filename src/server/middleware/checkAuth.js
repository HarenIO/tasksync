import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({ path: '../config/.env' })

function checkAuth(req, res, next) {

  try {
    const token = req.cookies['authToken']

  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS, (err, user) => {
      if (err) {
        return res.status(403);
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({error: 'You do not have the necessary credentials to access this resource.'});
  }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}
export default checkAuth