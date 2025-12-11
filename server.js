import express from "express";
import usersRoute from "./routes/user.js";

const app = express();


app.listen(3000, () => console.log("Server running on port 3000"));