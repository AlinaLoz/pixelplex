import {APP_CONST} from "../constans";
const ARTICLE = APP_CONST.URL_PREFIX + APP_CONST.ARTICLE_URL;

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

    return fetch(`${APP_CONST.HOST_SERVER}${url}?${sendData.join('&')}`, this.defaultData.optionsGet)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        return response.json().then(err => {throw err;});
      });
  }

  post(url, body) {
    return fetch(`${APP_CONST.HOST_SERVER}${url}`, {...this.defaultData.optionsPost, body: JSON.stringify(body)})
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        return response.json().then(err => {throw err;});
      });
  }

  put(url, body) {
    return fetch(`${APP_CONST.HOST_SERVER}${url}`, {...this.defaultData.optionsPut, body: JSON.stringify(body)})
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response.statusText
      });
  }

  static getArticles(page, limit) {
    const xhr = new Xhr();
    return xhr.get(ARTICLE, {page, limit});
  }

  static createArticle(title, body) {
    const xhr = new Xhr();
    return xhr.post(ARTICLE, {title, body});
  }

  static getOneArticle(id) {
    const xhr = new Xhr();
    return xhr.get(`${ARTICLE}/${id}`, {});
  }

  static updateArticle(id, title, body) {
    const xhr = new Xhr();
    return xhr.put(`${ARTICLE}/${id}`, {title, body});
  }

}

export {Xhr};