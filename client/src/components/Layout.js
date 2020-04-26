import React from 'react'

function Layout({ children }) {
    return (
        <React.Fragment>
            <div className="container">
                <p>this is nav bar</p>
                {children}
            </div>

        </React.Fragment>
    )
}

export default Layout