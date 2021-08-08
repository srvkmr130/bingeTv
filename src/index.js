// Pacakages imports
import React,{createContext} from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux';

// File imports
import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// Here , logger is a curried function and internally redux calls this as : function logger(obj)(next)(action)

// Way 1
        // const logger = function({dispatch,getState}){
        //     return function(next)
        //     {
        //         return function (action) {
        //             console.log('ACTION_TYPE:',action.type);
        //             next(action);
        //         }
        //     }
        // }


// Way 2
const logger = ({dispatch,getState}) =>(next) =>(action) => {
    console.log('ACTION_TYPE:',action.type);
    next(action);
}


const store = createStore(rootReducer,applyMiddleware(logger,thunk));
console.log('store',store);
console.log('State',store.getState());


// create a store context 
export const StoreContext = createContext();

class Provider extends React.Component{
    render(){
        const {store} = this.props;
        return <StoreContext.Provider value={store}>
            {this.props.children}  
        </StoreContext.Provider>
    }
}

console.log('Context',StoreContext);
ReactDOM.render(
    <Provider store={store}>
        <App store ={store}/>
    </Provider>
,document.getElementById('root'));

