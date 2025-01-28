import Logo from "../../assets/photos/Logo.webp";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { FaSignInAlt } from "react-icons/fa";
function Header() {
  return (
    <section className=" h-20 w-full bg-[#353C48] shadow-black flex items-center justify-between fixed z-10">
      <div className="overflow-hidden p-2">
        <img src={Logo} alt={Logo} className=" h-20 w-20 rounded-full " />
      </div>
      <div className="flex  mr-5  font-bold text-xl">
        <Link to="/login">
          <Button type="button">
            {
              <FaSignInAlt
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              />
            }
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Header;
