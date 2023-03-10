import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({ path: '../config/.env' })

function checkAuth(req, res, next) {

  try {
    const token = req.cookies['authToken']

    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    } else {
      jwt.verify(token, process.env.JWT_ACCESS, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid credentials' });
        }
        if(user.role === 3){
          return res.status(403).json({ error: 'You do not have the required credentials to access this resource' })
        }
        req.user = user;
        next();
      });
    }
  } catch (error) {
    return res.status(503).json({ error: 'Something went wrong' })
  }
}
export default checkAuth