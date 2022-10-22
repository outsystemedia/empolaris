import React from "react";
import emailjs from "emailjs-com";
import { Tab } from "@headlessui/react";

// import houseData
import { housesData, recommendations } from "../data";
//  useParams
import { useParams } from "react-router-dom";
// import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { RiHome5Line } from "react-icons/ri";
// import link
import { Link } from "react-router-dom";

// import components
import House from "../components/House";
import { Carousel } from "react-responsive-carousel";
import InfiniteCarousel from "react-leaf-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [fullscreen, setFullscreen] = React.useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const property = housesData.find((house) => {
    return house.name === id;
  });

  const maps = ["Mapa", "Google Maps"];
  const categories =
    property?.certificate && property?.community
      ? ["Dados", "Certificações", "Comunidade", "Extra"]
      : property?.certificate
      ? ["Dados", "Certificações", "Extra"]
      : property?.community
      ? ["Dados", "Comunidade", "Extra"]
      : ["Dados", "Extra"];

  const recommendedHouses = recommendations.map((id) => {
    return housesData.find((house) => {
      return house.id === id;
    });
  });

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "site_polaris",
        "polaris_emailjs_formcasa",
        e.target,
        "-ZykkYn2ZaJN1SGtS"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  function enterFullScreen() {
    setFullscreen(true);
    // const el = document.querySelector(".carousel-root");
    // if (el.requestFullscreen) el.requestFullscreen();
    // else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    // else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    // else if (el.msRequestFullscreen) el.msRequestFullscreen();
    // else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen();
    // el.querySelector(".carousel").style.height = "100vh";
  }

  return (
    <div className="container pt-10 mx-auto min-h-[800px] mb-14">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{property.name}</h2>
        </div>
        <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
          {/* <div className='bg-blue-800 rounded-full text-white px-3 inline-block'>
            {property.type}
          </div> */}
          <div className="bg-blue-800 rounded-full text-white px-3 inline-block">
            {property.country}
          </div>
          <div className="bg-red-500 rounded-full text-white px-2 inline-block empty:hidden">
            {property.tag}
          </div>
          {/* <div className='bg-green-800 rounded-full text-white px-2 inline-block empty:hidden'>
            {property.status}
          </div> */}
          <div
            className={`rounded-full text-white px-2 inline-block empty:hidden ${
              property.isAvailable === "Disponível"
                ? "bg-green-800"
                : "bg-red-500"
            }`}
          >
            {property.isAvailable}
          </div>
        </div>
        <div className="text-3xl font-semibold text-blue-800">
          R$ {property.pricepage}
        </div>
      </div>
      <div className="flex gap-x-6 text-blue-800 mb-6">
        <div className="group flex gap-x-2 items-center border-dashed border-b-2 border-blue-800 relative">
          <BiBed className="text-2xl" />

          <p className="absolute top-10 z-50 w-32 text-center bg-white p-1 rounded-lg shadow-inner text-black text-sm hidden group-hover:block">
            {property.tooltip}
          </p>

          <div className="text-lg font-medium">{property.bedrooms}</div>
        </div>
        <div className="flex gap-x-2 items-center">
          <BiBath className="text-2xl" />
          <div className="text-lg font-medium">{property.bathrooms}</div>
        </div>
        <div className="flex gap-x-2 items-center">
          <BiArea className="text-2xl" />
          <div className="text-lg font-medium">{property.surface}</div>
        </div>
        <div className="flex gap-x-1 items-center">
          <RiHome5Line className="text-2xl" />
          <div className="text-lg font-medium">{property.built}</div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 relative lg:flex-row">
        <div className="max-w-[768px]">
          <div className="mb-8">
            <img src={property.fachada} alt="" />
          </div>
          <div className="mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Detalhes</h2>
              <div
                className={`${
                  fullscreen &&
                  "fixed top-0 bottom-0 left-0 right-0 z-[999999999] bg-black"
                }`}
              >
                <span
                  className="text-lg fixed right-3 top-5 z-[9999999999] text-white cursor-pointer"
                  style={{ display: fullscreen ? "block" : "none" }}
                  onClick={() => setFullscreen(false)}
                >
                  &#9587;
                </span>
                <Carousel
                  swipeable={false}
                  onClickItem={enterFullScreen}
                  showThumbs={false}
                  autoPlay={false}
                  showArrows={true}
                  infiniteLoop={true}
                >
                  {property.carouselData.map((item, index) => (
                    <div key={index}>
                      {item.image ? (
                        <img
                          className="h-[600px] w-100 object-contain"
                          src={item.image}
                          alt=""
                        />
                      ) : (
                        <div onClick={enterFullScreen}>
                          <iframe
                            className="w-[700px] h-[600px]"
                            src={item.video}
                            title="Video"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          <p>{property.description}</p>
          <br></br>
          <div>
            <div className="w-full px-2 py-16 sm:px-0">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {categories.map((tab, idx) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-1 sm:p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      {/* tab 1 */}
                      {tab === "Dados" && (
                        <ul className="bullet">
                          <li>Terreno: {property.surface}</li>
                          <li>Área Total Construída: {property.built}</li>
                          <li>Quartos: {property.bedrooms} - Sendo {property.tooltip}</li>
                          <li>Banheiros: {property.bathrooms}</li>
                        </ul>
                      )}

                      {/* tab 2 */}
                      {tab === "Certificações" && (
                        <>
                          <h2 className="font-medium leading-tight text-2xl">
                            Essa casa possui certificação LEED
                          </h2>
                          <p>LEED ou "Leadership in Energy and Environmental Design", é um sistema
                                internacional de certicação e orientação ambiental para edicações utilizado
                                em mais de 160 países, e possui o intuito de incentivar a transformação dos
                                projetos, obra e operação das edicações, sempre com foco na
                                sustentabilidade de suas atuações. 
                          </p>
                          <br />
                          <img
                            src={
                              "https://atex.com.br/pt/wp-content/uploads/2018/10/LEED-Certified-e1539192613716-1.png"
                            }
                            alt={property.name}
                            className="w-32"
                          />
                        </>
                      )}

                      {/* tab 3 */}
                      {tab === "Comunidade" && (
                        <>
                          <h2 className="font-medium leading-tight text-2xl">
                            Viva Park Porto Belo
                          </h2>
                          <p>Vivapark Porto Belo é um convite para sentir a vida com toda sua intensidade. Um conceito inovador de um bairro criado junto a natureza, com 70 mil m2 de área verde aberta para quem quiser visitar ou morar.<br /><br />
                            O bairro parque está localizado estrategicamente em Porto Belo, uma região culturalmente atrativa, onde destacam-se as belezas naturais, praias paradisíacas, culinária e o artesanato. Entre o mar e a BR-101, rodeado por montanhas, aqui você vai sentir a verdadeira brisa do mar.</p>
                          <br /><h3 className="font-medium leading-tight text-2xl">Jaime Lerner</h3>
                          <p>Assinado por um dos maiores arquitetos urbanistas do nosso tempo, Jaime Lerner, o Vivapark Porto Belo traz a união do desenvolvimento sustentável e do planejamento urbano reconhecida nos projetos do urbanista pelo Brasil e pelo mundo.</p>
                          <br /><h3 className="font-medium leading-tight text-2xl">Entre o mar e a BR101</h3>
                          <p>O bairro parque está localizado em uma das regiões mais belas do Brasil, a Costa Esmeralda. Um lugar estratégico no litoral de Santa Catarina, a apenas 3 minutos da orla do Balneário Perequê.</p>
                          <br /><h3 className="font-medium leading-tight text-2xl">Experiências ao ar livre</h3>
                          <p>Além do parque e 2 lagos exclusivos, o bairro conta com praças, petplace, ciclovias, playground, bicicletários, mesas de piquenique e até um shopping a céu aberto.</p>
                          <br />
                          <img
                            src={
                              "https://classic.exame.com/wp-content/uploads/2022/06/vokkan-viva-park-porto-belo.jpg?quality=70&strip=info"
                            }
                            alt={property.name}
                          />
                        </>
                      )}
                      {/* tab 4 */}
                      {tab === "Extra" && (
                        <ul className="sm:columns-2 space-y-2">
                          {property.topics.map((topic, index) => (
                            <li
                              key={index}
                              className="bg-[#ccc] p-1 rounded-lg break-inside-avoid"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                id="Capa_1"
                                x="0px"
                                y="0px"
                                className="w-6 h-6 inline-block mr-3 bg-white rounded-full p-1"
                                fill="rgb(29 78 216 / 1)"
                                viewBox="0 0 490 490"
                                style={{
                                  enableBackground: "new 0 0 490 490",
                                }}
                                xmlSpace="preserve"
                              >
                                <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 " />
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                              </svg>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>

            <div className="w-full px-2 py-16 sm:px-0">
              <h2 className="text-2xl font-semibold mb-4">Localização</h2>
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  {maps.map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {maps.map((item, idx) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      {item === "Mapa" && (
                        <>
                          <h3 className="text-base mb-4">{property.address}</h3>

                          <div className="mb-8">
                            <img src={property.location} alt="" />
                          </div>
                        </>
                      )}
                      {/* tab 1 */}

                      {/* tab 2 */}
                      {item === "Google Maps" && (
                        <iframe
                          title="gmaps"
                          src={property.googleMap}
                          className="w-full h-[300px] sm:h-[400px]"
                          // allowFullscreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      )}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg p-6 sticky top-[5.4rem]">
          <div className="flex items-center gap-x-4 mb-8">
            <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
              <img src={property.agent.image} alt="Corretor"></img>
            </div>
            <div>
              <div className="font-bold text-lg">{property.agent.name}</div>
              <Link to="/" className="text-blue-800 text-sm">
                Ver todas as casas
              </Link>
            </div>
          </div>
          <form className="flex flex-col gap-y-4" onSubmit={sendEmail}>
            <input
              className="border border-gray-300 focus:border-blue-800 rounded w-full px-4 h-10 text-sm outline-none"
              type="text"
              placeholder="Nome*"
              name="name"
            />
            <input
              className="border border-gray-300 focus:border-blue-800 rounded w-full px-4 h-10 text-sm outline-none"
              type="email"
              name="email"
              placeholder="Email*"
            />
            <input
              className="border border-gray-300 focus:border-blue-800 rounded w-full px-4 h-10 text-sm outline-none"
              type="text"
              name="tel"
              placeholder="Celular*"
            />
            <textarea
              className="border border-gray-300 focus:border-blue-800 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
              type="text"
              name="message"
              placeholder="Mensagem*"
              defaultValue="Olá, gostaria de um atendimento, tenho interesse na casa:"
            />
            <div className="flex gap-x-2">
              <input
                className="bg-blue-800 hover:bg-blue-800 text-white rounded px-4 py-3 text-sm w-full transition"
                type="submit"
                value="Entrar em contato"
              ></input>
              {/* <a href='tel:+554732241847'><button className='border border-blue-800 text-blue-800 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition'>
                Ligar
              </button></a> */}
            </div>
          </form>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Conheça também</h2>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ]}
        showSides={false}
        showArrows={true}
        slidesToScroll={3}
        slidesToShow={3}
        scrollOnDevice={true}
      >
        {recommendedHouses.map((house, index) => {
          return (
            <div key={index} className="min-w-2/6 text-left my-6">
              <Link to={`/casa/${house.name}`}>
                <House house={house} />
              </Link>
            </div>
          );
        })}
      </InfiniteCarousel>
    </div>
  );
};

export default PropertyDetails;
