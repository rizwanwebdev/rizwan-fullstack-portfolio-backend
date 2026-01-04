import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for reference in content
  description: { type: String, required: true }, // Description of the image
  aiPrompt: { type: String, required: true }, // Prompt used to generate image
  url: { type: String }, // Final image URL after generation
  placement: {
    type: String,
    enum: ["inline", "cover", "thumbnail"],
    default: "inline",
  }, // How it should be used
  insertAfterHeading: { type: String }, // Optional heading after which the image should appear
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  thumbnailImage: { type: String }, // Main thumbnail URL
  coverImage: { type: String }, // Cover image URL
  tags: [String],
  content: { type: String }, // Markdown including inline images
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  images: [imageSchema], // Array of image references with prompts
});

export default mongoose.model("Blog", blogSchema);
