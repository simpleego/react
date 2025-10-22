import React from "react";

function Book(props){

    return(
        <>
            <h1>{`이책의 이름은 ${props.name}입니다.`}</h1>
            <h2>{`이책의  총 쪽수 ${props.numOfPages}입니다.`}</h2>
        </>
    )
}

export default Book;