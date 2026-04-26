const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === "23505") {
    return res.status(400).json({
      message: "Duplicate entry. This record already exists.",
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      message: "Referenced record does not exist.",
    });
  }

  if (err.code === "23514") {
    return res.status(400).json({
      message: "Validation error. Please check your input.",
    });
  }

  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

module.exports = { errorHandler, notFound };
