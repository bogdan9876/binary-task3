const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.error) {
    res.status(res.error.statusCode || 400).send({
      success: false,
      message: res.error.message,
    });
  } else {
    res.status(200).send(res.data);
  }
  next();
};

export { responseMiddleware };
