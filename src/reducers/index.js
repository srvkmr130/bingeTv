import {ADD_MOVIES,ADD_FAVOURITE,REMOVE_FAVOURITE,SHOW_FAVOURITE_TAB,SHOW_MOVIES_TAB} from '../actions';

const initialMoviesState = {
    list:[],
    favList:[],
    isFavTab:false
}

export default function movies(state=initialMoviesState,action) {
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
                isFavTab:true  
            }
        case SHOW_MOVIES_TAB:
            return{
                ...state,
                isFavTab:false  
            }
        default :
            return state;
    }
  }