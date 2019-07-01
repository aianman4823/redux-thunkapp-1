import React from 'react';
import {nextCount} from './index';


const Counter = ({store}) => {
    const { count, isFetching } =store.getState()

    const handleNext = () =>{
        store.dispatch(nextCount())
    }

    return(
        <div>
            <h1>{isFetching? '...': count}</h1>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default Counter;