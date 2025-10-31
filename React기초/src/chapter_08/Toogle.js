import React, { useState } from "react";

function Toogle(props) {
    const [isToogleOn, setIsToogleOn] = useState(true);

    // 방법 1. 함수안에 함수를 사용
    function handleClick() {
        console.log('---->')
        setIsToogleOn(
            (isToogleOn) => !isToogleOn);
    }

    // 방법 2. 화살표 함수를 사용
    // const handleClick = ()=> {
    //     console.log('---->')
    //     setIsToogleOn(
    //         (isToogleOn) => !isToogleOn);
    // };

    return (
            <button onClick={handleClick}>
                {isToogleOn ? "켜짐": "꺼짐"}
            </button>
    );
}

export default Toogle;
