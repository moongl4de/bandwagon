import React from "react"
import "../App.css"

//placeholder code

function Header() {
    return (
        <div>
            <p style={{ fontSize: "20px", float: "left" }}>bandwagon.</p>
            <p style={{float: "right"}}>Bandwagon logo and
                <br/> dropdown menu here</p>
               <a href='signup'> <button className="bg-primary text-light">Sign up</button></a>
               <a href='signin'> <button className="bg-danger text-light">Sign In</button></a>

            <br />
        </div>

    )
}

export default Header;