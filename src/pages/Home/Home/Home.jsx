import Slider from "../../../components/Slider";
import Brand from "../Brand/Brand";
import HowItWorks from "../HowItWorks/HowItWorks";
import IssueCard from "../IssueCard/IssueCard";
import IssueContainer from "../IssueCard/IssueContainer";
import Pricing from "../Pricing/Pricing";
import Technician from "../Technician/Technician";
import Testimonial from "../Testimonial/Testimonial";
import WhyChoose from "../WhyCooose/WhyCooose";
import ContactInfo from "./../ContactInfo/ContactInfo";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <IssueContainer></IssueContainer>
      <IssueCard />
      <WhyChoose></WhyChoose>
      <Pricing></Pricing>
      <Technician></Technician>
      <HowItWorks></HowItWorks>
      <Testimonial></Testimonial>
      <Brand></Brand>
      <ContactInfo></ContactInfo>
    </div>
  );
};

export default Home;
