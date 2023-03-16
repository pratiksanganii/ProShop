import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("You are in development mode, switch to production mode....");
  });
}

app.use(notFound);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold
  )
);
