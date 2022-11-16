import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
import router from "./routes/index.js";
app.use("/api", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  db();
});
