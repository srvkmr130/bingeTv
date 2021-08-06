
// action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const SHOW_FAVOURITE_TAB ="SHOW_FAVOURITE_TAB";
export const SHOW_MOVIES_TAB = "SHOW_MOVIES_TAB";


// action creators
export function addMovies(movies){
    return {
        type : ADD_MOVIES,
        movies // used shorthand , it is writing as good as [ movies:movies ]
    }
}
export function addFavourite(movie){
    return {
        type : ADD_FAVOURITE,
        movie // used shorthand 
    }
}
export function removeFavourite(movie){
    return {
        type : REMOVE_FAVOURITE,
        movie // used shorthand 
    }
}

export function showFavouriteTab(){
    return {
        type : SHOW_FAVOURITE_TAB
    }
}
export function showMoviesTab(){
    return {
        type : SHOW_MOVIES_TAB
    }
}
