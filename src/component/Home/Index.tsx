import { useEffect } from "react";
import Header from "../layout/Header";
import Button from "../common/Button";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Animation from "./Animation";
import Revenue from "../../assets/videos/Revenue.mp4";
import Wallet from "../../assets/videos/E-Wallet.mp4";
import Service from "../../assets/videos/Service .mp4";
import Image from "../common/Image";
import loan from "../../assets/photos/loan.png";
import Online from "../../assets/photos/Online.png";
import Personal from "../../assets/photos/Personal.png";
import Business from "../../assets/photos/business.png";
import Fotter from "../layout/Fotter";
const Index = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = [
        {
          selector: ".headline",
          from: { opacity: 0, y: -50 },
          to: { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        },
        {
          selector: ".subheadline",
          from: { opacity: 0, y: 50 },
          to: {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5,
          },
        },
        {
          selector: ".cta-button",
          from: { opacity: 0, scale: 0.5 },
          to: {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: 1,
          },
        },
      ];

      elements.forEach(({ selector, from, to }) => {
        gsap.fromTo(selector, from, to);
      });
    };

    animateElements();
  }, []);

  return (
    <main className="min-h-screen w-full">
      <Header />

      <section className="flex min-h-[calc(100vh-64px)] shadow-md">
        <div className="flex w-1/2 flex-col items-center justify-center space-y-8 px-8">
          <div className="text-center">
            <h1 className="headline mb-4 text-7xl font-bold text-white montserrat-heading">
              Welcome to Hamro Bank
            </h1>
            <p className="subheadline text-2xl montserrat-body  font-semibold text-white">
              Your Trusted Partner in Financial Growth
            </p>
          </div>
          <Link to="/signup">
            <Button
              type="button"
              name="Create an Account"
              className="cta-button w-72 rounded-full bg-white py-3 font-bold text-gray-900 
            shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
            />
          </Link>
        </div>

        <div className="flex w-1/2 items-center justify-center">
          <Animation link={Revenue} />
        </div>
      </section>
      <section className="min-h-screen w-full bg-white flex">
        <div className="w-1/2 flex items-center justify-center">
          <Animation link={Wallet} />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center space-y-8 px-8">
          <div className="text-center">
            <h1 className="headline mb-4 text-7xl font-bold text-black montserrat-heading">
              Why Choose Hamro Bank
            </h1>
            <p className="subheadline text-2xl montserrat-body  font-semibold text-black">
              At Hamro Bank , we believe in providing financial solutions that
              work for you. Whether you're managing day-to-day expenses, saving
              for the future, or looking to take out a loan, we’ve got you
              covered.
            </p>
          </div>
          <Link to="/signup">
            <Button
              type="button"
              name="Create an Account"
              className="cta-button w-72 rounded-full bg-[#1a2229] py-3 font-bold text-white 
            shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
            />
          </Link>
        </div>
      </section>
      <section className="min-h-screen w-full bg-[#1a2229] flex">
        <div className="w-1/2 flex flex-col items-center justify-center space-y-8 px-8">
          <div className="text-center">
            <h1 className="headline mb-4 text-7xl font-bold text-white montserrat-heading">
              Our Services at Your Fingertips
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-10 subheadline ">
            <div className="h-42 w-42 bg-white flex-col flex gap-2">
              <div>
                <Image link={loan} />
              </div>
              <div>
                <Link to="/signup">
                  <Button
                    type="button"
                    name="Loans"
                    className=" w-full  bg-white py-3 font-bold 
            shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
                  />
                </Link>
              </div>
            </div>
            <div className="h-42 w-42 bg-black flex-col flex gap-2">
              {" "}
              <div>
                <Image link={Business} />
              </div>
              <div>
                <Link to="/signup">
                  <Button
                    type="button"
                    name="Business Banking"
                    className=" w-full  bg-white py-3 font-bold 
            shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
                  />
                </Link>
              </div>
            </div>
            <div className="h-42 w-42 bg-white flex-col flex gap-2">
              {" "}
              <div>
                <Image link={Online} />
              </div>
              <div>
                <Link to="/signup">
                  <Button
                    type="button"
                    name="Online Banking"
                    className=" w-full bg-white py-3 font-bold 
            shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
                  />
                </Link>
              </div>
            </div>
            <div className="h-42 w-42 bg-white flex-col flex gap-2">
              {" "}
              <div>
                <Image link={Personal} />
              </div>
              <div>
                <Link to="/signup">
                  <Button
                    type="button"
                    name="Personal Banking"
                    className=" w-full  bg-white py-3 font-bold 
            shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Animation link={Service} />
        </div>
      </section>
      <Fotter />
    </main>
  );
};

export default Index;
