const errorHandler = (err, req, res, next) => {
  try {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
  } catch (error) {
    console.log("error in errorHandler: ", error)
  }
};

module.exports = { errorHandler }