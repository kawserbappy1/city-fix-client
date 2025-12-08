import Header from "../../../components/Header";
import Slider from "../../../components/Slider";
import IssueCard from "../IssueCard/IssueCard";
import WhyChoose from "../WhyCooose/WhyCooose";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <WhyChoose></WhyChoose>
      <Header></Header>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
        <IssueCard></IssueCard>
      </div>
    </div>
  );
};

export default Home;
