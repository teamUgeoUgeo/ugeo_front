import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://ugeo.sigae.kim",
      changeOrigin: true,
    })
  );
}
