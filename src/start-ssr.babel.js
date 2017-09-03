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
    "transform-object-rest-spread"
  ]
});
require("./start-ssr.js");
