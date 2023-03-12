import { useSelector } from "react-redux/es/hooks/useSelector";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { combineReducers, createStore } from "redux";
import repoReducer from "./RepoReducer";

const reducers = combineReducers({
  repo: repoReducer,
});

type ReducersType = typeof reducers;
export type AppReducerType = ReturnType<ReducersType>;

let store = createStore(reducers);

export const useSelectorApp: TypedUseSelectorHook<AppReducerType> = useSelector;

//@ts-ignore
window.store = store;

export default store;
