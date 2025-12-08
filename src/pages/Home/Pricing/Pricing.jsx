import { FaCheck } from "react-icons/fa";

const Pricing = () => {
  return (
    <section className="pb-15 bg-white">
      <div className="container mx-auto px-4">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="bg-text shadow-md rounded-lg  p-6 hover:shadow-xl transition-all">
            <h3 className="text-xl text-center font-semibold text-bg6 mb-2">
              Starter
            </h3>
            <p className="text-bg1 text-center mb-4 text-sm">
              For small wards & test usage
            </p>
            <h2 className="text-4xl font-bold mb-6 font-nunito text-accent">
              Free
            </h2>

            <ul className="space-y-2 text-bg6 text-sm">
              <li className="flex gap-2 items-center ">
                <FaCheck className="text-accent" /> Report up to 50 issues
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-accent" /> Basic dashboard
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-accent" /> Email notifications
              </li>
            </ul>

            <button className="mt-8 w-full bg-bg6 text-accent py-2 rounded-lg hover:bg-gray-900 transition-all duration-500">
              Get Started
            </button>
          </div>

          {/* Popular Plan */}
          <div className="bg-accent shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all">
            <h3 className="text-xl text-center font-semibold text-text mb-2">
              Municipality
            </h3>
            <p className="text-text text-center mb-4 text-sm">
              Best for city administration
            </p>
            <h2 className="text-3xl font-bold mb-6 font-nunito text-white">
              $49/mo
            </h2>

            <ul className="space-y-2 text-bg6 text-sm">
              <li className="flex gap-2 items-center">
                <FaCheck className="text-bg6" /> Unlimited reports
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-bg6" /> Full dashboard access
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-bg6" /> SMS & Email notifications
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-bg6" /> Role-based access
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-bg6" /> Support desk portal
              </li>
            </ul>

            <button className="mt-8 w-full bg-text text-white py-2 rounded-lg hover:opacity-90 transition-all duration-500">
              Choose Plan
            </button>
          </div>

          {/* Premium */}
          <div className="bg-text shadow-md rounded-lg  p-6 hover:shadow-xl transition-all">
            <h3 className="text-xl text-center font-semibold text-bg6 mb-2">
              City Enterprise
            </h3>
            <p className="text-bg1 text-center mb-4 text-sm">
              For full smart-city operation
            </p>
            <h2 className="text-4xl font-bold mb-6 font-nunito text-accent">
              $99/mo
            </h2>

            <ul className="space-y-2 text-bg6 text-sm">
              <li className="flex gap-2 items-center">
                <FaCheck className="text-accent" /> All Municipality features
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-accent" /> AI analytics dashboard
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-accent" /> Priority support
              </li>
              <li className="flex gap-2 items-center">
                <FaCheck className="text-accent" /> Dedicated account manager
              </li>
            </ul>

            <button className="mt-8 w-full bg-bg6 text-accent py-2 rounded-lg hover:bg-gray-900 transition-all duration-500">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
