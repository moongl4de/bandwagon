import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";

import { Card } from "../components/adCard.jsx";
import { StatsCard } from "../components/adStatsCard.jsx";

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
} from "../variables/Variables.jsx";

import { Pie } from 'react-chartjs-2'


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
                statsValue={this.props.totalPlay}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-piggy text-success" />}
                statsText="Tokens"
                statsValue={this.props.totalTokenEarned}
                statsIcon={<i className="pe-7s-check" />}
                statsIconText="Verified"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-headphones text-danger" />}
                statsText="Total Plays"
                statsValue={this.props.totalNumberPlayed}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
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
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card

                title="Total Plays"
                category="By Song"

                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >

                    <Pie data={{
                      labels: this.props.songPlayName,
                      datasets: [
                        {
                          label: 'Song Data',
                          backgroundColor: [
                            '#B21F00',
                            '#C9DE00',
                            '#2FDE00',
                            '#00A6B4',
                            '#6800B4'
                          ],
                          hoverBackgroundColor: [
                            '#501800',
                            '#4B5000',
                            '#175000',
                            '#003350',
                            '#35014F'
                          ],
                          data: this.props.songPlayPercentage,
                        }
                      ]
                    }} options={{

                      legend: {
                        display: false,
                        position: 'bottom'
                      }

                    }} />
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
