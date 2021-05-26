const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(error => error.message)
    return res.status(400).json({ message: errors })
  }
  res.status(500).json(err)
}

module.exports = errorHandler