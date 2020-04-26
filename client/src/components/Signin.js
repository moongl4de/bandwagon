import React, {useState, Fragment} from 'react'
import axios from 'axios'

function Signin (){
const [signInData, updateSignIn] = useState({
    email:'',
    password:''
})

const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    updateSignIn({
        ...signInData,
        [name]: value
    })
}

const handleSubmit =(event) =>{
    event.preventDefault();
    signIn(signInData)

    //reset sign in form
    updateSignIn({
        email:'',
        password:'' 
    })
}


//sign in API call
function signIn(userCred){
    axios({
        method: 'POST',
        url:'http://localhost:8000/api/signin',
        data: userCred
    }).then((res)=>{
        console.log('successfully signed in')
        return res.data
    }).catch((err)=>{
        console.log('failed to sign in')
        return err
    })
}

    return(
        <Fragment>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2 className="text-light">Sign In</h2>
          
                        <div className="form-group">
                            <label> Email
                        <input placeholder='Email' type='text' name='email' value={signInData.email} onChange={handleInputChange} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label> Password
                        <input placeholder='Password' type='text' name='password' value={signInData.password} onChange={handleInputChange} />
                            </label>
                        </div>

                        <button type="submit" onClick={handleSubmit}>Sign In</button>
                     
                </div>
            </div>
        </Fragment>
    )
}


export default Signin;