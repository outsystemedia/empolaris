import React from "react";
import ItemsContainer from "./ItemsContainer";
import emailjs from "emailjs-com";
import ReactGA from "react-ga4";

const onClick = () => {
  ReactGA.event({
    category: 'sub_category',
    action: 'Inscrição na newsletter - Footer',
    label: 'sub_label',
    value: 'xxx',
  })
}

const Footer = () => {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('site_polaris', 'polaris_emailjs_footer', e.target, '-ZykkYn2ZaJN1SGtS')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
        >
          Fique por dentro dos nossos <span className="text-blue-700">lançamentos</span>
        </h1>
        <div>
          <form  onSubmit={sendEmail}>
            <input
              type="email"
              name="email"
              placeholder="Digite o seu email"
              className="text-gray-800
            sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
            />
            <input
              onClick={onClick}
              className="bg-blue-900 hover:bg-blue-700 duration-300 px-5 py-2.5 font-[Poppins]
            rounded-md text-white md:w-auto w-full"
              type="submit"
              value= "Receber novidades"
            > 
            </input>
          </form>
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2022 Polaris Empreendimentos. Todos os direitos reservados.</span>
        <span>Criado por <a className="text-blue-700" href="https://www.outsystemdigital.com" >OutSystem Digital</a></span>
      </div>
    </footer>
  );
};

export default Footer;