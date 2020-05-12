import React, { useEffect }  from "react";
import { Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import "../App.css"


function ActivateUser (props) {
    const [userAuthState, setAuthState] = React.useState({
        name: '',
        token: '',
        display: true
    })

    
    useEffect(() => {
        let token = props.match.params.token;
        let { name } = jwt.decode(token);

        if (token) {
            setAuthState({ ...userAuthState, name, token });
        }
    }, []);

    const { name, token, display } = userAuthState;

    const handleSubmit = (event) => {
        event.preventDefault();

        activateAccountAPICall();

        //reset the user inputs
        setAuthState({
            ...userAuthState,
            display: false
        })
    }



const activateAccountAPICall = () => {
    axios({
        method: 'POST',
        url: `/api/activate-account`,
        data: {token:userAuthState.token}
    })
        .then(res => {
            console.log('ACCOUNT ACTIVATION', res);
            setAuthState({ ...userAuthState, display: false });
            toast.success('Your Account has been activated');
        })
        .catch(err => {
            // console.log('ACCOUNT ACTIVATION ERROR', err);
            console.log('ACCOUNT ACTIVATION ERROR', err.response.data.error);
            toast.error('Activation Failed - Account already active');
        });
}





    return (

        <div id="loginContainer">
            <Container style={{ justifyContent: "center" }}>
            {!display ? <Redirect to="/" /> : null }
                <Row>
                    <img style={{ margin: "1% auto" }} id="loginLogo" src={require("./images/newlogo.png")}></img>
                </Row>
                <Row>
                    <h2 style={{ width: "100%", textAlign: "center" }}>Activate Account</h2>
                </Row>
                <Row style={{ justifyContent: "center" }}>
<ToastContainer />
                        <Button  variant="dark" type="submit" onClick={handleSubmit}>
                            Activate
                        </Button>


                </Row>

            </Container>

        </div>

    )
}

export default ActivateUser; 