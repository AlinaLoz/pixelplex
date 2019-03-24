const PATH = 'http://localhost:8000/api/v1';

class Xhr {
  defaultData = {
    optionsGet  : {
      mode   : 'cors',
      method : 'get',
      headers: {
        "Content-Type" : "application/json; charset=UTF-8",
      }
    },
    optionsPost : {
      mode     : 'cors',
      method   : 'post',
      headers  : {
        "Content-Type" : "application/json; charset=UTF-8",
      },
    },
    optionsPut  : {
      mode   : 'cors',
      method : 'put',
      headers  : {
        "Content-Type" : "application/json; charset=UTF-8",
      },
    }
  };

  get(url, params) {
    const filterParams = Object.keys(params).reduce((obj, key) => {
      if (params[key]) return {...obj, [key]: params[key]};
      return {...obj};
    }, {});

    const sendData = Object.keys(filterParams).map(key => `${key}=${params[key]}`);

    return fetch(`${PATH}${url}?${sendData.join('&')}`, this.defaultData.optionsGet)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        return response.json().then(err => {throw err;});
      });
  }

  post(url, body) {
    return fetch(`${PATH}${url}`, {...this.defaultData.optionsPost, body: JSON.stringify(body)})
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        return response.json().then(err => {throw err;});
      });
  }

  put(url, body) {
    return fetch(`${PATH}${url}`, {...this.defaultData.optionsPut, body: JSON.stringify(body)})
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response.statusText
      });
  }

  static getArticles(page, limit) {
    const xhr = new Xhr();
    return xhr.get('/articles/', {page, limit});
  }

  static createArticle(title, body) {
    const xhr = new Xhr();
    return xhr.post('/articles', {title, body});
  }

  static getOneArticle(id) {
    const xhr = new Xhr();
    return xhr.get(`/articles/${id}`, {});
  }

  static updateArticle(id, title, body) {
    const xhr = new Xhr();
    return xhr.put(`/articles/${id}`, {title, body});
  }

}

export {Xhr};