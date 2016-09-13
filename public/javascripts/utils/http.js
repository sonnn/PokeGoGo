import 'whatwg-fetch';

function requestFactory(requestOption = {}) {
  return (url, additionOption = {}) => new Promise((resolve, reject) => {
    const options = { ...requestOption, ...additionOption };
    fetch(url, options).then((response) => {
      if (response.status === 401) {
        window.location = `/auth/login?redirect=${window.location.pathname}`;
      }
      response.json().then(resolve).catch(reject);
    }).catch((err) => {
      reject(err);
    });
  });
}

const get = requestFactory({
  method: 'get',
  credentials: 'same-origin',
});

const post = requestFactory({
  method: 'post',
  credentials: 'same-origin',
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
});

const put = requestFactory({
  method: 'put',
  credentials: 'same-origin',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
});


export {
  get,
  post,
  put,
};
