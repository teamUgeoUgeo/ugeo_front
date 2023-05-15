const createProxyMiddleware = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    createProxyMiddleware(
      "/api",
      {
        target: "https://ugeo.sigae.kim/",
        changeOrigin: true,
      }
    )
  )
}