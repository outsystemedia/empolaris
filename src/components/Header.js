import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/logo.svg";

function Header() {
  const [top, setTop] = useState(true);
  const navigate = useNavigate();

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <a href="/">
              <img src={Logo} className="w-40 ml-7" alt="Polaris" />
            </a>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow justify-end">
            <input id="menu" type="checkbox" className="peer hidden" />
            <label
              htmlFor="menu"
              className="group cursor-pointer self-center h-4 w-6 relative hover:scale-110 duration-200 lg:hidden"
            >
              <span className="block h-[.1rem] absolute top-0 w-5 bg-blue-900 duration-300 peer-checked:group-only-of-type:rotate-45 peer-checked:group-only-of-type:top-[.44rem]" />
              <span className="block h-[.1rem] absolute top-1/2 -translate-y-1/2 w-5 bg-blue-900 duration-300 peer-checked:group-only-of-type:hidden" />
              <span className="block h-[.1rem] absolute bottom-0 w-5 bg-blue-900 duration-300 peer-checked:group-only-of-type:-rotate-45 peer-checked:group-only-of-type:bottom-[.44rem]" />
            </label>
            <ul className="flex flex-col flex-grow items-start translate-x-full duration-300 fixed top-14 left-0 right-0 px-4 py-6 bg-white gap-y-4 h-screen sm:px-12 md:top-20 lg:gap-0 lg:translate-x-0 lg:flex-row lg:justify-end lg:max-h-20 lg:static lg:items-center lg:bg-transparent peer-checked:h-menu-sm md:peer-checked:h-menu peer-checked:translate-x-0">
              <li className="w-full lg:w-max">
                <label
                  htmlFor="menu"
                  onClick={() => navigate("/sobre")}
                  className="btn-sm w-full min-h-full text-blue-900 bg-white hover:bg-gray-200"
                >
                  <span>Sobre nós</span>
                </label>
              </li>
              <li className="w-full lg:w-max">
                <label
                  htmlFor="menu"
                  onClick={() => navigate("/contato")}
                  className="btn-sm w-full min-h-full text-gray-200 bg-blue-900 hover:bg-blue-700 lg:ml-3"
                >
                  <span>Contato</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </label>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
