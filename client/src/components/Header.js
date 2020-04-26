import React from "react"
import "../App.css"
import Search from "../components/Searchbar"

//placeholder code

function Header() {
    return (
        <div>
            <Search />
            <p style={{ fontSize: "20px", float: "left" }}>bandwagon.</p>
            <p style={{float: "right"}}>Bandwagon logo and
                <br/> dropdown menu here</p>
           

            <br />
        </div>

    )
}

export default Header;