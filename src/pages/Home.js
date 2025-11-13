import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import CardCongratulations from "../@core/components/CardCongratulations/CardCongratulations";
// import { useQuery } from "@tanstack/react-query";
// import { getReport } from "../core/Services/api/Dashbord/DashboardReport";

const Home = () => {
  // const {data} = useQuery({
  //   queryKey : ["adminReport"],
  //   queryFn : getReport,
  // });
  return (
    <div>
      {/* {data?.map((item) => (
        <CardCongratulations
          key={item.id}
          allPaymentCost={item.allPaymentCost}
        />
      ))} */}
      <CardCongratulations/>
    </div>
  );
};

export default Home;
