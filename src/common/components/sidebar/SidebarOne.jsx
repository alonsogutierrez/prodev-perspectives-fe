import WidgetCategory from './WidgetCategory';
import WidgetPostList from './WidgetPostList';
import WidgetSocialShare from './WidgetSocialShare';

const SidebarOne = ({ dataPost }) => {
  return (
    <div className='sidebar-inner'>
      <WidgetCategory catData={dataPost} />
      <WidgetPostList postData={dataPost} />
      <WidgetSocialShare />
    </div>
  );
};

export default SidebarOne;
