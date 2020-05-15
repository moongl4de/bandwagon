import React from "react";
import Card from "react-bootstrap/Card"

import "../../src/assets/css/info.css"

function Info() {
    return (

        <div style={{margin: "0 1%"}}>
            <div className="header1">
            <br/>
            <hr className="meetHr1 wow animate__animated animate__backInDown animate__fast" />
                <div className="row ">
                    <h1 className="wow animate__animated animate__fadeIn animate__slower" id="bandwagon">Bandwagon</h1><br />
                </div>
                <div className="row  wow animate__animated animate__fadeIn animate__delay-1s ">
                    <p className="slogan" style={{ color: "white", textAlign: "center", letterSpacing: "10px", fontWeight: "lighter" }}>where music lives</p>
                </div>
                <br/>
                <hr className="meetHr2 wow animate__animated animate__backInUp" />

            </div>
            <div className="header1">
                <div className="row">
                    <h3 className="wow animate__animated animate__fadeIn animate__slow" style={{ padding: "0 20px", textAlign: "center" }}>Bandwagon is a digital music streaming platform designed with listeners and artists in mind.</h3><br />
                </div>
                <div className="row  wow animate__animated animate__fadeIn">
                </div>
            </div>

            <div className="row no-gutters ">
                <div className="col-md-6 no-gutters ">
                    <div className="leftside d-flex justify-content-center align-items-center wow animate__animated animate__fadeIn">
                        <div className="leftoverlay d-flex justify-content-center align-items-center">
                            <h1 style={{ letterSpacing: 15 }}>Listeners</h1>
                            <div className="test">
                                <h2 style={{padding: "0px 10px"}}>Listeners are given a number of tokens every month to spend on streaming songs via instant microtransactions.<br /><br />When a song is streamed, a token is sent directly to that artist.<br /><br /></h2>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=" col-md-6 no-gutters ">
                    <div className="rightside d-flex justify-content-center align-items-center wow animate__animated animate__fadeIn">
                        <div className="rightoverlay d-flex justify-content-center align-items-center">
                            <h1 style={{ letterSpacing: 15 }}>Artists</h1>
                            <div className="test">
                                <h2 style={{padding: "0 10px"}}>Artists are able to upload their music directly to the site, removing the need for distribution middlemen. <br /><br />Artists keep 100% of the profit they generate through the support of their listeners. </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header1" style={{ marginBottom: "40%" }}>
                <div className="row ">
                    <h1 id="meetHeader" style={{ padding: "0 20px", textAlign: "center" }}>Meet the developers</h1><br /><br />
                </div>
                <hr className="meetHr1 wow animate__animated animate__fadeInRightBig animate__fast" />
                <div class="row" style={{ margin: "1% auto" }}>

                    <Card className="cardInfo wow animate__animated animate__fadeInLeftBig animate__fast" border="dark" style={{ width: '18rem', borderRadius: "0", margin: "4px" }}>

                        <Card.Img variant="top" style={{ borderRadius: "50%", width: "200px", margin: "0 auto", boxShadow: "0 0 5px 2px #313131" }} src={"https://avatars2.githubusercontent.com/u/56325924?s=460&u=e39b44e59b5e58d4d452edb0ef246550372fcdb7&v=4"} />

                        <Card.Body>
                            <p className="devName" style={{ textAlign: "center" }}>Alex Gignilliat</p>
                            <hr />
                            {/* <Card.Title>Front End Developer</Card.Title> */}
                            <Card.Text className="devDesc" style={{ textAlign: "center" }}>
                                UX/UI<br />
                                Audio Player Integration<br />
                                Stripe Payment Processing
                        </Card.Text>
                            <br /><br /><br />
                            <a className="githubLink" href="https://github.com/alexgignilliat" target="_blank"><i class="fab fa-github fa-3x"></i></a>
                        </Card.Body>
                    </Card>
                    <Card className="cardInfo wow animate__animated animate__fadeInLeft animate__fast" border="dark" style={{ width: '18rem', borderRadius: "0", margin: "4px" }}>
                        <Card.Img variant="top" style={{ borderRadius: "50%", width: "200px", margin: "0 auto", boxShadow: "0 0 5px 2px #313131" }} src={"https://avatars0.githubusercontent.com/u/57273286?s=460&u=7072d0cbfb824c618f35239bc386a38a981d6935&v=4"} />
                        <Card.Body>
                            <p className="devName" style={{ textAlign: "center" }}>Alan Grosse</p>
                            <hr />
                            <Card.Text className="devDesc" style={{ textAlign: "center" }}>
                                Database Search Functionalty<br />
                                Artist Dashboard<br />
                                Artist Library
                        </Card.Text>
                            <br /><br /><br />
                            <a className="githubLink" href="https://github.com/aagrosse" target="_blank"><i class="fab fa-github fa-3x"></i></a>
                        </Card.Body>
                    </Card>
                    <Card className="cardInfo wow animate__animated animate__fadeInRight animate__fast" border="dark" style={{ width: '18rem', borderRadius: "0", margin: "4px" }}>
                        <Card.Img variant="top" style={{ borderRadius: "50%", width: "200px", margin: "0 auto", boxShadow: "0 0 5px 2px #313131" }} src={"https://avatars0.githubusercontent.com/u/56370076?s=400&u=20983c8b7ea9c90b367dff5a48639f134a6e772c&v=4"} />
                        <Card.Body>
                            <p className="devName" style={{ textAlign: "center" }}>Daria Naumova</p>
                            <hr />
                            <Card.Text className="devDesc" style={{ textAlign: "center" }}>
                                AWS/S3<br />
                                Stitch UI/Atlas<br />
                                MongoDB<br />

                            </Card.Text>
                            <br /><br /><br />
                            <a className="githubLink" href="https://github.com/DariaNau" target="_blank"><i class="fab fa-github fa-3x"></i></a>
                        </Card.Body>
                    </Card>
                    <Card className="cardInfo wow animate__animated animate__fadeInRightBig animate__fast" border="dark" style={{ width: '18rem', borderRadius: "0", margin: "4px" }}>
                        <Card.Img variant="top" style={{ borderRadius: "50%", width: "200px", margin: "0 auto", boxShadow: "0 0 5px 2px #313131" }} src={"https://media-exp1.licdn.com/dms/image/C4E03AQHgxJScVaIJvQ/profile-displayphoto-shrink_800_800/0?e=1594857600&v=beta&t=8SW497PujB-5dvk0POlCgUvsq54BkH_J6RzcowhCMdo"} />
                        <Card.Body>
                            <p className="devName" style={{ textAlign: "center" }}>Mesay Bekele</p>
                            <hr />
                            <Card.Text className="devDesc" style={{ textAlign: "center" }}>
                                User Authentication<br />
                                Microtransaction/Token Logic<br />
                                MongoDB

                        </Card.Text><br /><br /><br />
                            <a className="githubLink" href="https://github.com/mesayb" target="_blank"><i class="fab fa-github fa-3x"></i></a>
                        </Card.Body>

                    </Card>
                    <br />
                </div>
                <hr className="meetHr2 wow animate__animated animate__fadeInLeftBig animate__fast" />
            </div>
            <br/>
            {/* <div className="row">
            <div className="header1" style={{ marginBottom: "15%" }}>
                <h1 className="wow animate__animated animate__fadeInDownBig animate__fast">Technologies Used</h1>
                <hr className="meetHr1 wow animate__animated animate__fadeInRightBig animate__fast" />
                <div className="container5" >
                    <div className="row wow animate__animated animate__fadeIn animate__slow">
                    <i class="fab fa-aws fa-10x"></i>
                    <i class="fab fa-stripe fa-10x"></i>
                    </div>
                    <div className="row wow animate__animated animate__fadeIn animate__slow">
                    <i class="fab fa-js fa-7x"></i>
                    <i class="fab fa-react fa-7x"></i>
                    <i class="fab fa-css3-alt fa-7x"></i>
                    <i class="fab fa-node fa-7x"></i>
                    </div>
                    <div className="row wow animate__animated animate__fadeIn animate__slow">
                   <img id="mongo" src={"https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png"}/>
                   </div>
                   <div className="row">
                   </div>
                </div>
                <hr className="meetHr2 wow animate__animated animate__fadeInLeftBig animate__fast" />
            </div>
            </div> */}

        </div>

    )
}

export default Info;