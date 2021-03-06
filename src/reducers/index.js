import { combineReducers } from 'redux';

import {
    ADD_MOVIES,
    ADD_FAVOURITE,
    REMOVE_FAVOURITE,
    SHOW_FAVOURITE_TAB,
    ADD_MOVIE_TO_LIST,
    ADD_SEARCH_RESULT
} from '../actions';


// Movie Reducer
const initialMoviesState = {
    list:[],
    favList:[],
    isFavTab:false
}

export function movies(state=initialMoviesState, action) {
    switch(action.type){
        case ADD_MOVIES :
            return{
                ...state,  // use spread operator to copy initial state into new object and afterwards alter the list
                list:action.movies
            }
        case ADD_FAVOURITE:
            return{
                ...state,
                favList:[action.movie, ...state.favList]  // append movie to the first index of favList , and spread the rest element afterwards
            }
        case REMOVE_FAVOURITE:
            let index = state.favList.indexOf(action.movie);
            
            if(index !== -1)
            {
                return{
                    ...state,
                    favList:[...state.favList.slice(0,index),...state.favList.slice(index+1)] 
                }
            }
            return {
                ...state
            }
        case SHOW_FAVOURITE_TAB:
            return{
                ...state,
                isFavTab:action.value  
            }
        case ADD_MOVIE_TO_LIST:    // This action is expressed when we click on Add To Movies button from Search Result.
            return{
                ...state,
                list:[action.movie, ...state.list]
            }
        default :
            return state;
    }
}


// Search Reducer
const initialSearchState = {
    result:{},
    showSearchResults:false
};

export function search(state = initialSearchState, action) // we can't have muliple default exports in a same file
{
    switch(action.type){
        case ADD_SEARCH_RESULT:
            return{
                ...state,
                result: action.movie,
                showSearchResults:true
            }
        case ADD_MOVIE_TO_LIST:{
            return{
                ...state,
                showSearchResults:false
            }
        }
        default :
            return state;
    }
}


// // Root reducer
// const initialRootState = {
//     movies:initialMoviesState,
//     search:initialSearchState
// }

// // export default function rootReducer(state = initialRootState, action) {
// //     return{
// //         movies:movies(state.movies,action), // multiple reducers can be defined here
// //         search:search(state.search,action)
// //     }
// // }


// Use redux's combineReducer which serves the same purpose as above (rootReducer)
export default combineReducers({movies,search});