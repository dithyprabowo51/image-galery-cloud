const { User } = require('../models')

class UserController {
  static async register(req, res, next) {
    try {
      const { email, fullname, password } = req.body
      const newUser = await User.create({ email, fullname, password })
      res.status(201).json({
        message: 'Created new user successfully',
        data: {
          id: newUser.id,
          email: newUser.email,
          fullname: newUser.fullname
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController