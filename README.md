# Views
Hapi has extensive support for template rendering, including the ability to load and leverage multiple templating engines, partials, helpers (functions used in templates to manipulate data), and layouts. These capabilities are provided by the vision plugin.
## Vision
Vision is a templates rendering plugin for hapi.js. Vision decorates the server, request, and h response toolkit interfaces with additional methods for managing view engines that can be used to render templated responses. Vision also provides a built-in handler implementation for creating templated responses.
Vision is compatible with most major template engines out of the box, such as ejs, handlebars, pug, twig, etc. Engines that don't follow the normal API pattern can still be used by mapping their API to the vision API.

# require('qs')
If you sent the request localhost:3000?foo[bar]=baz, hapi, by default would return { "foo[bar]": "baz" }.
With the qs module, you can parse the query string out. An example:
    query: {
      parser: (query) => Qs.parse(query)
    },

# plugins
hapi has an extensive and powerful plugin system that allows you to very easily break your application up into isolated pieces of business logic, and reusable utilities. You can either add an existing plugin to your application, or create your own.# hapi-server
