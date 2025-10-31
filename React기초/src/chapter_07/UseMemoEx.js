import React, {useState, useMemo} from "react";


function UseMemoEx(){

    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    //const [num, setNum] = useState(10);

    console.log('---->');

    const calculateExpenValue = (num)=>{
        console.log('계산중.... 난 아직 계산 안해도 되는데!!!!');
        let i= 0;
        while(i<100000){
            i++;
        }
        return num*2;
    }

    // useMemo를 이용하여 처리
    // 관련된 값이(count) 변경되면 호출되는 함수
    const memoisedValue = useMemo(()=>{
            return calculateExpenValue(count);
    },[count]);


    return(
        <div>
                <h2>useMemo 예시</h2>
                <button onClick={()=> setCount(c=>c+1)}>
                    Count 증가 : {count}
                    </button>
                <p>
                    ** 메모이제이션된 값(count에만 의존): ** {memoisedValue}
                </p>
                <hr></hr>

                <input type="text" value={text} 
                        onChange={(e)=>setText(e.target.value)}
                ></input>
                <p>
                    ** 다른 상태 (Text) : ** {text}
                </p>
        </div>
    )
}

export default UseMemoEx;
