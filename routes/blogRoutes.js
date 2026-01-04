import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  searchBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/search", searchBlog);

export default router;
