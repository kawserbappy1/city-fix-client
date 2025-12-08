import { FaFacebook, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import bannerImage1 from "../assets/slide-bg1.jpg";
import bannerImage2 from "../assets/slide-bg2.jpg";
import bannerImage3 from "../assets/slide-bg3.jpg";
import bannerImage4 from "../assets/slide-bg4.png";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router";
import ButtonLg from "../assets/ButtonLg";
import { MdArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
const Slider = () => {
  const sliderInfo = [
    {
      title: "Citizen Reporting Made Easy",
      subTitle: "Report Public Issues Instantly",
      desc: "Whether it's a broken streetlight, pothole, or garbage overflow, report it in just a few clicks. ",
      slideImage: bannerImage1,
    },
    {
      title: "Government Action & Tracking",
      subTitle: "Track, Assign, and Resolve Efficiently",
      desc: "Government staff can verify, assign, and resolve reported issues on time, ensuring accountability.",
      slideImage: bannerImage2,
    },
    {
      title: "Transparent Citizen Feedback",
      subTitle: "Stay Informed Every Step of the Way",
      desc: "Citizens can follow the progress of their reported issues and see when they’re resolved.",
      slideImage: bannerImage3,
    },
    {
      title: "Cleaner, Safer Community",
      subTitle: "Together, We Improve Our City",
      desc: "Your report helps build a cleaner, safer, and more livable city for everyone.",
      slideImage: bannerImage4,
    },
  ];
  return (
    <div className="banner-swiper">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {sliderInfo.map((slider, indx) => (
          <SwiperSlide key={indx}>
            <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slider.slideImage})`,
                }}
              >
                <div className="absolute inset-0 bg-black/70"></div>
              </div>

              <div className="relative container z-10 text-center">
                <h4 className="text-white font-nunito text-base mb-5">
                  {slider.subTitle}
                  <span className="font-bold "> - City Fix</span>
                </h4>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-accent font-nunito mb-4 sm:mb-6 capitalize">
                  {slider.title}
                </h1>

                <p className="text-md md:text-base text-gray-200 mb-6 sm:mb-8 to max-w-xl mx-auto">
                  {slider.desc}
                </p>

                <button>
                  <ButtonLg to={"/"} text="Learn More">
                    <MdArrowOutward className="text-xl transition-transform duration-300 group-hover:rotate-50" />
                  </ButtonLg>
                </button>
                <div className=" absolute left-[50%] -translate-x-[50%] md:top-0 md:left-0 ">
                  <div className="flex md:flex-col mt-5 md:mt-0 gap-2 ">
                    <Link className="social-link" to={"/"}>
                      <FaFacebook />
                    </Link>
                    <Link to={"/"} className="social-link">
                      <FaXTwitter />
                    </Link>
                    <Link to={"/"} className="social-link">
                      <FaLinkedinIn />
                    </Link>
                    <Link to={"/"} className="social-link">
                      <AiFillInstagram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
