var React = require('react');

var Footer = React.createClass({
    render: function() {
        return <footer>
            <div className="fake-copyright">&copy; Parrit 2016</div>
            <div className="github-link"><a target="_blank" href="http://www.github.com/pinwheeler/Parrit">GitHub</a></div>
        </footer>;
    }
});

module.exports = Footer;