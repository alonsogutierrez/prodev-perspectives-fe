import BreadcrumbTwo from '../common/elements/breadcrumb/breadcrumbTwo';
import Footer from '../common/elements/footer/Footer';
import SubHeader from '../common/elements/header/SubHeader';
import WidgetSocialShare from '../common/components/sidebar/WidgetSocialShare';
import HeadTitle from '../common/elements/head/HeadTitle';

const ContactUs = ({}) => {
  return (
    <>
      <HeadTitle pageTitle='Contact Me' />
      <SubHeader pClass='header-light header-sticky header-with-shadow' />
      <BreadcrumbTwo
        title='Contact Me'
        paragraph="Wherever &amp; whenever you need me. I'm here for you – contact me for all your support needs.<br /> be it technical, general queries or information support."
        bgImae="url('images/bg/show a programe 0.png')"
      />
      <div className='axil-post-list-area axil-section-gap bg-color-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-xl-8'>
              {/* Start About Area  */}
              <div className='axil-about-us'>
                <div className='inner'>
                  <p>
                    Thank you for your interest in connecting with me. Please
                    feel free to reach out using any of the methods below:{' '}
                  </p>
                  <p>Email: contact@prodevperspectives.com</p>
                  <p>
                    I&apos;m open to collaborations, speaking engagements, and
                    any inquiries related to the content on my website. If you
                    have any questions, feedback, or suggestions, I would love
                    to hear from you. Don&apos;t hesitate to reach out!{' '}
                  </p>
                  <p>
                    Looking forward to hearing from you soon. Best regards,
                    Alonso Gutiérrez, ProDev Perspectives{' '}
                  </p>
                </div>
              </div>
              {/* End About Area  */}
            </div>
            <div className='col-lg-4 col-xl-4 mt_md--40 mt_sm--40'>
              <div className='sidebar-inner'>
                <WidgetSocialShare />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
