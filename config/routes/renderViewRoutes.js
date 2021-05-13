// There are two options for rendering a view, you can use either the h.view() method, where h is the response toolkit or the view handler.
module.exports = [
  {
    method: 'GET',
    path: '/view/using-toolkit',
    handler: function (request, h) {
      // In order to pass context to h.view(), you pass an object as the second parameter
      return h.view('index', { title: 'My home page' })
    }
  },
  {
    method: 'GET',
    path: '/view',
    handler: {
      view: {
        template: 'index',
        context: {
          title: 'My home page'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/view/using-default-layout',
    handler: function (request, h) {
      return h.view('view', { pageTitle: 'using-default-layout' })
    }
  },
  {
    method: 'GET',
    path: '/view/using-another-layout',
    handler: function (request, h) {
      return h.view('view', { pageTitle: 'using-another-layout' }, { layout: 'another_layout' })
    }
  }
]
