import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css"
import video from "./videos/stock_footage_concert.mp4";

function Subscription() {

    return (
        <div className="container">
            <video id="videoBackground" style={{}} autoPlay muted loop>
                <source src={video} type="video/mp4"></source>
            </video>
            <Row><p id="subHeader" style={{width: "100%", textAlign: "center", color: "white", margin: "6% 3% 0 3%;"}}>Which subscription is right for you?</p></Row>

            <Row className="justify-content-around">
                <div className="col-xs-7 col-sm-7 col-md-3 subscriptionDiv">
                    <div class="container innerContainer">
                        <h3 style={{ color: "white", textShadow: "1px 1px 4px black" }}><strong>Essential</strong></h3>
                        <hr />
                        <p>Ads. Lots of ads.</p>
                        <p>Some Other Information</p>
                        <p>Give Us Your Money</p>
                        <p>And Your Data That We Totally Won't Sell*</p>
                        <br/>
                        <p style={{fontSize: 10}}>*sike lol</p>
                    </div>
                </div>
                <div className="col-xs-7 col-sm-7 col-md-3 subscriptionDiv">
                    <div class="container innerContainer">
                        <h3 style={{ color: "white", textShadow: "1px 1px 4px black" }}><strong>Listener+</strong></h3>
                        <hr />
                        <p>Less Ads.</p>
                        <p>Some Other Information</p>
                        <p>Give Us Your Money</p>
                        <p>And Your Data That We Totally Won't Sell*</p>
                        <br/>             
                        <p style={{fontSize: 10}}>*sike lol</p>
                    </div>
                </div>
                <div className="col-xs-7 col-sm-7 col-md-3 subscriptionDiv">
                    <div class="container innerContainer">
                        <h3 style={{ color: "white", textShadow: "1px 1px 4px black" }}><strong>Platinum</strong></h3>
                        <hr />
                        <p>No ads.</p>
                        <p>Some Other Information</p>
                        <p>Give Us Your Money</p>
                        <p>And Your Data That We Totally Won't Sell*</p>
                        <br/>            
                        <p style={{fontSize: 10}}>*sike lol</p>
                    </div>
                </div>

            </Row>
        </div>
    )
}

export default Subscription;