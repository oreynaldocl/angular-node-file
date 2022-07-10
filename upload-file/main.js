const cors = require("cors");
const express = require("express");
const app = express();

const port = 8080;
global.__basedir = __dirname;


// app.use(bodyParser.json());
// app.use(express.static(process.cwd()+"/resources/static/assets/uploads"));

const initRoutes = require("./routes");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
  console.log(global.__basedir);
});
