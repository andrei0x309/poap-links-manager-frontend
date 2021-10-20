module.exports = {
  devServer: {
    port: 4002,
    disableHostCheck: true,
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
    },
  },
};
