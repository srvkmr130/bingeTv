import React from "react";
import { data } from "../resources/data/data";
import {addMovies} from '../actions'
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {showFavouriteTab} from '../actions';

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
    const {movies} = this.props.store.getState();
    const {favList} = movies;

    if(favList.indexOf(movie) === -1){
      return false;
    }
    return true;
  }

  
  onChangeTab = (value) => {
    this.props.store.dispatch(showFavouriteTab(value));
  }
  
  render(){
    const {movies} = this.props.store.getState(); // this will have : {movies:{} , search:{}}
    const {list,favList,isFavTab} = movies; 
    const renderList = isFavTab ? favList :list;
    console.log('State',this.props.store.getState());
    return (
      <div className="App">
      <Navbar/>
      <div className="main">
        <div className="tabs">
          <div className={`tab ${isFavTab? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${isFavTab? 'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list">
          {renderList.map((movie,index) => (<MovieCard 
          movie = {movie} 
          key = {`movieId_${index}`} 
          dispatch = {this.props.store.dispatch}
          isFavourite = {this.isFavourite(movie)}
          />))}
        </div>
        {favList.length === 0 ? <div className="no-movies">No movies to display !!</div> : null}
      </div>
      </div>
    );
  }
}

export default App;
