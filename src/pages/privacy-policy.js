import Footer from '../common/elements/footer/Footer';
import SubHeader from '../common/elements/header/SubHeader';
import { getFileContentBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import HeadTitle from '../common/elements/head/HeadTitle';

const PrivacyPolicy = ({ privacyData }) => {
  return (
    <>
      <HeadTitle pageTitle='Privacy Policy' />
      <SubHeader pClass='header-light header-sticky header-with-shadow' />
      <div className='axil-privacy-area axil-section-gap bg-color-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='content'>
                <div className='inner'>
                  <div className='section-title'>
                    <h4 className='title'>{privacyData.data.sTitle}</h4>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: privacyData.content }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer bgColor='bg-color-black' darkLogo='/images/logo/prodev-02.png' />
    </>
  );
};

export default PrivacyPolicy;

export async function getStaticProps() {
  const privacyData = getFileContentBySlug('PrivacyPolicy', 'src/data/privacy');

  const content = await markdownToHtml(privacyData.content || '');

  return {
    props: {
      privacyData: {
        ...privacyData,
        content,
      },
    },
  };
}
