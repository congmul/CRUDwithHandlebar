const express = require("express");

const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() =>{
    app.listen(PORT, () =>{
      console.log("App listening on PORT " + PORT);
    });
  });
  