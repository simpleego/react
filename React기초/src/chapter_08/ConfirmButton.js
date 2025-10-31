import React, { useState } from "react";

function ConfirmButton(props) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    //let isConfirmed=false;

    const handleConfirm = () => {
        console.log('==>');
        setIsConfirmed( (prevIsConfirmed) => !prevIsConfirmed);
        console.log('->',isConfirmed);
    };

    return (
        <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed ? "확인됨" : "확인하기"}
        </button>
    );
}

export default ConfirmButton;