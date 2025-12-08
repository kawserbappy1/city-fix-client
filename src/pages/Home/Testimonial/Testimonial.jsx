import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Richard Brown",
    role: "Project Manager",
    email: "richardbrown@gmail.com",
    avatar: "",
    initials: "RB",
    verified: true,
    rating: 4,
    date: "14.01.2025",
    location: "Arizona",
    text: "I was really excited about the new SmartTech Pro 3000, but I've had quite a few issues. It disconnects from my phone frequently...",
  },
  {
    name: "Helen R. Tibbetts",
    role: "Project Manager",
    email: "helen.tibbetts@gmail.com",
    avatar: "",
    initials: "HRT",
    verified: true,
    rating: 4,
    date: "15.07.2024",
    location: "Arizona",
    text: "I have been using the SmartTech Pro 3000 for a month now and absolutely love it. The battery life is phenomenal...",
  },
  {
    name: "Frances Staten",
    role: "Backend Developer",
    email: "frances.staten@gmail.com",
    avatar: "",
    initials: "FS",
    verified: true,
    rating: 3,
    date: "13.03.2025",
    location: "Arizona",
    text: "The HomeSmart Hub is mostly great, but I encountered some difficulty connecting it with my older devices...",
  },
  {
    name: "Hazel Gorman",
    role: "Assistant Editor",
    email: "hazel.gorman@gmail.com",
    avatar: "",
    initials: "HG",
    verified: true,
    rating: 4,
    date: "24.02.2025",
    location: "Arizona",
    text: "The SmartTech Pro 3000 is okay but not without flaws. While the notifications are nice, the GPS functionality can be a bit spotty...",
  },
  {
    name: "Courtney Villanueva",
    role: "Camera Operator",
    email: "courtney.villanueva@gmail.com",
    avatar: "",
    verified: true,
    rating: 4,
    initials: "CV",
    date: "08.11.2024",
    location: "Arizona",
    text: "This device has transformed my home! I particularly enjoy the automation features...",
  },
  {
    name: "Mary Somerville",
    role: "CEO",
    email: "mary.somerville@gmail.com",
    avatar: "",
    initials: "MS",
    verified: true,
    rating: 5,
    date: "05.02.2025",
    location: "Arizona",
    text: "When it works well, it's fantastic, but I wish it had more stable connectivity.",
  },
  {
    name: "Brett Duffy",
    role: "Office Employee",
    email: "b.duffy@gmail.com",
    avatar: "",
    initials: "BD",
    verified: true,
    rating: 4,
    date: "06.09.2024",
    location: "Arizona",
    text: "Highly recommend for anyone who values both form and function! Very easy to use and integrates nicely...",
  },
  {
    name: "John Esparza",
    role: "Frontend Developer",
    email: "john.esparza@gmail.com",
    avatar: "",
    initials: "JE",
    verified: true,
    rating: 4,
    date: "22.01.2025",
    location: "Arizona",
    text: "Absolutely love my HomeSmart Hub! The voice control is super responsive...",
  },
  {
    name: "John Esparza",
    role: "Frontend Developer",
    email: "john.esparza@gmail.com",
    avatar: "",
    initials: "JE",
    verified: true,
    rating: 4,
    date: "22.01.2025",
    location: "Arizona",
    text: "Absolutely love my HomeSmart Hub! The voice control is super responsive...",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-nunito font-bold text-center mb-12 text-gray-800">
          What People Say About Us
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 overflow-hidden">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-bg3 shadow-md rounded-xl p-6 break-inside-avoid"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-4">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-accent"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 border">
                    {item.initials}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-accent">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

              {/* Email */}
              <p className="text-gray-600 text-sm mb-2">{item.email}</p>

              {/* Verified badge */}
              {item.verified && (
                <span className="badge bg-accent text-xs mb-3">Verified</span>
              )}

              {/* Review text */}
              <p className="text-text1 text-sm leading-relaxed mb-4">
                {item.text}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
                <span className="text-gray-500 text-xs">
                  ({item.rating} stars)
                </span>
              </div>

              {/* Date & location */}
              <div className="flex justify-between text-xs text-gray-500">
                <p>{item.date}</p>
                <p className="text-accent">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
