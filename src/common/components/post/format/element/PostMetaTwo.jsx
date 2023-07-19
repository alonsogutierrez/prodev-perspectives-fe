import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '../../../../utils';

const PostMetaTwo = ({ metaData }) => {
  return (
    <div className='banner banner-single-post post-formate post-video axil-section-gapBottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            {/* Start Single Slide  */}
            <div className='content-block'>
              {/* Start Post Content  */}
              <div className='post-content'>
                <div className='post-cat'>
                  <div className='post-cat-list'>
                    <Link href={`/category/${slugify(metaData.category)}`}>
                      <a className='hover-flip-item-wrapper'>
                        <span className='hover-flip-item'>
                          <span data-text={metaData.category}>
                            {metaData.category}
                          </span>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <h1 className='title'>{metaData.title}</h1>
                {/* Post Meta  */}
                <div className='post-meta-wrapper'>
                  <div className='post-meta'>
                    <div className='post-author-avatar border-rounded'>
                      <Image
                        src={metaData.authorImg}
                        alt={metaData.authorName}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className='content'>
                      <h6 className='post-author-name'>
                        <Link href={`/author/${slugify(metaData.authorName)}`}>
                          <a className='hover-flip-item-wrapper'>
                            <span className='hover-flip-item'>
                              <span data-text={metaData.authorName}>
                                {metaData.authorName}
                              </span>
                            </span>
                          </a>
                        </Link>
                      </h6>
                      <ul className='post-meta-list'>
                        <li>{metaData.date}</li>
                        <li>{metaData.postViews}</li>
                      </ul>
                    </div>
                  </div>
                  <ul className='social-share-transparent justify-content-end'>
                    {metaData.authorSocial.map((social) => (
                      <li key={social.url}>
                        <a href={social.url}>
                          <i className={social.icon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* End Post Content  */}
            </div>
            {/* End Single Slide  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMetaTwo;
