import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenuData from "../../../data/mobilemenu/MenuData.json";

const MobileMenu = ({ menuShow, menuHide }) => {
  const MenuToggleHandler = (e) => {
    let selectElm = e.target.nextSibling;
    if (selectElm != null) {
      if (!selectElm.classList.contains("open")) {
        selectElm.classList.add("open");
        e.target.classList.add("open");
      } else {
        selectElm.classList.remove("open");
        e.target.classList.remove("open");
      }
    }
  };

  return (
    <div className={`popup-mobilemenu-area ${menuShow ? "show" : ""}`}>
      <div className="inner">
        <div className="mobile-menu-top">
          <div className="logo">
            <Link href="/">
              <Image
                className="dark-logo"
                width={120}
                height={120}
                src="/images/logo/prodev-02.png"
                alt="ProDev Perspectives logo"
              />
            </Link>
          </div>
          <div className="mobile-close" onClick={menuHide}>
            <div className="icon">
              <i className="fal fa-times" />
            </div>
          </div>
        </div>

        <ul className="mainmenu">
          {MenuData.map((data, index) => (
            <li
              className={`${data.submenu ? "menu-item-has-children" : ""}`}
              key={index}
            >
              <a href={data.path} onClick={MenuToggleHandler}>
                {data.label}
              </a>
              {data.submenu ? (
                <ul className="axil-submenu">
                  {data.submenu.map((submenu, index) => (
                    <li key={index}>
                      <Link href={submenu.subpath}>
                        <a className="hover-flip-item-wrapper">
                          <span className="hover-flip-item">
                            <span data-text={submenu.sublabel}>
                              {submenu.sublabel}
                            </span>
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
