import bannerImage1 from "../assets/slide-bg1.jpg";
import bannerImage2 from "../assets/slide-bg2.jpg";
import bannerImage3 from "../assets/slide-bg3.jpg";
import bannerImage4 from "../assets/slide-bg4.png";
import ButtonLg from "../assets/ButtonLg";
import { MdArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundForward } from "react-icons/io";

const Slider = () => {
  const sliderInfo = [
    {
      title: "Citizen Reporting Made Easy",
      subTitle: "Report Public Issues Instantly",
      desc: "Whether it's a broken streetlight, pothole, or garbage overflow, report it in just a few clicks.",
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
      desc: "Citizens can follow the progress of their reported issues and see when they're resolved.",
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
    <div className="banner-swiper relative">
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
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
                <div className={`absolute inset-0 bg-black/70`}></div>
              </div>

              <div className="relative container z-10 text-center px-4">
                <h4 className="text-white font-nunito text-lg mb-5">
                  {slider.subTitle}
                  <span className="font-bold text-accent"> - City Fix</span>
                </h4>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white font-nunito mb-4 sm:mb-6 capitalize">
                  {slider.title}
                </h1>

                <p className="text-md md:text-lg text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto">
                  {slider.desc}
                </p>

                <button>
                  <ButtonLg to={"/"} text="Learn More">
                    <MdArrowOutward className="text-xl transition-transform duration-300 group-hover:rotate-45" />
                  </ButtonLg>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !w-8 !h-8  rounded-full border-2 border-accent text-white hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center">
          <IoIosArrowRoundForward className="w-7 h-7 md:w-8 md:h-8 rotate-180 text-base-100" />
        </div>

        <div className="swiper-button-next !w-8 !h-8  rounded-full border-2 border-accent text-white hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center">
          <IoIosArrowRoundForward className="w-7 h-7 md:w-8 md:h-8 text-base-100" />
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-8 md:!bottom-12 !left-1/2 !transform !-translate-x-1/2 !w-auto"></div>
      </Swiper>
    </div>
  );
};

export default Slider;
