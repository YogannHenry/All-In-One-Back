module.exports = (schema) => async (req, res, next) => {
  // Middleware validation schemas avec Joi
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return next(err);
  }
};
