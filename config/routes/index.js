const routes = [require('./basicRoutes'), require('./staticFileRoutes'), require('./validateRoutes'), require('./renderViewRoutes')]
module.exports = [].concat(...routes)
