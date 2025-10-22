import React from "react";
import './Child.css';

function Children(p){
    return(
        <>
            <h1>우리 가족 소개</h1>
            <h2>{`이 름 : ${p.name}`}</h2>
            <h2>{`생 일 : ${p.birthday} `}</h2>
            <h2>{`호 칭 : ${p.nickName}`}</h2>
            <h2>{`성 별 : ${p.gender}`}</h2>
        </>
    )
}

export default Children;