import superagent from 'superagent';
import Cookies from 'js-cookie';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function saveAuthCookie(req, value) {
  if (__CLIENT__) {
    Cookies.set('_u', value
      , { expires: 30 });
  } else {
    // console.log('REQ:', req);                                      // look req in terminal
    return req.session.token = value;
  }
  // console.info('saveCookie:', value);
  // console.log(Cookies.get());
}

function readAuthCookie(req) {
  if (req && req.session && req.session.token) {
    console.log('req.session.token:', req.session.token);
    return req.session.token;
  }

  const cookie = __CLIENT__ ? document.cookie : req.headers['cookie'];

  // console.log('req.headers', req.headers['cookie']);

  if (cookie) {
    const matches = cookie.match(new RegExp('(?:^|; )_u=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;        // get cookie token
  }

  return '';
}

function deleteAuthCookie(req) {
  if (__CLIENT__) {
    Cookies.remove('_u');
  } else {
    return req.session.token = '';
  }
}

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  // if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    //return `http://${config.apiHost}:${config.apiPort + adjustedPath}`;
    // return 'http://' + config.apiHost + adjustedPath;
  // }
  // Prepend `/api` to relative URL, to proxy to API server.
  //return `/api${adjustedPath}`;
  const apiURL = 'http://api.validbook.org/v1';
  console.log('apiURL', apiURL + adjustedPath);
  return apiURL + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params = {}, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        console.log('=== REQUEST ===');

        console.log('Paramsssssss:', params);
        const apiKey = readAuthCookie(req);
        if (apiKey) {
          params['access_token'] = apiKey;
        }

        if (params) {                         // for get request
          console.log('==Params:', params);
          request.query(params);
        }

        if (data) {                           // for post request
          request.send(data);
        }

        // console.log('REQ:', req);          // look req in terminal

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        request.end((err, { body } = {}) => {
          if (err) {
            return reject(body || err);
          }

          console.info('==Method:', method);
          console.info('==Path:', path);
          console.info('==Body:', body);

          if (method === 'post' && path === '/auth/login' && body && body.data.access_token) {
            saveAuthCookie(req, body.data.access_token);
          }

          if (path === '/auth/logout') {
            deleteAuthCookie(req);
          }

          return resolve(body);
        });
      });
    });
  }

  setJwtToken(token) {
    this.token = token;
  }
}
