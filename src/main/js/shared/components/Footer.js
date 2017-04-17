const React = require('react');

class Footer extends React.Component {
    render() {
        return <footer>
            <div className="fake-copyright">&copy; Parrit 2017</div>
            <div className="footer-links">
                <a href="mailto:parrithelp@gmail.com">Contact Us</a>
                <a target="_blank" href="http://www.github.com/Parrit/Parrit">GitHub</a>
            </div>
        </footer>;
    }
}

module.exports = Footer;