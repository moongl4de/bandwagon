import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";

import { Card } from "../components/adCard.jsx";
import { StatsCard } from "../components/adStatsCard.jsx";
import { Tasks } from "../components/adTasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales2,
} from "../variables/Variables.jsx";

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cloud-upload text-warning" />}
                statsText="Songs Uploaded"
                statsValue="121"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="In the last 24 hours"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-piggy text-success" />}
                statsText="Tokens Used"
                statsValue="234"
                statsIcon={<i className="pe-7s-check" />}
                statsIconText="In the last 24 hours"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-headphones text-danger" />}
                statsText="Total Plays"
                statsValue="224"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last 24 hours"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="New Users"
                statsValue="+24"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="In the last hour"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                
                id="chartHours"
                title="Songs Played"
                category="by month performance"
                
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                      
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales2)}</div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Tasks"
                category="Development To-Do"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>



        </Container>
      </div>
    );
  }
}

export default Dashboard;
