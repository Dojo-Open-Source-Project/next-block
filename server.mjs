import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import morgan from "morgan";

installGlobals();

const PORT = Number(process.env.PORT) || 3000;

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );

const app = express();

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", {
      immutable: true,
      maxAge: "1y",
    }),
  );
}

app.use(express.static("build/client", { maxAge: "1h" }));

// Logger
app.use(morgan(":method :url :status :response-time ms"));

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: viteDevServer ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build") : await import("./build/server/index.js"),
  }),
);

const server = app.listen(PORT, () => {
  process.send && process.send("ready");
  console.log(`App listening on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  server.close();
  process.exit(0);
});
