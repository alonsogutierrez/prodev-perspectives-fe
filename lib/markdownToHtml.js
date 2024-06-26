import { remark } from "remark";
import slug from "remark-slug";
import html from "remark-html";
import prism from "remark-prism";
import { visit } from "unist-util-visit";
import "prismjs/themes/prism.css";

const adjustToCLinks = () => {
  return (tree) => {
    visit(tree, "link", (node) => {
      // Ensure the link is an internal link starting with "#user-content-"
      if (node.url.startsWith("#user-content-")) {
        // Remove the prefix only for internal navigation links
        node.url = "#" + node.url.substring("#user-content-".length);
      }
    });
  };
};

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(slug)
    .use(adjustToCLinks)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown);
  const htmlContent = result.toString();

  return htmlContent;
}
