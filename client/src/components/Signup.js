import React from 'react'
import axios from 'axios'

function Signup() {
    const [userState, setUserState] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    
   const signupUser = (userState) =>   axios({url:'http://localhost:8000/api/signup', data:userState, method:'POST'}).then((res)=>{
       console.log("success")
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
        console.log('you got clicked!')
      //setUserState(signupUser(userState))  
      console.log('sing up user api stufff', signupUser(userState))
    }


    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Sign Up Form</h2>
                    {/* <form className="signup"> */}
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
                    {/* </form> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup