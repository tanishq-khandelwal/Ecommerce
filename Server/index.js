import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import productRoutes from "./routes/products.routes.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/view", productRoutes);

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
