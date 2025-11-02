import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/mongodb.js";
import route from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

//  Middleware
app.use(express.json());

//  Cookie parser must have a secret (important for signed cookies)
app.use(cookieParser(process.env.COOKIE_SECRET));

//  CORS setup with correct options
app.use(
  cors({
    origin: "https://g-authentication-frontend.onrender.com",
    credentials: true,
  })
);


app.use("/api", route);


connectDB();


app.get("/", (req, res) => {
  res.json("Server Running 🚀");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
