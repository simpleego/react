import React from "react";
import Book from './Book';

function Library(props){
    return(

        <>
            <Book name="처음 만난 파이썬" numOfPages={300} />
            <Book name="처음 만난 AWS" numOfPages={400} />
            <Book name="처음 만난 리액트" numOfPages={500} />
            <Book name="처음 만난 자바" numOfPages={300} />
            <Book name="처음 만난 C" numOfPages={100} />
            <Book name="처음 만난 자바스크립트" numOfPages={300} />
            <Book name="처음 만난 장고" numOfPages={50} />
        </>

    );
}

export default Library;
