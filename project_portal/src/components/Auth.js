import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Auth() {
    try {
        var auth_code = window.location.href.split('=')[1]
    } catch (error) {
        window.location.replace('/')
    }
    

    axios.post('http://localhost:8000/userdata', {
        code: auth_code
    })
    .then((res)=>{
        console.log(res.data)
        localStorage.setItem('project_data', JSON.stringify(res.data))
        window.location.replace('/register')
    })
    .catch((err)=>{
        window.location.replace('/')
    })


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress sx={{}} />
        </Box>
    )
}