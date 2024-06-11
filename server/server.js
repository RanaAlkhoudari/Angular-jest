const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./connect")
const createUser = require("./controllers/createUser");
const getUsers = require("./controllers/getUsers");
const deleteUser = require("./controllers/deleteUser");
const getUser = require("./controllers/getUser");
const updateUser = require("./controllers/updateUser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = 3000;

app.post("/user", createUser);
app.get("/users", getUsers);
app.delete("/user/:id", deleteUser);
app.get("/user/:id", getUser);
app.put("/user/edit/:id", updateUser);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    } catch (error) {
      console.log(`Can't connect to the server ${error}`);
    }
  })
  .catch(() => {
    console.log("Invalid database connection");
  });
