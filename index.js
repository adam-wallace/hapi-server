'use strict'

const Hapi = require('@hapi/hapi')
const Qs = require('qs')
const routes = require('./config/routes')
const Path = require('path')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Handlebars = require('handlebars')

// While Express relies heavily on middleware for much of its functionality, hapi has more built into the core.
// Body parsing, cookie handling, input/output validation, and HTTP-friendly error objects are already built-in to the hapi framework.
// For additional functionality, hapi has a robust selection of plugins in its core ecosystem. hapi is also the only framework that doesn't rely on outside dependencies. Every dependency is managed by the core hapi team, which makes security and reliability some of hapi's greatest strengths.
const init = async () => {
  process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
    // some other closing procedures go here
    process.exit(1)
  })

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    // If you sent the request localhost:3000?foo[bar]=baz, hapi, by default would return { "foo[bar]": "baz" }.
    query: {
      parser: (query) => Qs.parse(query)
    },
    // To simplify things, especially if you have multiple routes that respond with files, you can configure a base path in your server and only pass relative paths to h.file():
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  })

  // Register Plug-ins
  // The inert plugin provides new handler methods for serving static files and directories, as well as adding a h.file() method to the toolkit, which can respond with file based resources.
  await server.register(Inert)
  // Vision is a templates rendering plugin for hapi.js. Vision decorates the server, request, and h response toolkit interfaces with additional methods for managing view engines that can be used to render templated responses.
  await server.register(Vision)

  const globalViewContext = {
    globalTitle: 'My personal site'
  }

  server.views({
    // register the handlebars module as the engine responsible for rendering templates with an extension of .html.
    // options may be set either globally, which configures them for all registered engines, or local to one specific engine,
    engines: {
      html: {
        module: Handlebars
        // compileMode: 'sync' // engine specific option
      }
    },
    // Tell the server that your templates are located in the templates directory. You indicate that this directory should be taken relative to the current directory by providing a relativeTo option. By default, hapi will look for templates relative to the current working directory.
    relativeTo: __dirname,
    path: 'templates',
    // Vision includes built-in support for view layouts. It comes disabled by default, because it may conflict with other layout systems that specific view engines may provide. This enables the built-in layouts and defines the default layout page to templates/layout/layout.html
    layout: true,
    layoutPath: './templates/layout',
    // JavaScript modules located in the defined helpersPath are available in templates.
    helpersPath: './templates/helpers',
    // compileMode: 'async' // global setting,
    // The default global context will be merged with any local context passed taking the lowest precedence and applied to your view.
    context: globalViewContext
  })

  await server.route(routes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
