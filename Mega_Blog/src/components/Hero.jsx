import React from "react";
import hero from "../assets/hero.png";

function Hero() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Share Your Ideas With The World
          </h1>

          <p className="mt-4 text-gray-600">
            Create blogs, upload images, and connect with readers.
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
            Get Started
          </button>
        </div>

        {/* Right */}
        <div>
          <img src={hero} alt="hero" />
        </div>

      </div>
    </section>
  );
}

export default Hero;