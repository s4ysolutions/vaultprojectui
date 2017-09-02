require("babel-register")({
  ignore: /\/(dist|node_modules)\//,
  extensions: [".jsx", ".js"],
  presets: [
    ["env", {
      modules: "commonjs",
      targets: { "node": "current", "browsers": ["last 2 versions", "safari >= 7"] },
      useBuiltIns: true
    }],
    "react"
  ],
  plugins: [
    "babel-plugin-transform-runtime",
    "transform-async-to-generator",
    "transform-object-rest-spread",
    "react-hot-loader/babel"
  ]
});

import Koa from "koa";
import winston from "winston";
import winstonKoaLogger from "winston-koa2-logger";
import { renderToString } from "react-dom/server";
import App from "./components/app";

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

app.use((ctx/*, next*/) => {
  console.log(ctx);
  ctx.body=`
  <html>

  `;
  ctx.status=200;
});

const PORT=process.env.PORT || 8280;

export default function(parameters) {
  app.listen(PORT, err => {
    if (err) {
      log.error("Can't start", err);
    }else{
      log.info("HoshiCorp Vault UI listen on "+PORT);
    }
  });
}
