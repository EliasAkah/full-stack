import { Router } from "express";

const router = Router();

router.post("/users", async (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (firstName === "" && lastName === "") {
    return res.redirect("/");
  }

  return res
    .status(200)
    .render("users", { firstName, lastName, docTitle: "Users", hasBothNames: firstName && lastName,});
});

export { router as users };
