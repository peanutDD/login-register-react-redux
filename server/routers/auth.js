import express from 'express';
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import config from '../config/jwtSecret';
import {Signale} from 'signale'

let router = express.Router()



const options = {
  types: {
    error: {
      badge: '!!',
      label: 'fatal error'
    },
    success: {
      badge: '❤❤',
      label: 'huge success'
    },
    fatal: {
      badge: '💔',
      label: 'huge fatal'
    }
  }
};

const signale = new Signale(options);
router.post('/', (req, res) => {
  const { identifier, password } = req.body

  signale.success(identifier, password)
  signale.fatal('模拟错误！')

  User.query({
    where: { username: identifier },
    orWhere: {email: identifier}
  }).fetch().then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get("id"),
          username: user.get("username")
        }, config.jwtSecret )
        res.json({token})
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials one!' } })
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials two!' } })
    }
  })
})

export default router