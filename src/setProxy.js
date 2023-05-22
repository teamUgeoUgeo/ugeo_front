import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://ugeo-back.sigae.kim",
      changeOrigin: true,
    })
  );
}
