import jwt from 'jsonwebtoken';
import config from '../config/jwtSecret';
import User from '../models/user';


/**
 *   ANCHOR
 *   @param  {object} req
 *   @param  {object} res
 *   @param  {func} next
 *
 */


export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  // console.log(authorizationHeader)

  let token
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, config.jwtSecret,  (err, decoded) => {
      if (err) {
        s.status(401).json({ error: 'failed to authenticate' })
      } else {
        User.query({
          where: { id: decoded.id },
          select: ['id',  'username', 'email']
        }).fetch().then( (user) => {
          if(!user) {
            res.status(404).json({ error: 'no such user' })
          } else {
            req.currentUser = user
            next()
          }
        })
      }
    })
  } else {
    res.status(403).json({
      error: 'no token provided'
    })
  }
}