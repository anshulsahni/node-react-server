
// all the libraries needed
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const BrowserHistory = ReactRouter.browserHistory;

// About page component
const About = React.createClass({
  render: function() {
    return React.createElement(
      'p',
      { className: 'red' },
      'This is about page'
    );
  }
});

// Products page component
const Products = React.createClass({
  render: function() {
    return React.createElement(
      'p',
      { className: 'blue' },
      'This is Products page but the unfortunately no product for you to buy :)'
    );
  }
});

// Contact Us page
const ContactUs = React.createClass({
  render: function() {
    return React.createElement(
      'a',
      { mailTo: 'anshul_sahni@live.com', className: 'mail-id' },
      'Click here to mail me'
    );
  }
});

// Index component of app
const Index = React.createClass({
  render: function() {
    return React.createElement(
      'div',
      {},
      React.createElement(
        Link,
        { to: 'about' },
        'About'
      ),
      React.createElement(
        Link,
        { to: 'products' },
        'Products'
      ),
      React.createElement(
        Link,
        { to: 'contact_us' },
        'Contact Us'
      ),
      this.props.children
    );
  }
});

// Routes for example app
const Routes = React.createClass({
  render: function() {
    return React.createElement(
      Router,
      { history: BrowserHistory },
      React.createElement(
        Route,
        { path: '/', component: Index },
        React.createElement(
          Route,
          { path: 'about', component: About }
        ),
        React.createElement(
          Route,
          { path: 'products', component: Products }
        ),
        React.createElement(
          Route,
          { path: 'contact_us', component: ContactUs }
        )
      )
    );
  }
});

// Root element of the app
const App = React.createClass({
  render: function() {
    return React.createElement(
      'div',
      {},
      React.createElement(Routes)
    );
  }
});

ReactDOM.render(React.createElement(App), document.querySelector('#sample-app'));
