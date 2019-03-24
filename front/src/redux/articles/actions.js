import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const fetchArticles = (page, limit) => dispatch => {
  dispatch({type: ACTIONS.ARTICLES.FETCH});
  Xhr.getArticles(page, limit).then(resp => {
    dispatch({
      type: ACTIONS.ARTICLES.GET_ALL_SC,
      data: resp
    })
  }).catch(err => {
    dispatch({
      type: ACTIONS.ARTICLES.FAILURE_FETCH,
      data: err.data
    })
  });
};

export const createArticles = (title, body) => dispatch => {
  dispatch({type: ACTIONS.ARTICLES.FETCH});
  Xhr.createArticle(title, body).then(resp => {
    dispatch({
      type: ACTIONS.ARTICLES.CREATE_SC,
      data: resp
    })
  }).catch(err => {
    dispatch({
      type: ACTIONS.ARTICLES.FAILURE_FETCH,
      data: err.data
    })
  });
};

export const fetchOneArticle = (id) => dispatch => {
  dispatch({type: ACTIONS.ARTICLES.FETCH});
  Xhr.getOneArticle(id).then(resp => {
    dispatch({
      type: ACTIONS.ARTICLES.GET_ONE_SC,
      data: resp
    })
  }).catch(err => {
    dispatch({
      type: ACTIONS.ARTICLES.FAILURE_FETCH,
      data: err.data
    })
  });
};

export const updateArticle = (id, title, body) => dispatch => {
  dispatch({type: ACTIONS.ARTICLES.FETCH});
  Xhr.updateArticle(id, title, body).then(resp => {
    dispatch({
      type: ACTIONS.ARTICLES.UPDATE_SC,
      data: resp,
    })
  }).catch(err => {
    dispatch({
      type: ACTIONS.ARTICLES.FAILURE_FETCH,
      data: err.data
    })
  });
};

export const selectedArticle = (data) => dispatch => {
  dispatch({
    type: ACTIONS.ARTICLES.SELECTED,
    data
  });
};



