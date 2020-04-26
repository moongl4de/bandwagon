import React from 'react'
import axios from 'axios'
require('dotenv').config();

function Signup() {
    const [userState, setUserState] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    
   const signupUser = (userState) => 
     axios({
        //  url:`${process.env.REACT_APP_API}/signup`,
        url:`http://localhost:8000/api/signup`,
         data: userState,
         method:'POST'
        })
        .then((res)=>{
          return res.data
      }).catch(err=>{
          console.log("error")
      })
    


    const handleInputChange = (event) => {
        setUserState({
            ...userState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        signupUser(userState);

        //reset the user inputs
        setUserState({
            name: '',
            email: '',
            password: ''
        })
    }


    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Sign Up Form</h2>
                    <form>
                        <div className="form-group">
                            <h3 className="text-light">{JSON.stringify(userState)}</h3>
                            <label> Name
                         <input placeholder='Name' type='text' name='name' value={userState.name} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label> Email
                        <input placeholder='Email' type='text' name='email' value={userState.email} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label> Password
                        <input placeholder='Password' type='text' name='password' value={userState.password} onChange={handleInputChange} />
                            </label>
                        </div>
                        <button type="submit" onClick={handleSubmit}>Create Account</button>
                        </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup