import {ACTIONS} from "../constans";
import {APP_CONST} from "../../constans";

const initState = {
  fetching    : false,
  count       : -1,
  articles       : [],
  message     : null,
  selectedEdit: {}
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ACTIONS.ARTICLES.FETCH:
      return {...state, fetching: !state.fetching};
    case ACTIONS.ARTICLES.FAILURE_FETCH:
      return {...state, fetching: false, message: action.data};
    case ACTIONS.ARTICLES.GET_ALL_SC:
      const {count, limit, page} = action.data;
      const {articles} = action.data;
      const addElem = new Array(APP_CONST.MAX_LIMIT - limit);
      articles.splice(limit, 0, ...addElem);
      let result = state.articles;
      if (result.length < (page - 1) * APP_CONST.MAX_LIMIT) {
        const tmp = Array(page * APP_CONST.MAX_LIMIT);
        result = Array.from(tmp.keys()).map((value, index) => result[index]);
      }
      result.splice((page - 1) * APP_CONST.MAX_LIMIT, APP_CONST.MAX_LIMIT, ...articles);
      return {...state, count, fetching: false, articles: [...result]};
    case ACTIONS.ARTICLES.CREATE_SC: {
      let {count, page, articles} = state;
      count++;
      articles.unshift(action.data);
      return {...state, message: null, count, page, fetching: false, articles: [...articles]};
    }
    case ACTIONS.ARTICLES.UPDATE_SC: {
      const {articles} = state;
      const {_id} = action.data;

      const index = articles.indexOf(articles.find(item => item._id == _id));
      console.log(articles[index]);
      console.log(articles[index]);

      articles[index] = {...action.data};

      console.log(articles[index]);

      return {...state, message: null, selectedEdit: {}, fetching: false, articles: [...articles] };
    }
    case ACTIONS.ARTICLES.GET_ONE_SC: {
      return {...state, selectedEdit: action.data}
    }
    case ACTIONS.ARTICLES.SELECTED: {
      return {...state, selectedEdit: action.data}
    }
    default:
      return state;
  }
}