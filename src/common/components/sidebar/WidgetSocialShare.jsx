import SocialData from '../../../data/social/SocialData.json';

const WidgetSocialShare = () => {
  return (
    <div className='axil-single-widget widget widget_social mb--30'>
      <h5 className='widget-title'>Stay In Touch</h5>
      <ul className='social-icon md-size justify-content-center'>
        <li>
          <a href={SocialData.linked.url}>
            <i className={SocialData.linked.icon} />
          </a>
        </li>
        <li>
          <a href={SocialData.github.url}>
            <i className={SocialData.github.icon} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSocialShare;
