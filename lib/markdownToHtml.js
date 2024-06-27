import { remark } from "remark";
import slug from "remark-slug";
import html from "remark-html";

export default async function markdownToHtml(markdown) {
  const result = await remark().use(slug).use(html).process(markdown);
  const htmlContent = result.toString();

  return htmlContent;
}
