module.exports = app => {
  app.get("/api/test", (req, res) => {
    return res.status(200).send("Hello World!");
  })
}