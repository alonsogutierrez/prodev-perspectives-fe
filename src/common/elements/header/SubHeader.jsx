import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import Nav from './Nav';

const SubHeader = ({}) => {
  const [showMMenu, SetShowMMenu] = useState(false);

  const MobileShowHandler = () => SetShowMMenu(true);
  const MobileHideHandler = () => SetShowMMenu(false);

  return (
    <>
      <header className='header axil-header header-style-3  header-light header-sticky'>
        <div className='header-middle'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-3 col-md-4 col-sm-6'>
                <div className='logo'>
                  <Link href='/'>
                    <Image
                      className='dark-logo'
                      width={130}
                      height={130}
                      src='/images/logo/prodev-02.png'
                      alt='ProDev Perspectives logo'
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='header-bottom'>
          <div className='container'>
            <div className='row justify-content-between align-items-center'>
              <div className='col-xl-7 col-12'>
                <div className='mainmenu-wrapper d-none d-xl-block'>
                  <nav className='mainmenu-nav'>
                    <Nav />
                  </nav>
                </div>
              </div>
              <div className='col-xl-5 col-12'>
                <div className='header-search d-flex flex-wrap align-items-center justify-content-center justify-content-xl-end'>
                  {/* Start Hamburger Menu  */}
                  <div className='hamburger-menu d-block d-xl-none'>
                    <div className='hamburger-inner'>
                      <div className='icon' onClick={MobileShowHandler}>
                        <i className='fal fa-bars' />
                      </div>
                    </div>
                  </div>
                  {/* End Hamburger Menu  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu menuShow={showMMenu} menuHide={MobileHideHandler} />
    </>
  );
};

export default SubHeader;
