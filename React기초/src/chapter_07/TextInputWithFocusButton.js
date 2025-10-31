import React, { useRef } from "react";

function TextInputWithFocusButton(props){

    const inputElem = useRef(null);

    const onButtonClick = ()=>{
        inputElem.current.focus();
    }

    return (
        <div>
            <input ref={inputElem} type="text"></input>
            <button onClick={onButtonClick}>Focus the Input</button>
        </div>
    );
}

export default TextInputWithFocusButton;