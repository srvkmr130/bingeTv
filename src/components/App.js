import React from "react";
import { data } from "../resources/data/data";
import {addMovies} from '../actions'
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";


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

  render(){
    const {list} = this.props.store.getState();
    return (
      <div className="App">
      <Navbar/>
      <div className="main">
        <div className="tabs">
          <div className="tab">Movies</div>
          <div className="tab">Favourites</div>
        </div>
        <div className="list">
          {list.map((movie,index) =>(<MovieCard movie={movie} key = {`movieId_${index}`}/>))}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
