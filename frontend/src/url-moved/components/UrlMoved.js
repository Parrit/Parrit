import React from 'react'

import Footer from '../../shared/components/Footer.js'

class UrlMoved extends React.Component {
    render() {
        return (
            <div className="layout-wrapper url-moved-container">
                <main className="url-moved-image-wrapper">
                    <div className="parrit-talk-bubble">
                        <h1 className="oh-shit-message">Oh shit?!</h1>
                        <h1 className="url-moved-message">Parrit moved.</h1>
                    </div>

                    <div className="longer-message">
                      <p>
                        A very small team launched Parrit in 2016 on a free account and
                        have provided minimal support as a side project since then.
                      </p>

                      <p>
                        We heard word recently that the app would sunset off our free
                        platform in January 2021. We were working on a migration
                        strategy that would have the least impact to pair rotations but as
                        the saying goes, "the best-laid plans... often go awry."
                      </p>

                      <p>
                        Some of the services supporting Parrit were eliminated
                        November 25th, 2020 and we worked quickly to setup a new
                        instance. You may now access your accounts at: <span style={{textDecoration: 'underline'}}>parrit.io</span>
                      </p>
                    </div>

                    <button
                      className="new-url-button"
                      onClick={() => window.location.href = 'https://parrit.io'}
                    >
                      Start Using Parrit.io Now
                    </button>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default UrlMoved
