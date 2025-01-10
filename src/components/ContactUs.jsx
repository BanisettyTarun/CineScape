import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./templates/Menu";

const ContactUs = () => {
  const navigate = useNavigate();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setFormData({ name: "", email: "", message: "" }); // Clear form after submission
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="w-full relative h-screen p-3 overflow-y-auto scrollbar-hide bg-[#002147] text-white"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}>
      {/* Back Button */}
      <div className="z-30" >
        {isMenuOpened ?
          <div className="absolute w-[100%] md:w-[30vw] h-fit  lg:w-[20vw] top-0 left-0"> <Menu isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} ></Menu> </div> : <i onClick={() => setIsMenuOpened(!isMenuOpened)} className="text-xl md:text-2xl absolute top-4 lg:top-5 left-3 cursor-pointer text-white ri-menu-line"></i>}
      </div>

      {/* Contact Us Section */}
      <div className="p-0 md:p-4 max-w-4xl mx-auto bg-[#002147] text-white rounded-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#A6E02B] mb-6">
          Contact Us
        </h1>
        <p className="text-center text-base md:text-lg mb-6">
          We’d love to hear from you! Whether you have questions, feedback, or
          suggestions, feel free to reach out to us. Your input helps us make
          CineScape even better.
        </p>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-[#A6E02B] mb-2 md:mb-4">
            Get in Touch
          </h2>
          <p className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@cinescape.com"
              className="text-[#A6E02B] hover:underline"
            >
              support@cinescape.com
            </a>
          </p>
          <p className="mb-2">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+1234567890"
              className="text-[#A6E02B] hover:underline"
            >
              +1 (234) 567-890
            </a>
          </p>
          <p>
            <strong>Address:</strong> CineScape HQ, 123 Movie Lane, Filmtown, CA
            90210
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-[#A6E02B] md:mb-4">
            Send Us a Message
          </h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded border border-[#A6E02B] bg-white text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#A6E02B]"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded border border-[#A6E02B] bg-white text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#A6E02B]"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 rounded border border-[#A6E02B] bg-white text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#A6E02B] h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#A6E02B] text-[#002147] font-bold py-3 rounded hover:bg-[#8EC424] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
