import axios from 'axios';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const logger = console;

const postsDirectory = join(process.cwd(), 'posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const posts = getPostsFromBFF();
  return posts;
}

const getPostsFromBFF = async () => {
  try {
    const base_url_bff = process.env.NEXT_BLOG_BFF_BASE_URL;
    const route = '/posts';
    const response = await axios.get(base_url_bff + route);
    return response.data;
  } catch (err) {
    logger.error('CANT GET POSTS FROM BFF: ', err.message);
  }
};

// Get Markdown File Content
export function getFileContentBySlug(fileName, postsPath) {
  const postFilePath = join(postsPath, `${fileName}.md`);
  const fileContents = fs.readFileSync(postFilePath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}
