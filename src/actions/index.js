
// action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const SHOW_FAVOURITE_TAB ="SHOW_FAVOURITE_TAB";
export const ADD_MOVIE_TO_LIST ='ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';

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

export function showFavouriteTab(value){
    return {
        type : SHOW_FAVOURITE_TAB,
        value
    }
}

export function addMovieToList(movie){
    return {
        type : ADD_MOVIE_TO_LIST,
        movie
    }
}

export function handleMovieSearch(movie){
    const url =`http://www.omdbapi.com/?apikey=1e2309aa&t=${movie}`;

    return function(dispatch){
        fetch(url)
        .then(response => response.json())
        .then(movie => {
            console.log('movie:',movie);
            dispatch(addMovieSearchResult(movie));
        });
    }
}

export function addMovieSearchResult(movie){
    return{
        type:ADD_SEARCH_RESULT,
        movie
    }
}

