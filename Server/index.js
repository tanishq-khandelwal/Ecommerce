import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/users.routes.js"; 

dotenv.config();

const app = express();
app.use(morgan("dev"));


app.set("trust proxy", 1);

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173","https://ecommekart.vercel.app"],
    credentials: true,
    httpOnly: false,
    optionSuccessStatus: 200,
    sameSite: "None",
    secure: true,
    methods: "GET, POST, PUT, DELETE", // Specify the allowed HTTP methods
    allowedHeaders: "Content-Type, Authorization",
    cookie: {
      secure: false,
      sameSite: "None",
    },
  })
);



app.use(express.json());

app.use("/api/v1/view", productRoutes);
app.use('/api/v1/user',userRoutes);

app.get("/ping", (_req, res) => {
  res.send("Pong");
});

app.use("/", (_req, res) => {
  res.send("Backend Started Successfully !");
});

// Define a wildcard route for unmatched paths
app.get("*", (_req, res) => {
  res.status(400).send("Oops !! Route not Found");
});

export default app;
