const React = require('react');

class Footer extends React.Component {
    render() {
        return <footer>
            <div className="fake-copyright">&copy; Parrit 2016</div>
            <div className="github-link"><a target="_blank" href="http://www.github.com/Parrit/Parrit">GitHub</a></div>
        </footer>;
    }
}

module.exports = Footer;