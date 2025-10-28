// Box.js
import React, { useEffect, useState } from 'react';

const Box = ({ createBoxStyle }) => {
    const [style, setStyle] = useState({});

    // createBoxStyle 내용이 변경될 때마다 호출된다
    // 따라서 박스 스타일이 변경된다.
    // 그러나 테마 변경이 되어도 호출이 되는 문제가 발생한다.
    useEffect(() => {
        console.log("박스 키우기");
        setStyle(createBoxStyle());
    }, [createBoxStyle]);

    return <div style={style}></div>;
};

export default Box;