import React from "react";

function MyButton(){
    const handleDelete = (id, e)=> {
        console.log('-->',id, e.target.textContent);  
    };  

    return (
        <button onClick={(e)=> handleDelete(1,e)}>
            삭제하기
        </button>
    )    
}

export default MyButton;