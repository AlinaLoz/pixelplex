import {ACTIONS} from "../constans";
import {APP_CONST} from "../../constans";

const initState = {
  fetching    : false,
  count       : -1,
  pages       : {},
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
      const {count, page, limit, articles} = action.data;
      return {...state, count, fetching: false, pages: {...state.pages, [page]: articles} };
    case ACTIONS.ARTICLES.CREATE_SC: {
      let {count, page, pages} = state;
      count++;
      if (count > (page - 1) * APP_CONST.MAX_LIMIT) {
        page++;
      }
      if (!pages[page]) {
        pages[page] = [];
      }
      pages[page].push(action.data);
      return {...state, message: null, count, page, fetching: false, pages: {...pages} };
    }
    case ACTIONS.ARTICLES.UPDATE_SC: {
      const {pages} = state;
      const {_id} = action.data;
      let indexArticle = 0;
      const numberPage = Object.keys(pages).find(number => {
        const isFind = pages[number].find((i, index) => {
          indexArticle = index;
          return i._id === _id;
        });
        return isFind
      });

      pages[numberPage][indexArticle] = action.data;
      return {...state, message: null, selectedEdit: {}, fetching: false, pages: {...pages} };
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