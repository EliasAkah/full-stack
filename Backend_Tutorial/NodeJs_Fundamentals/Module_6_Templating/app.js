const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const app = express();

app.set("view engine", "ejs"); //confiuring a template engine to use
app.set("views", "views"); //configuring a directory where template engine can be seen

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Page Not Found", path: "/notFound" });
});

app.listen(3000);

/*app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layout",
    defaultLayout: "main-layout",
    extname: ".hbs",
  })
); //use to config the engine that express will render its response value to especially used for template are not built in
);*/
