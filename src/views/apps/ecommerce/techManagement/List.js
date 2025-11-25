import React from "react";
import { Card, Row, Col, Button } from "reactstrap";
import TableTech from "../../tables/techListTable/TableTech";
import { useQuery } from "@tanstack/react-query";
import { getTechList } from "../../../../core/Services/api/TechSection";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Cpu } from "react-feather";

const List = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getTechList"],
    queryFn: getTechList,
    refetchOnWindowFocus:false,
    staleTime:5*1000*60
  });

  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Cpu size={21} />}
          color="info"
          stats={data?.length}
          statTitle="تعداد تکنولوژی ها"
        />
        <Button color="relief-primary"   style={{width:"100%"}}>افزودن تکنولوژِی +</Button>
      </Col>
      
      <Col md="9">
        <Card>
          <TableTech data={data} isLoading={isLoading} />
        </Card>
      </Col>
    </Row>
  );
};

export default List;
