const express = require("express");
const router = express.Router();
const prisma = require("./prisma/db");

router.post("/createuser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist Plaese Login",
      });
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    res.status(200).json({
      success: true,
      message: "User Created Successfuly",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the post",
    });
  }
});
// ----------------
router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Include user data associated with each post
      },
    });

    res.status(200).json({
      success: true,
      message: "All posts with user data retrieved successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving posts",
    });
  }
});
// -------------------
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users",
    });
  }
});
router.post("/comment", async (req, res) => {
  try {
    const comment = await prisma.comment.create({
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "post created successfuly",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving posts",
    });
  }
});

router.get("/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
      },
    });
    res.status(200).json({
      success: false,
      comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
// module.exports = router;
