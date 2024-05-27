import Link from "next/link";
import { slugify } from "../../../../utils";

const PostTagShare = ({ postTags }) => {
  return (
    <>
      <div className="tagcloud">
        {postTags.tags.map((data, index) => (
          <Link href={`/tag/${slugify(data)}`} key={index}>
            <a>{data}</a>
          </Link>
        ))}
      </div>
      <div className="social-share-block">
        <ul className="social-icon icon-rounded-transparent md-size">
          <li>
            <a href="https://www.linkedin.com/in/alonso-guti%C3%A9rrez-b27370126">
              <i className="fab fa-linkedin-in" />
            </a>
          </li>
          <li>
            <a href="https://github.com/alonsogutierrez">
              <i className="fab fa-github" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PostTagShare;
