import React from "react";
import aone from '../image/aone.png'
const AboutPage = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 font-inter bg-background text-text">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-accent">About Us</h1>

      {/* Description Section */}
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Welcome to <span className="text-accent font-semibold">Adarsh Stationery</span> and{" "}
          <span className="text-accent font-semibold">Jayhind Stationery</span> — your trusted source for
          all kinds of high-quality stationery products. With over{" "}
          <span className="text-accent font-semibold">50 years</span> of legacy in the industry, we serve
          customers with a wide range of essential products.
        </p>

        <p>
          Our journey began in <span className="text-accent font-semibold">1975</span> with{" "}
          <span className="text-accent font-semibold">Jayhind Stationery</span> and expanded in{" "}
          <span className="text-accent font-semibold">2009</span> with{" "}
          <span className="text-accent font-semibold">Adarsh Stationery</span>. Founded by our respected
          grandfather, we’re a family-run business built on quality, trust, and customer satisfaction.
        </p>

        <p>
          We offer a wide selection of{" "}
          <span className="text-accent font-semibold">
            pens, notebooks, bags, office files, bill books, wedding cards, and more
          </span>
          . Our offline stores have served schools, offices, and individuals for decades — and now, we’re
          proudly delivering <span className="text-accent font-semibold">all over India</span> online.
        </p>

        <p>
          Our mission is simple —{" "}
          <em className="text-green-600 font-medium">
            “Deliver quality stationery to everyone at affordable prices.”
          </em>{" "}
          We take pride in products that are{" "}
          <span className="text-accent font-semibold">strong, long-lasting, and reliable</span>.
        </p>

        <p>
          We also operate a professional printing business under{" "}
          <span className="text-accent font-semibold">Metro Offset and Printing</span>, specializing in{" "}
          <span className="text-accent font-semibold">
            wedding cards, office registers, bill books, hotel menus, banners, letterpads
          </span>{" "}
          and proudly serving as <span className="text-accent font-semibold">GEM suppliers</span>.
        </p>

        <p className="font-semibold">Our business is driven by a dedicated family team:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Mustak G Shaikh</li>
          <li>Ismail G Shaikh</li>
          <li>Aiyub G Shaikh</li>
          <li>Sadik G Shaikh</li>
          <li>Idrish G Shaikh</li>
        </ul>

        <p>
          Thank you for trusting us. Whether you're a student, professional, or business —{" "}
          <span className="text-accent font-semibold">Adarsh & Jayhind Stationery</span> is here to
          serve you with excellence and creativity.
        </p>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Adarsh Stationery Image */}
          <div className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 bg-white">
            <img
              src="https://content.jdmagicbox.com/v2/comp/patan-gujarat/s9/9999p2766.2766.211125024624.a3s9/catalogue/adarsh-statioanry-mart-station-road-patan-gujarat-stationery-shops-l1b3pn2yty.jpg"
              alt="Adarsh Stationery"
              className="w-full h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found'; }}
            />
            <div className="text-center py-3 font-medium text-text">Adarsh Stationery Shop</div>
          </div>

          {/* Metro Offset Image */}
          <div className="rounded-xl h-auto shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 bg-white">
            <img
              src="https://images.jdmagicbox.com/comp/rajkot/m2/0281px281.x281.180117111449.f5m2/catalogue/metro-offset-gondal-road-rajkot-printing-services-fohnxn0mxn.jpg?clr="
              alt="Metro Offset & Printing"
              className="w-full h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found'; }}
            />
            <div className="text-center py-3 font-medium text-text">Metro Offset & Printing Work</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 bg-white h-full">
          <img
            src={aone}
            alt="GEM Supplier"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found'; }}
          />
          <div className="text-center py-3 font-medium text-text">Government e-Marketplace (GEM) Supplier</div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
