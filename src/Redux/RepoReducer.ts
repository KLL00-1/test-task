import { SearchRepo } from "./../components/types";

const GET_USER_REPO = "GET_USER_REPO";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_SEARCH = "SET_SEARCH";

type intialStateRepoType = {
  repositories: Array<SearchRepo> | null;
  totalRepo: number;
  pages: number;
  currentPage: number;
  search: string;
};

let initialState: intialStateRepoType = {
  repositories: null,
  totalRepo: 0,
  pages: 0,
  currentPage: 1,
  search: "",
};

const repoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USER_REPO:
      return {
        ...state,
        repositories: action.repositories,
        totalRepo: action.totalRepo,
        pages: Math.ceil(action.totalRepo / 10),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

type GetUserRepoActionType = {
  type: typeof GET_USER_REPO;
  repositories: Array<SearchRepo>;
  totalRepo: number;
};

export const getUserRepoAction = (
  repositories: Array<SearchRepo>,
  totalRepo: number
): GetUserRepoActionType => {
  return { type: GET_USER_REPO, repositories, totalRepo };
};

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPageAction = (
  currentPage: number
): SetCurrentPageActionType => {
  return { type: SET_CURRENT_PAGE, currentPage };
};

type SetSearchActionType = {
  type: typeof SET_SEARCH;
  search: string;
};

export const setSearchAction = (search: string): SetSearchActionType => {
  return { type: SET_SEARCH, search };
};

export default repoReducer;
