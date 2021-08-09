import React from "react";
import { data } from "../resources/data/data";
import {addMovies} from '../actions'
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {showFavouriteTab} from '../actions';
import {connect} from 'react-redux';



class App extends React.Component{

  componentDidMount(){

    // Step 1: here we subscribe to the get the changes updated in UI . Note here we used HOC to get it done .
        // let v = store.subscribe(() => {
        //   console.log('UPDATED');
        //   this.forceUpdate();
        // });
        // console.log(typeof(v));

    // Step 2: make an api call to fetch data , here we are fetching directly from data.js for ease
    // Step 3: Dispatch action
    this.props.dispatch(addMovies(data));
    // console.log(this.props.store.getState());
  }

  isFavourite = (movie) => {
    const {movies} = this.props;
    const {favList} = movies;

    if(favList.indexOf(movie) === -1){
      return false;
    }
    return true;
  }

  
  onChangeTab = (value) => {
    this.props.dispatch(showFavouriteTab(value));
  }
  
  render(){
    const {movies,search} = this.props; // this will have : {movies:{} , search:{}}
    const {list,favList,isFavTab} = movies; 
    const renderList = isFavTab ? favList :list;
    console.log('State',this.props);
    return (
      <div className="App">
      <Navbar search={search}/>
      <div className="main">
        <div className="tabs">
          <div className={`tab ${isFavTab? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${isFavTab? 'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list">
          {renderList.map((movie,index) => (<MovieCard 
          movie = {movie} 
          key = {`movieId_${index}`} 
          dispatch = {this.props.dispatch}
          isFavourite = {this.isFavourite(movie)}
          />))}
        </div>
        {favList.length === 0 ? <div className="no-movies">No movies to display !!</div> : null}
      </div>
      </div>
    );
  }
}

// // Creating a wrapper for App , so that we can access the store as props in App component
//     class AppWrapper extends React.Component{  
//       render(){
//         return (
//           <StoreContext.Consumer>
//             { (store)=> <App store={store}/>}
//           </StoreContext.Consumer>
//         )
//       }
//     }

// // EXporting AppWrapper beacuse it will internally call App component with exact value
//     export default AppWrapper;



function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.search
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;