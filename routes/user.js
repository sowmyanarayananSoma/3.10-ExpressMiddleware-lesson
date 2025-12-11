import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("All users");
});

router.post("/", (req, res) => {
  res.send("Create a user");
});

router.post("/test-json", (req, res) => {
  console.log("Received JSON body:", req.body);
  res.json({
    message: "JSON parsed successfully!",
    yourData: req.body
  });
});

router.post("/test-form", (req, res) => {
  console.log("Received FORM body:", req.body);
  res.json({
    message: "Form data parsed successfully!",
    yourData: req.body
  });
});



export default router;
