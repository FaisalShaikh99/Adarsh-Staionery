import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import categories from "../APIs/homeApi/categoryCard.json";
import premiumProduct from "../APIs/homeApi/premiumProduct.json";
import featuredProduct from "../APIs/homeApi/featuredProduct.json";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

function Home() {
  const slider_hero_img = [
    "https://i.pinimg.com/736x/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg",
    "https://mikirei.com/uploads/1afb59e00ce809f5c6de21a2467284b7e68a3a7d.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/035/719/622/small_2x/ai-generated-five-children-with-school-backpacks-walking-down-a-street-with-many-bags-free-photo.jpg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-white via-[#fdf6f0] to-white">
      {/* Hero Section */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden">
        <Slider autoplay autoplaySpeed={3000} infinite dots arrows={false}>
          {slider_hero_img.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="h-[250px] sm:h-[350px] md:h-[500px] w-full object-cover"
            />
          ))}
        </Slider>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
            Premium Stationery for Modern Creators ✍️
          </h1>
          <p className="text-sm sm:text-lg max-w-xl mb-4 sm:mb-6 leading-relaxed">
            Discover elegant, high-quality stationery products designed to boost
            your creativity and productivity.
          </p>
          <a
            href="#products"
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Category Section */}
      <section className="py-10  bg-secondary ">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-10">
          ✨ Popular Product Category
        </h2>

        <div className="max-w-7xl mx-auto">
          <Slider {...settings}>
            {categories.map((item) => (
              <div
                key={item.id}
                className="bg-white h-full  rounded-xl shadow-md hover:shadow-xl  "
              >
                {/* Image Section */}
                <div className="h-56 transition duration-150 bg-accent flex justify-center items-center rounded-t-xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-32 w-32 object-cover  rounded-full shadow-lg border-4 border-white"
                  />
                </div>

                {/* Text Section */}
                <div className="p-5 text-center ">
                  <h3 className="text-lg font-bold mb-1 text-accent capitalize">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text mb-4 line-clamp-2">
                    {item.discription}
                  </p>
                  <button
                    onClick={() => navigate(`/category/${item.title}`)}
                    className="bg-accent text-white px-5 py-2 text-sm rounded-full hover:bg-opacity-90 transition "
                  >
                    {item.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/*Premium Category*/}
      <section className="py-4 px-4 bg-gray-50">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-800 mb-10">
          ✨ Premium Categories
        </h2>

        {premiumProduct.map((item, index) => (
          <div key={index} className="flex flex-col  md:flex-row gap-4 mb-8">
            {/* Horizontal Card Left */}
            <div className="md:w-1/2 p-3  bg-yellow-300 rounded-xl">
              <img
                src={item.horizontal.image}
                alt={item.horizontal.name}
                className="h-60 object-cover w-full rounded-xl"
              />
              <h2 className="font-bold text-blue-700 text-xl mt-2 mb-3 capitalize">
                {item.horizontal.name}
              </h2>
              <button
                onClick={() => navigate(`category/colors`)}
                className="bg-blue-700  font-semibold text-white hover:bg-blue-600 p-2  rounded-xl"
              >
                {item.horizontal.buttonText} →
              </button>
            </div>

            {/* Vertical Cards Right */}
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {item.vertical.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-red-600 rounded-xl flex flex-col items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-52 w-full object-cover rounded-xl"
                  />
                  <h3 className="mt-3 mb-2 text-center text-lg text-white font-semibold capitalize">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => navigate(`category/${item.title}`)}
                    className="bg-white text-red-600 mt-3 font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 transition"
                  >
                    {item.buttonText} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Banner Section */}
        <div className="w-auto ml-4 mr-4 bg-gray-50">
          {premiumProduct.map((item) => (
            <div key={item.id} className="w-full mb-6 ">
              {item.banner.map((bannerItem) => (
                <div
                  key={bannerItem.id}
                  className="relative w-full h-64 overflow-hidden rounded-xl"
                >
                  {/* Banner Image */}
                  <img
                    src={bannerItem.image}
                    alt={bannerItem.title}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Content at Bottom Left */}
                  <div className="absolute bottom-4 left-4 ">
                    <h3 className="text-2xl font-bold mb-2 text-[#005451]">
                      {bannerItem.name}
                    </h3>
                    <a
                      onClick={() => navigate(`product/3`)}
                      className="inline-block bg-white text-[#005451] cursor-pointer font-bold px-4 py-2 rounded-xl hover:bg-gray-100 transition"
                    >
                      {bannerItem.buttonText} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/*featured Product*/}
      <section id="products">
        <div className="bg-secondary py-5">
          <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-white pt-5 mb-10">
              ✨ Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProduct.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-100 rounded-lg p-3"
                >
                  <img
                    alt={product.imageAlt}
                    src={product.image}
                    className="h-60 w-full object-cover rounded-lg group-hover:opacity-80"
                  />
                  <h3 className="mt-4 text-md font-semibold text-black">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-bold text-black">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="mt-2 w-full border-2 border-accent bg-transparent hover:bg-accent text-accent hover:text-white px-4 py-2 rounded-lg transition"
                  >
                    {product.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
