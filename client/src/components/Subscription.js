import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css"
import video from "./videos/stock_footage_concert.mp4";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios"
import API from "../utils/API"
import { isAuth } from "./helper";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

toast.configure()

function Subscription() {

    const [subscription, updateSubscription] = React.useState({
        name: "Bandwagon Subscription",
        price: "9.99",
        description: "Subscription to Bandwagon",
        paymentSuccess: false
    });

    async function handleToken(token, addresses) {
        console.log({ token, addresses })
        const response = await axios.post('http://localhost:9000/checkout', {
            token,
            subscription
        });
        const { status } = response.data
        if (status == 'success') {
            API.getUsers()
                .then((result) => {
                    const email = isAuth().email;
                    const currentUser = result.data.filter(user => user.email === email);
                    //update user payment required to false after intial signup
                    const data = { ...currentUser[0], paymentRequired: false };
                    API.updateUser(data._id, data)

                        .catch((err) => {

                            toast.error("Failed to update user");
                        });
                    updateSubscription({
                        ...subscription,
                        paymentSuccess: true
                    })
                    toast('Success! Check email for details', { type: "success" })
                })
        } else {
            toast('Something went wrong.', { type: "error" })
        }
    }

    if (subscription.paymentSuccess === true) {
        return (<Redirect to="/listener" />)
    }

    return (
        <div className="container">
            <video id="videoBackground" style={{}} autoPlay muted loop>
                <source src={video} type="video/mp4"></source>
            </video>
            <Row><p id="subHeader" style={{ width: "100%", textAlign: "center", color: "white", margin: "6% 3% 0 3%" }}>Which subscription is right for you?</p></Row>

            <Row className="justify-content-around">
                <div className="col-xs-7 col-sm-7 col-md-3 subscriptionDiv">
                    <div className="container innerContainer">
                        <h3 style={{ color: "white", textShadow: "1px 1px 4px black" }}><strong>Essential</strong></h3>
                        <hr />
                        <p>Ads. Lots of ads.</p>
                        <p>Some Other Information</p>
                        <p>Give Us Your Money</p>
                        <p>And Your Data That We Totally Won't Sell*</p>
                        <StripeCheckout
                            stripeKey="pk_test_TExsl85qm4nbGdPbaoBMJJPH00frAPIgbz"
                            token={handleToken}
                        />
                        <br />

                        <p style={{ fontSize: 10 }}>*sike lol</p>
                    </div>
                </div>
                <div className="col-xs-7 col-sm-7 col-md-3 subscriptionDiv">
                    <div className="container innerContainer">
                        <h3 style={{ color: "white", textShadow: "1px 1px 4px black" }}><strong>Listener+</strong></h3>
                        <hr />
                        <p>Less Ads.</p>
                        <p>Some Other Information</p>
                        <p>Give Us Your Money</p>
                        <p>And Your Data That We Totally Won't Sell*</p>
                        <StripeCheckout
                            stripeKey="pk_test_TExsl85qm4nbGdPbaoBMJJPH00frAPIgbz"
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            amount={subscription.price * 100}
                            name={subscription.name}
                        />
                        <br />
                        <p style={{ fontSize: 10 }}>*sike lol</p>
                    </div>
                </div>
                <div className="col-xs-7 col-sm-7 col-md-3 subscriptionDiv">
                    <div className="container innerContainer">
                        <h3 style={{ color: "white", textShadow: "1px 1px 4px black" }}><strong>Platinum</strong></h3>
                        <hr />
                        <p>No ads.</p>
                        <p>Some Other Information</p>
                        <p>Give Us Your Money</p>
                        <p>And Your Data That We Totally Won't Sell*</p>
                        <StripeCheckout
                            stripeKey="pk_test_TExsl85qm4nbGdPbaoBMJJPH00frAPIgbz"
                            token={handleToken}
                        />
                        <br />
                        <p style={{ fontSize: 10 }}>*sike lol</p>

                    </div>
                </div>

            </Row>

        </div>
    )
}

export default Subscription;