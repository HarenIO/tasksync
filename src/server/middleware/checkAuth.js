import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({ path: './src/server/config/.env' })

function checkAuth(req, res, next) {
  console.log('checkAuth', process.env.JWT_ACCESS)
  const allowedRoles = [1, 2]
  const token = req.cookies['authToken']
  if (!token) {
    return res.status(400).json({ error: 'Missing authentication token' });
  } else {
    jwt.verify(token, process.env.JWT_ACCESS, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid authentication token' });
      }
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'You do not have the required credentials to access this resource' });
      }
      req.user = user;
      next();
    });
  }
}
export default checkAuth