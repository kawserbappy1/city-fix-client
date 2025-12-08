import { FaArrowRight } from "react-icons/fa";
import thumb from "../../../assets/thumb.svg";
import expert from "../../../assets/expert.svg";
import cost from "../../../assets/cost.svg";
const WhyChoose = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-2 justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-bold text-text font-nunito">
              Why Choose <span className="text-text2">CITY FIX</span>
            </h2>
            <p className="text-text mt-3 max-w-xl">
              Whether you're dealing with a leaky faucet or a major pipe repair,
              our experienced plumbers are ready to handle it all.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-accent text-sm text-white font-medium px-6 py-3 rounded-full hover:shadow-lg transition-all">
            Create Issue
            <FaArrowRight className="-rotate-60" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative bg-bg2 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
            <img
              src={thumb}
              alt="icon"
              className="mb-4 size-15 border rounded-full border-accent"
            />
            <h3 className="text-2xl font-bold text-text1 mb-2 font-nunito">
              Reliable & Fast
            </h3>
            <p className="text-text1/80 text-sm">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>

            <div className="absolute top-8 right-4 w-8 h-8 rounded-full flex justify-center items-center bg-accent border-accent text-white cursor-pointer transition-all duration-500">
              <FaArrowRight className="-rotate-60" />
            </div>
          </div>
          {/* Card 1 */}
          <div className="relative bg-bg2 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
            <img
              src={expert}
              alt="icon"
              className="mb-4 size-15 border rounded-full border-accent"
            />
            <h3 className="text-2xl font-bold text-text1 mb-2 font-nunito">
              Expert Professionals
            </h3>
            <p className="text-text1/80 text-sm">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>

            <div className="absolute top-8 right-4 w-8 h-8 rounded-full flex justify-center items-center bg-accent border-accent text-white cursor-pointer transition-all duration-500">
              <FaArrowRight className="-rotate-60" />
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative bg-bg2 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
            <img
              src={cost}
              alt="icon"
              className="mb-4 size-15 border rounded-full border-accent"
            />
            <h3 className="text-2xl font-bold text-text1 mb-2 font-nunito">
              Transparent Pricing
            </h3>
            <p className="text-text1/80 text-sm">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>

            <div className="absolute top-8 right-4 w-8 h-8 rounded-full flex justify-center items-center bg-accent border-accent text-white cursor-pointer transition-all duration-500">
              <FaArrowRight className="-rotate-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
