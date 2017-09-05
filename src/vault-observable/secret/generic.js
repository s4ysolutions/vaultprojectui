const { get } = require("../lib");

module.exports = {
  get: path=> get("/secret"+path)
}
