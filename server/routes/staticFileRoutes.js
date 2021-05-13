// Inevitably while building any web application, the need arises to serve a simple file from disk.
// The inert plugin provides new handler methods for serving static files and directories, as well as adding a h.file() method to the toolkit, which can respond with file based resources.
module.exports = [
  {
    method: 'GET',
    path: '/file/about.html',
    handler: function (request, h) {
      return h.file('about.html')
    }
  },
  {
    method: 'GET',
    path: '/file/{filename}',
    handler: {
      // An alternative to using the h.file() method would be to use the file handler - 'file: 'picture.jpg'' or:
      file: function (request) {
        return request.params.filename
      }
    }
  },
  {
    method: 'GET',
    path: '/file/script.js.gz',
    handler: {
      // It can also be an object with a path property. When using the object form of the handler, you can do a few additional things, like setting the Content-Disposition header and allowing compressed files
      file: {
        path: 'script.js.gz',
        filename: 'client.js', // override the filename in the Content-Disposition header
        mode: 'attachment', // specify the Content-Disposition is an attachment
        lookupCompressed: true // allow looking for script.js.gz if the request allows it
      }
    }
  },
  {
    method: 'GET',
    path: '/dir/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: ['about.html'],
        listing: true
        // A request to / will now first try to load /index.html, then /default.html. When there is no index file available, inert can display the contents of the directory as a listing page. You can enable that by setting the listing property to true
      }
    }
  }
]
