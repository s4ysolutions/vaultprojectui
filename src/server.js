import path from "path";
import React from "react";
import Koa from "koa";
import staticCache from "koa-static-cache";
import winston from "winston";
import winstonKoaLogger from "winston-koa2-logger";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import ejs from "koa-ejs";
import App from "./components/app";

export default function(parameters) {
  const log = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: process.env.LOG_LEVEL || "debug",
        prettyPrint: true,
        timestamp: true,
        silent: false,
        colorize: true
      })
    ]
  });

  const app = new Koa();
  ejs(app, {
    layout: false,
    root: path.join(__dirname, "../src"),
    cache: false,
    viewExt: "ejs",
    debug: false
  });

  app.use(winstonKoaLogger(log));

  const chunks = parameters.chunks();
  const files = {
    chunks: Object.values(chunks.javascript).map(s=>({ entry: "/assets/" + s }))
  };

  console.log(files);
  app.use(staticCache(path.join(__dirname, "assets"), {
    dynamic: true,
    maxAge: 365 * 24 * 60 * 60,
    buffer: process.env.NODE_ENV === "production",
    usePrecompiledGzip: true,
    prefix: "/assets/"
  }));
  
  app.use((ctx/*, next*/) => {
    const ssr = renderToString(
      <StaticRouter location={ctx.request.url} context={{}}><App/></StaticRouter>
    );
    return ctx.render("index", {
      ssr,
      htmlWebpackPlugin: {
        ssr,
        files,
        options: {
          appMountId: "reactMount"
        }
      }
    });
  });

  const PORT = process.env.PORT || 8280;

  app.listen(PORT, err => {
    if (err) {
      log.error("Can't start", err);
    }else{
      // eslint-disable-next-line no-console
      log.info("HoshiCorp Vault UI listen on " + PORT + "\x07");
    }
  });
}
