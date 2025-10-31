import React, { useCallback, useState } from 'react';

function MeasureExample() {
    const [height, setHeight] = useState(0);
     const [size, setSize] = useState(100);


    console.log('------>');

    const measureRef = useCallback(node=>{
            if(node !== null){
                setHeight(node.getBoundingClientRect().height);
            }
    }, []);


    return(

        <>
            <h1 ref={measureRef}>안녕 리액트</h1>
            <h2>위의 헤더의 높이는 {Math.round(height)}px 입니다.</h2>
        </>

    );
}

export default MeasureExample;