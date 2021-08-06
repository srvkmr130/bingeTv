import React from "react";
import { data } from "../resources/data/data";
import {addMovies} from '../actions'
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {showFavouriteTab,showMoviesTab} from '../actions';

class App extends React.Component{

  componentDidMount(){
    const {store} = this.props;

    // Step 1: here we subscribe to the get the changes updated in UI
    let v = store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate();
    });
    console.log(typeof(v));

    // Step 2: make an api call to fetch data , here we are fetching directly from data.js for ease
    // Step 3: Dispatch action
    store.dispatch(addMovies(data));
    console.log(this.props.store.getState());
  }

  isFavourite = (movie) => {
    const {favList} = this.props.store.getState();

    if(favList.indexOf(movie) === -1){
      return false;
    }
    return true;
  }

  
  handleFavTabClick = () => {
    this.props.store.dispatch(showFavouriteTab());
  }
  handleMoviesTabClick = () => {
    this.props.store.dispatch(showMoviesTab());
  }


  render(){
    //const {store} = this.props;
    const {list,favList,isFavTab} = this.props.store.getState();
    const renderList = isFavTab ? favList :list;
    console.log('State',this.props.store.getState());
    return (
      <div className="App">
      <Navbar/>
      <div className="main">
        <div className="tabs">
          <div className="tab" onClick={this.handleMoviesTabClick}>Movies</div>
          <div className="tab" onClick={this.handleFavTabClick}>Favourites</div>
        </div>
        <div className="list">
          {renderList.map((movie,index) => (<MovieCard 
          movie = {movie} 
          key = {`movieId_${index}`} 
          dispatch = {this.props.store.dispatch}
          isFavourite = {this.isFavourite(movie)}
          />))}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
