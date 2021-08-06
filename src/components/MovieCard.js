import React from 'react';
import {addFavourite,removeFavourite} from '../actions';

class MovieCard extends React.Component{

    handleOnFavBtnClick =()=>{
        const {movie} = this.props;
        this.props.dispatch(addFavourite(movie));
    }
    handleOnUnFavBtnClick =()=>{
        const {movie} = this.props;
        this.props.dispatch(removeFavourite(movie));
    }
    
    render(){
        const {movie} = this.props;
       
        return(
            <div className="movie-card">
                <div className="left">
                    <img alt={movie.poster + "-img"} src={movie.Poster}/>
                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className="rating">{movie.imdbRating}</div>
                        {
                            this.props.isFavourite ?
                            <button className="unfavourite-btn" onClick={this.handleOnUnFavBtnClick}>UnFavourite</button> 
                            : <button className="favourite-btn" onClick={this.handleOnFavBtnClick}>Favourite</button>
                             
                        }
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;