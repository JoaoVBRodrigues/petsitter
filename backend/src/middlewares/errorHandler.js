const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Ocorreu um erro interno no servidor',
  });
};

module.exports = errorHandler;
