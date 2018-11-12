const app = require("./app");
let port = process.env.PORT || 5000;
console.log(`Server started: port ${port}`);
let server = app.listen(port);