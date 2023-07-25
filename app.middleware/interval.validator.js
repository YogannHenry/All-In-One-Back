const intervalValidator = (value, helpers) => {
  try {
    const intervalRegex = /^(\d+ years?|\d+ months?|\d+ days?)$/;
    if (!intervalRegex.test(value)) {
      throw new Error('Format d\'interval invalide');
    }
    return value;
  } catch (error) {
    return helpers.error('any.invalid', { message: error.message });
  }
};

module.exports = intervalValidator;
