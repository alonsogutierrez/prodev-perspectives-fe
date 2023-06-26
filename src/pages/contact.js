import BreadcrumbTwo from '../common/elements/breadcrumb/breadcrumbTwo';
import Footer from '../common/elements/footer/Footer';
import HeaderOne from '../common/elements/header/HeaderOne';
import { getAllPosts } from '../../lib/api';
import WidgetSocialShare from '../common/components/sidebar/WidgetSocialShare';
import FormOne from '../common/components/form/FormOne';
import HeadTitle from '../common/elements/head/HeadTitle';
import Link from 'next/link';

const ContactUs = ({ allPosts }) => {
  return (
    <>
      <HeadTitle pageTitle='Contact Us' />
      <HeaderOne
        postData={allPosts}
        pClass='header-light header-sticky header-with-shadow'
      />
      <BreadcrumbTwo
        title='Contact Us'
        paragraph='Wherever &amp; whenever you need us. We are here for you – contact us for all your support needs.<br /> be it technical, general queries or information support.'
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
                  <p>Email: alonsogutierrez@prodevperspectives.com</p>
                  <p>
                    LinkedIn:{' '}
                    <Link href='https://www.linkedin.com/in/alonso-guti%C3%A9rrez-b27370126/'>
                      Link
                    </Link>
                  </p>
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
                <FormOne />
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

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'id',
    'title',
    'featureImg',
    'featured',
    'date',
    'slug',
    'cate',
    'cate_img',
    'author_img',
    'author_name',
    'post_views',
  ]);

  return {
    props: { allPosts },
  };
}
