module.exports = {
  outputDir: "../public/dashboard",
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dashboard/'
    : '/'
};
