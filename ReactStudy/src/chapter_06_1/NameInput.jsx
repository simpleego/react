import React, {useState, useEffect} from "react";



function NameInput() {

    const [name, setName] = useState('');

    // 컴포넌트가 처음 마운트될 때 실행
    useEffect(()=>{
        console.log('컴포넌트가 마운트되었습니다.');
    },[]);

    // name이 변경될 때마다 실행
    useEffect(()=>{
        if(name){
            console.log(`이름이 변경되었습니다. ${name}`);
        }
    },[name]);   



    return(
        // 화면 생성
        <div>
            <h2>이름을 입력하세요</h2>
            <input type="text"
            value={name} 
            onChange={(e)=>setName(e.target.value)}
            placeholder="이름입력"
            />
            <p>안녕하세요, {name || '익명'} 님!</p>
        </div>

    )
}

export default NameInput;

