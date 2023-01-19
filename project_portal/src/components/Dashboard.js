import React from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Dashboard(){
    const data = JSON.parse(localStorage.getItem('project_data'))
    useEffect(() => {
        axios.put('http://localhost:8000/register',{
            roll_number: JSON.parse(localStorage.getItem('project_data')).roll_number
        },{
            headers: {Authorization: 'Token '+data.token}
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    
    
    function getData(){
        axios.put('http://localhost:8000/register',{
            roll_number: data.roll_number
        },{
            headers: {Authorization: 'Token '+data.token}
        })
        .then((res)=>{
            console.log(res)
        })
    }
    return(
        <div>
            <button onClick={getData}>Click</button>
        </div>
    )
}