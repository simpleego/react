import React from "react";

const students = [
    {
        id: 1,
        name: "인제"
    },
    {
        id: 2,
        name: "철수"
    },
    {
        id: 3,
        name: "영희"
    },
    {
        id: 4,
        name: "민제"
    },
];


function AttendanceBook(props){

    return(

        <ul>
            {
                students.map((student,index)=>{
                    return <li key={`${student.name}+index`}>{index+1} : {student.name}</li>
                })
            }
        </ul>
    );

}
export default AttendanceBook;