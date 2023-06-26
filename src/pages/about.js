import BreadcrumbTwo from '../common/elements/breadcrumb/breadcrumbTwo';
import Footer from '../common/elements/footer/Footer';
import HeaderOne from '../common/elements/header/HeaderOne';
import { getAllPosts } from '../../lib/api';
import WidgetSocialShare from '../common/components/sidebar/WidgetSocialShare';
import HeadTitle from '../common/elements/head/HeadTitle';

const AboutUs = ({ allPosts }) => {
  return (
    <>
      <HeadTitle pageTitle='About Me' />
      <HeaderOne postData={allPosts} />
      <BreadcrumbTwo
        title='About Me'
        bgImae="url('images/bg/show a programe 0.png')"
      />
      <div className='axil-post-list-area axil-section-gap bg-color-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-xl-8'>
              {/* Start About Area  */}
              <div className='axil-about-us'>
                <div className='inner'>
                  <h3>About Alonso Gutiérrez</h3>

                  <p>
                    {' '}
                    Hi, I&apos;m Alonso Gutiérrez, a software developer with
                    over 6+ years of experience in the retail and banking
                    sectors. Throughout my career, I have worked in various
                    roles, including software developer, tech lead, and
                    architect for personal projects. I have gained valuable
                    insights and expertise by working with different companies
                    and taking on responsibilities as a full-stack developer and
                    backend developer mainly.
                  </p>
                  <p>
                    My passion for continuous learning and exploring new
                    technologies has led me to start ProDev Perspectives.
                    Through this blog, I aim to share my knowledge, experiences,
                    and insights about software engineering best practices and
                    good architectural decisions. I believe in the power of
                    teaching others and helping them become better software
                    developers.
                  </p>
                  <h3>What can you find here?</h3>
                  <p>
                    At ProDev Perspectives, you can expect to find articles
                    covering a wide range of topics, including software
                    engineering skills, portfolio development, and discussions
                    on various technologies and design patterns such as CQRS
                    (Command Query Responsibility Segregation), circuit breaker,
                    and more.
                  </p>
                  <p>
                    I invite you to join me on this journey of continuous
                    learning and growth. Together, let&apos;s explore the
                    ever-evolving world of software development and strive to
                    become experts in our field. Thank you for your support!{' '}
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

export default AboutUs;

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
