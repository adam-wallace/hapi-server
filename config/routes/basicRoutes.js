const Hoek = require('@hapi/hoek')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      // The second parameter, h is the response toolkit, which is an object with several methods used to respond to the request.
      // There are Express response methods that hapi can accomplish by just using return. Some of these methods include res.send and res.json. Here is an example of how hapi will respond with JSON data:
      // hapi has the functionality to respond with JSON data by default. The only thing you have to do is just return a valid JavaScript object and hapi will take care of the rest for you.
      // The second parameter, h, is the response toolkit, an object with several methods used to respond to the request. As you've seen in the previous examples, if you wish to respond to a request with some value, you simply return it from the handler. The payload may be a string, a buffer, a JSON serializable object, a stream or a promise.
      // Alternatively you may pass the same value to h.response(value) and return that from the handler. The result of this call is a response object, that can be chained with additional methods to alter the response before it is sent. For example h.response('created').code(201) will send a payload of created with an HTTP status code of 201. You may also set headers, content type, content length, send a redirection response, and many other things that are documented in the API reference.
      // The handler option must return a value, a promise, or throw an error.
      return 'Hello World!'
    }
  },
  {
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {
      return 'Response to put or post'
    }
  },
  {
    // use a very broad, generic path, '/{any*}. This will catch any route that our other routes do not. hapi routes will go the the most specific path first, then get broader, till it finds a match
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return '404 Error! Page Not Found!'
    }
  },
  {
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, h) {
      // Path parameters
      // Note: It is best practice to always return escaped and validated user inputs such as query/path parameters. This is done to prevent echo or XSS attacks. One way to do this is to use Hoek escapeHtml() method
      // In the above example, the user parameter is required: a request to /hello/bob or /hello/susan will work, but a request to /hello will not
      return `Hello ${Hoek.escapeHtml(request.params.user)}!`
    }
  },
  {
    method: 'GET',
    path: '/hello-optional/{user?}', // In order to make a parameter optional, put a question mark at the end of the parameter's name.
    handler: function (request, h) {
      // It is important to be aware that only the last named parameter in a path can be optional.
      const user = request.params.user ? request.params.user : 'stranger'
      return `Hello ${user}!`
    }
  },
  {
    method: 'GET',
    path: '/hello/multi-segment/{user*2}', // The number after the asterisk represents how many path segments should be assigned to the parameter.
    handler: function (request, h) {
      // Like the optional parameters, a wildcard parameter (for example /{files*}) may only appear as the last parameter in your path
      const userParts = request.params.user.split('/')
      return `Hello ${userParts[0]} ${userParts[1]}!`
    }
  },
  {
    method: 'GET',
    path: '/query/parameters/',
    handler: function (request, h) {
      // Query Parameters
      // Query parameters are common way of sending data to the server. Query parameters are sent via the URL in a key=value format. For example:
      // localhost:3000?name=ferris&location=chicago
      // There are two query parameters here, name=ferris and location=chicago. In hapi, you can access query parameters by the request.query object.
      return `Hello ${request.query.name}!`
    }
  },
  {
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {
      // POST
      // Anytime you send request data to your API, you will be able to access this data in the route handler with request.payload. See the following:
      // The handler receives data via request.payload. In this case, the request.payload contains an object that stores user sign up data:
      // { username: 'ferris', password: 'password' }
      // Note: It's always best practice to validate the incoming payload, as it may contain unsafe data. See validation tutorial for more info.
      const payload = request.payload
      return `Welcome ${payload.username}!`
    }
  }
]
