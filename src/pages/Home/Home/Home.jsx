import Header from "../../../components/Header";
import Slider from "../../../components/Slider";
import HowItWorks from "../HowItWorks/HowItWorks";
import IssueCard from "../IssueCard/IssueCard";
import Pricing from "../Pricing/Pricing";
import WhyChoose from "../WhyCooose/WhyCooose";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <WhyChoose></WhyChoose>
      <Header
        title="Resolved Issues"
        text="We have successfully Completed some critical issues with 100% client satisfiction"
      ></Header>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-2 pb-15">
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
      </div>
      <div className="bg-white">
        <Header
          title="Pricing Plans"
          text="Choose a plan that fits your community service workflow. Upgrade anytime."
        ></Header>
        <Pricing></Pricing>
        <HowItWorks></HowItWorks>
      </div>
    </div>
  );
};

export default Home;
