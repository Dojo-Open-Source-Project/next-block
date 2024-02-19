import { broadcastDevReady } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/express";
import express from "express";
import morgan from "morgan";

const PORT = Number(process.env.PORT) || 3000;

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

// Logger
app.use(morgan(":method :url :status :response-time ms"));

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log(`App listening on http://localhost:${PORT}`);
});
