const Joi = require('joi')

// The first type of validation hapi can perform is input validation. This is defined in the options object on a route, and is able to validate headers, path parameters, query parameters, and payload data. Note: In the below examples, you'll see that we give a JS object to route.options.validate. The validate option has a default value of:

// {
//    headers: true,
//    params: true,
//    query: true,
//    payload: true,
//    state: true,
//    failAction: 'error'
// }

module.exports = [{
  // Validating
  // The first property under options is auth. auth will set the authentication configuration for the route. Since this route is for a new user signing up, you will disable authentication.
  // The second property is validate. This allows you to set validation rules for various request components, such as headers, params, payload, and failAction. You use the joi package to validate the request.payload. For more info, please check the validation tutorial.
  method: 'POST',
  path: '/signup-validate',
  handler: function (request, h) {
    const payload = request.payload
    return `Welcome ${payload.username}!`
  },
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        username: Joi.string().min(1).max(20),
        password: Joi.string().min(7)
      })
    }
  }
}
]
