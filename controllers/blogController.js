import Blog from "../models/Blog.js";
import escapeStringRegexp from "escape-string-regexp";

export const getBlogs = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const totalBlogs = await Blog.countDocuments();

  const blogs = await Blog.find()
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("title slug excerpt thumbnailImage featured publishedAt");

  res.json({
    blogs,
    currentPage: page,
    totalPages: Math.ceil(totalBlogs / limit),
    totalBlogs,
  });
};

export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  res.json(blog); // full blog content, Markdown included
};

export const searchBlog = async (req, res) => {
  try {
    const rawQuery = req.query.q?.trim();

    if (!rawQuery) {
      return res.status(400).json({ message: "Query is required" });
    }

    if (rawQuery.length > 100) {
      return res.status(400).json({ message: "Query too long" });
    }

    const safeQuery = escapeStringRegexp(rawQuery);

    const blogs = await Blog.find({
      title: { $regex: safeQuery, $options: "i" },
    })
      .select("title slug excerpt thumbnailImage featured")
      .limit(20);

    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
