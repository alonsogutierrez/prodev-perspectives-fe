import Link from 'next/link';
import InstagramOne from '../common/components/instagram/InstagramOne';
import BreadcrumbTwo from '../common/elements/breadcrumb/breadcrumbTwo';
import Footer from '../common/elements/footer/Footer';
import HeaderOne from '../common/elements/header/HeaderOne';
import { getAllPosts } from '../../lib/api';
import WidgetCategory from '../common/components/sidebar/WidgetCategory';
import WidgetSearch from '../common/components/sidebar/WidgetSearch';
import WidgetPostList from '../common/components/sidebar/WidgetPostList';
import WidgetSocialShare from '../common/components/sidebar/WidgetSocialShare';
import HeadTitle from '../common/elements/head/HeadTitle';

const AboutUs = ({ allPosts }) => {
  return (
    <>
      <HeadTitle pageTitle='About Me' />
      <HeaderOne postData={allPosts} />
      <BreadcrumbTwo
        title='About Me'
        paragraph='Wherever &amp; whenever you need me. Im here for you – contact me for all your support needs. <br />
            be it technical, general queries or information support.'
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
                    Thank you for visiting ProDev Perspectives! If you have any
                    questions, suggestions, or would like to collaborate,
                    I&apos;d be happy to hear from you. Please feel free to
                    reach out using any of the following methods:
                  </p>
                  <p>Email: alonsogutierrez@prodevperspectives.com</p>
                  <p>
                    LinkedIn:{' '}
                    <Link href='https://www.linkedin.com/in/alonso-guti%C3%A9rrez-b27370126/'>
                      Link
                    </Link>
                  </p>
                  <p>
                    {' '}
                    Hi, I&apos;m Alonso Gutiérrez, a software developer with
                    over 6 years of experience in the retail and banking
                    sectors. Throughout my career, I have worked in various
                    roles, including software developer, tech lead, and
                    architect for personal projects. I have gained valuable
                    insights and expertise by working with different companies
                    and taking on responsibilities as a full-stack developer.
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
                <WidgetCategory catData={allPosts} />
                <WidgetSearch />
                <WidgetPostList postData={allPosts} />
                <WidgetSocialShare />
              </div>
            </div>
          </div>
        </div>
      </div>

      <InstagramOne parentClass='bg-color-grey' />
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
