import React from "react";
import Child from './Children';

function Parent(){
    return(
        <>
            <Child  name="홍길수" birthday="2000-3-3" nickName="장남" gender="남자" />
            <Child  name="홍미라" birthday="2002-6-13" nickName="차녀" gender="여자" />
        </>
    );
}

export default Parent;
