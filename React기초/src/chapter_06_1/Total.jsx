import React, {useState} from "react";

function Total(){

    const [values, setValues] = useState({a:0, b:0, c:0});

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: Number(value),
        }));
    };

    // 총점 처리
    const total = values.a + values.b + values.c;  
    
    // 평균 처리
    const avg = total/3;


    return(

        <div>
            <h2>합계 계산기</h2>
            <div>
                <label htmlFor="">국어 :</label>
                <input type="number" name="a" value={values.a} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">영어 :</label>
                <input type="number" name="b" value={values.b} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">수학 :</label>
                <input type="number" name="c" value={values.c} onChange={handleChange}/>
            </div>
            <h3>총합 : {total} </h3>
            <h3>평균 : {avg.toFixed(2)} </h3>
        </div>

    )
}

export default Total;