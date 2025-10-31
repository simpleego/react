import React, { useState } from "react";

function NameForm() {

    const [value, setValue] = useState('');
    const [valueText, setValueText] = useState('');
    const [valueSelect, setValueSelect] = useState('aa');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleTextChange = (e) => {
        setValueText(e.target.value.toUpperCase());
    }

    const handleChangeSelect = (e)=>{
        setValueSelect(e.target.value);
    }

    const handleSubmit = (e)=>{
        //alert('입력한 이름:'+value);
        if(value ===''){
            alert('이름을 입력하세요');
        }
        e.preventDefault();
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <h1> 폼 배우기 </h1>
                <label>이름 : </label>
                <input type="text" value={value} onChange={handleChange} /><br></br><br></br>
                <textarea rows="5" cols="30" value={valueText} onChange={handleTextChange}>

                </textarea>
                <br></br><br></br>
                <label>과일선택 : </label>
                <select onChange={handleChangeSelect}>
                    <option value="aa">사과</option>
                    <option value="bb">바나나</option>
                    <option value="gg">포도</option>
                    <option selected value="ss">딸기</option>
                </select>
                <p>선택한 과일은 : {valueSelect}</p>
                <input type="submit" value="보내기" />
            </form>
        </>

    );
}

export default NameForm;