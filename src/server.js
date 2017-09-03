import path from "path";
import fs from "fs";
import React from "react";
import Koa from "koa";
import serve from "koa-static-cache";
import winston from "winston";
import winstonKoaLogger from "winston-koa2-logger";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import ejs from "ejs";
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

  app.use(winstonKoaLogger(log));

  const chunks = parameters.chunks();
  const files = {
    chunks: Object.values(chunks.javascript).map(s=>({ entry: "/static/" + s })),
    css: Object.values(chunks.styles).map(s=>"/static/" + s )
  };

  app.use(serve(path.join(__dirname, "..", "static"), {
    dynamic: true,
    maxAge: 365 * 24 * 60 * 60,
    buffer: process.env.NODE_ENV === "production" ? "memory" : false,
    gzip: true,
    usePrecompiledGzip: true,
    prefix: "/static/"
  }));
  
  const ejsTemplate = fs.readFileSync(path.resolve(__dirname, "index.ejs"), "utf8");
  const ejsRender = ejs.compile(ejsTemplate);
  app.use( (ctx/*, next*/) => {
    const ssr = renderToString(
      <StaticRouter location={ctx.request.url} context={{}}><App/></StaticRouter>
    );

    ctx.body = ejsRender({
      htmlWebpackPlugin: {
        ssr,
        files,
        options: {
          appMountId: "reactMount"
        }
      }
    });
    ctx.status = 200;
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
