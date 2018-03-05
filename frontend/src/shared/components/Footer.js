import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="fake-copyright">&copy; Parrit 2018</div>
                <div className="footer-links">
                    <a target="_blank" rel="noopener" href="mailto:parrithelp@gmail.com">Contact Us</a>
                    <a target="_blank" rel="noopener" href="http://www.github.com/Parrit/Parrit">GitHub</a>
                </div>
            </footer>
        )
    }
}

export default Footer