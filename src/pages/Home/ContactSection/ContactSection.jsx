import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import issue3 from "../../../assets/issue3.jpg";
const ContactSection = () => {
  return (
    <section className="bg-bg1 py-16 px-6">
      <div className="container mx-auto ">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-accent font-nunito">
            Get in Touch
          </h2>
          <p className="text-text1 mt-2">
            Report issues, seek support, or share your feedback.
          </p>
        </div>

        {/* Contact Card */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          {/* <div className="space-y-5">
            <div className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="w-12 h-12 border  p-2 text-primary text-xl" />
              <p>123 City Hall Avenue, Smart City</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-primary text-xl" />
              <p>+88 01700-000000</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-primary text-xl" />
              <p>support@cityfix.com</p>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              We typically respond within 24 hours.
            </p>
          </div> */}
          <div>
            <img src={issue3} alt="" />
          </div>
          {/* Contact Form */}
          <form className="bg-base-100 shadow-md rounded-lg p-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="textarea textarea-bordered w-full resize-none"
            ></textarea>

            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
