import Link from 'next/link';
import Image from 'next/image';

const PostAuthor = ({ dataAuthor }) => {
  return (
    <div className='about-author'>
      <div className='media'>
        <div className='thumbnail'>
          <Link href='#'>
            <a>
              <Image
                src={dataAuthor.authorImg}
                alt={dataAuthor.authorName}
                height={105}
                width={105}
              />
            </a>
          </Link>
        </div>
        <div className='media-body'>
          <div className='author-info'>
            <h5 className='title'>
              <Link href='#'>
                <a className='hover-flip-item-wrapper'>
                  <span className='hover-flip-item'>
                    <span data-text={dataAuthor.authorName}>
                      {dataAuthor.authorName}
                    </span>
                  </span>
                </a>
              </Link>
            </h5>
            <span className='b3 subtitle'>{dataAuthor.authorDesignation}</span>
          </div>
          <div className='content'>
            <p className='b1 description'>{dataAuthor.authorBio}</p>
            <ul className='social-share-transparent size-md'>
              {dataAuthor.authorSocial.map((social) => (
                <li key={social.url}>
                  <a href={social.url}>
                    <i className={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAuthor;
