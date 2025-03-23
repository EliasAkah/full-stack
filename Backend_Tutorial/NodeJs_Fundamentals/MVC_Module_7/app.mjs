import express from "express";
import path from "path";
import { adminRoutes } from "./routes/admin.mjs";
import { shopRoutes } from "./routes/shop.mjs";
import { Erro404 } from "./controllers/404.mjs";
import { __dirname } from "./util/path.mjs";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(Erro404);

app.listen(3000);
