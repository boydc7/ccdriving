const React = require('react');
const ReactDOMServer = require('react-dom/server');

const element1 = React.createElement('input', { pattern: "\\d{5}" });
console.log('With \\\\d: ', ReactDOMServer.renderToStaticMarkup(element1));

const element2 = React.createElement('input', { pattern: "\d{5}" });
console.log('With \\d: ', ReactDOMServer.renderToStaticMarkup(element2));
