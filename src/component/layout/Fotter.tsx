import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Fotter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Column 1: About */}
        <div>
          <h3 className="text-xl font-bold mb-4 montserrat-heading">
            About Us
          </h3>
          <p className="text-sm text-gray-300 montserrat-body">
            At Hamro Bank, we are dedicated to providing exceptional financial
            services that cater to your unique needs. Your growth is our
            mission.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 montserrat-heading">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Hamro Bank. All rights reserved.
      </div>
    </footer>
  );
}

export default Fotter;
