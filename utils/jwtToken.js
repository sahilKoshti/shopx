// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRES_TIME || 1) * 24 * 60 * 60 * 1000 // Default to 1 day if not set
    ),
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    httpOnly: true, // Prevent JavaScript access
    sameSite: 'None', // Required for cross-origin requests
  };
  console.log('options', options);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
