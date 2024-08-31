const User = require("../models/user");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

  if (!token) {
      return next(new ErrorHandler("Login first to access this resource.", 401));
  }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the decoded token
      req.user = await User.findById(decoded.id);

      if (!req.user) {
          return next(new ErrorHandler("User not found.", 404));
      }

      // Proceed to the next middleware or route handler
      next();
});

// Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
