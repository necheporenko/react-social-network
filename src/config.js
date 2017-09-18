require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'local',
  port: process.env.PORT,
  //apiHost: process.env.APIHOST || 'localhost',
  //apiPort: process.env.APIPORT,
  apiHost: 'apifuturama11001111.validbook.org/v1',
  app: {
    title: 'React Validbook',
    description: 'Validbook – a universal platform for cooperation.',
    head: {
      title: 'React Validbook',
      // titleTemplate: 'React Redux Example: %s',
      meta: [
        { name: 'description', content: 'Validbook – a universal platform for cooperation' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Validbook' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },                                //todo fix
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React Validbook' },
        { property: 'og:description', content: 'Validbook – a universal platform for cooperation.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@necheporenko' },
        { property: 'og:creator', content: '@necheporenko' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
