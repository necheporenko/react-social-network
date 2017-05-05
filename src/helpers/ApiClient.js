import superagent from 'superagent';
import Cookies from 'js-cookie';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function saveAuthCookie(value) {
  console.log('saveAuthCookie', value);
  Cookies.set('_u', {
    token: value,
  }, { expires: 30 });
  console.log(Cookies.get());
}

function deleteAuthCookie() {
  console.log('deleteAuthCookie');
  Cookies.remove('_u');
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
      this[method] = (path, { params, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        console.log('=== REQUEST ===');

        if (params) {
          console.log('params', params)
          request.query(params);
        }

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

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          if (err) {
            return reject(body || err);
          }

          console.log('Method:', method);
          console.log('Path:', path);
          console.log('Body:', body);

          if (method === 'post' && path === '/auth/login' && body && body.token) {
            saveAuthCookie(body.token);

            return resolve(body);
          }
        });
      });
    });
  }

  setJwtToken(token) {
    this.token = token;
  }
}
