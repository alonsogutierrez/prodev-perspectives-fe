import axios from "axios";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const logger = console;

const postsDirectory = join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getAllPosts() {
  const posts = getPostsFromBFF();
  return posts;
}

export function getPostBySlug(slug) {
  const post = getPostBySlugFromBFF(slug);
  return post;
}

const getPostsFromBFF = async () => {
  try {
    const base_url_bff = process.env.NEXT_BLOG_BFF_BASE_URL;
    const route = "/posts";
    const response = await axios.get(base_url_bff + route);
    return response.data;
  } catch (err) {
    logger.error("CANT GET POSTS FROM BFF: ", err.message);
  }
};

const getPostBySlugFromBFF = async (slug) => {
  try {
    const base_url_bff = process.env.NEXT_BLOG_BFF_BASE_URL;
    const route = "/posts/slug/:slug".replace(":slug", slug);
    const response = await axios.get(base_url_bff + route);
    return response.data;
  } catch (err) {
    logger.error("CANT GET POST BY SLUG FROM BFF: ", err.message);
  }
};

// Get Markdown File Content
export function getFileContentBySlug(fileName, postsPath) {
  const postFilePath = join(postsPath, `${fileName}.md`);
  const fileContents = fs.readFileSync(postFilePath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}
