import "./CounterButton.css"
import {useState} from "react";
import CounterButton from "./CounterButton";

function Counter(){

    const [count, setCount] =  useState(0)

    function incrementCounterParentFunction(by){
        setCount(count+by)
    }

    function decrementCounterParentFunction(by){
        setCount(count-by)
    }

    function Reset(){
        setCount(0)
    }

    return (
        <div className="Counter">
            <span className="totalCount">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction}
                     decrementMethod={decrementCounterParentFunction}>
            </CounterButton>
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction}
                     decrementMethod={decrementCounterParentFunction}>
            </CounterButton>
            <CounterButton by={5} incrementMethod={incrementCounterParentFunction}
                     decrementMethod={decrementCounterParentFunction}>
            </CounterButton>
            <button className="counterButton"
                    style={{backgroundColor: "purple"}} onClick={Reset}
            >Reset</button>
        </div>
    )
}

export default Counter;