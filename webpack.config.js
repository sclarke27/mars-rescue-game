const path = require("path");

module.exports = {
    entry: "./browser-main.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
};
