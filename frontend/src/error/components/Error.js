import React from 'react';

import Footer from '../../shared/components/Footer.js';

class Error extends React.Component {
    render() {
        return (
            <div className="layout-wrapper error-container">
                <main className="error-image-wrapper">
                    <div className="parrit-talk-bubble">
                        <h1 className="error-message">What the heck?!</h1>
                        <a className="text-link home-page-link" href="/">Get me out of here<span className="carrot"/></a>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default Error;
