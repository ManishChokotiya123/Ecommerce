const ErrorHander = require("../utilis/Erorrhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

// kill -9 $(lsof -t -i tcp:3001)
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const token = authorization.replace("Bearer ", "");
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
 
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
