import { Link } from "react-router";
import logo from "../assets/cityfix-logo.png";

const Logo = () => {
  return (
    <>
      <Link>
        <img
          src={logo}
          alt="City Fix"
          className="h-8 md:max-w-[140px] w-full md:h-10"
        />
      </Link>
    </>
  );
};

export default Logo;
