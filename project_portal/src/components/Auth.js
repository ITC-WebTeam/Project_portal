import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const navigate = useNavigate();
    try {
        var auth_code = window.location.href.split('=')[1]
    } catch (error) {
        window.location.replace('/')
    }
    

    axios.post('http://localhost:8000/userdata', {
        code: auth_code
    })
    .then((res)=>{
        // console.log(res.data)
        localStorage.setItem('project_data', JSON.stringify(res.data))
        // localStorage.setItem('project_name', res.data.name)
        // localStorage.setItem('project_token', res.data.token)
        // localStorage.setItem('project_picture', res.data.profile_picture)
        // localStorage.setItem('project_email', res.data.email)
        // localStorage.setItem('project_roll_number', res.data.roll_number)
        // localStorage.setItem('project_name', res.data.name)
        navigate('/register')
    })
    .catch((err)=>{
        navigate('/')
    })


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress sx={{}} />
        </Box>
    )
}