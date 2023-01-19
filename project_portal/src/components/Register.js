import * as React from 'react';
import TextField from '@mui/material/TextField';
import sticker from '../assets/sticker_removed.png'
import './register.css'
import CallIcon from '@mui/icons-material/Call';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect } from 'react';
import axios from 'axios';





export default function Register() {
  var resume;
  const data = JSON.parse(localStorage.getItem('project_data'));
  const pic = data.profile_picture;
  const name = data.name;
  const roll_number = data.roll_number
  const navigate = useNavigate()


  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedTopSkills, setSelectedTopSkills] = useState([])
  const [skillOption, setSkillOption] = useState(['India', 'Pakistan', 'Bangladesh', 'Russia'])
  const [topSkillOption, setTopSkillOption] = useState(['India', 'Pakistan', 'Bangladesh', 'Russia'])

  const skillChangeHandler = (event) => {
    const value = event.target.value
    setSelectedSkills(oldArray => [...oldArray, value]);
    setSkillOption(prev => prev.filter(options => options !== value));
    // setUser(prevUser => ({
    //   ...prevUser, [name]: topSkills
    // })
  }
  const topSkillChangeHandler = (event) => {
    const value = event.target.value
    setSelectedTopSkills(oldArray => [...oldArray, value]);
    setTopSkillOption(prev => prev.filter(topSkillOption => topSkillOption !== value));
  }

  const handleSkillsDelete = (e, value) => {
    setSelectedSkills(prev => prev.filter(selectedSkills => selectedSkills !== value))
    setSkillOption(oldArray => [...oldArray, value]);
  }

  const handleTopSkillsDelete = (e, value) => {
    setSelectedTopSkills(prev => prev.filter(selectedTopSkills => selectedTopSkills !== value))
    setTopSkillOption(oldArray => [...oldArray, value]);
  }

  // function logOut() {
  //   localStorage.clear()
  //   navigate('/')
  // }

  function handleFileInput(e){
   resume = e.target.files;
  }

  function submit() {
    let formData = new FormData();
    formData.append('roll_number', roll_number);
    formData.append('name', name)
    formData.append('topskills', selectedTopSkills)
    formData.append('skills', selectedSkills)
    formData.append('resume', resume[0])

    console.log(resume[0])
    axios.post('http://localhost:8000/register', formData, {
      headers: {Authorization: 'Token '+data.token}
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (

    <div className='outer-div'>
      <div className="left-container">
        <h1 className='left-heading'>PROJECT PORTAL</h1>
        <img src={sticker} className='sticker' alt="" />
        <p>
          The best place to know all about the amazing projects going on in the Institute
        </p>
      </div>
      {/* <div className="top" >
        <img src={pic} alt="" />
        <Button variant='contained' onClick={logOut} color='warning'>Log Out</Button>
      </div> */}

      <div className="right-container">

        <div style={{ 'textAlign': 'center' }}>


          <h3>Welcome, {name}</h3>
          <h2>Enter your details:</h2>
          {/* <div style={{'display': 'flex'}}> */}
          <p >
            Top Skills:
          </p>
          <TextField
            id="outlined-select-currency"
            select
            sx={{ 'textAlign': 'left' }}
            label="Select"
            defaultValue="India"
            style={{ width: '20vw' }}
            name='topskills'
            onChange={e => topSkillChangeHandler(e)}
          >
            {topSkillOption.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div>
            {selectedTopSkills.map((value) => (
              <Chip color='primary' style={{ margin: '0.5rem 0.1rem 0' }} onDelete={e => handleTopSkillsDelete(e, value)} deleteIcon={<DeleteIcon color='red' />} key={value} label={value} />
            ))}
          </div>
          {/* </div> */}

          <p>
            Other Skills:
          </p>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="India"
            style={{ width: '20vw', textAlign: 'left' }}
            name='skills'
            onChange={e => skillChangeHandler(e)}
          >
            {skillOption.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div>
            {selectedSkills.map((value) => (
              <Chip color='primary' onDelete={e => handleSkillsDelete(e, value)} deleteIcon={<DeleteIcon color='red' />} key={value} label={value} />
            ))}
          </div>
          {/* <p>
            Whatsapp No:
          </p> */}
          {/* <TextField
            label='Whatsapp no.'
            style={{ width: '20vw' }}
            InputProps={{
              startAdornment: (
                <CallIcon />
              )
            }}
          >
          </TextField> */}
          <p>
            Upload Resume:
          </p>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <Button className='mb-2' variant="contained" color='success' component="label">
              Upload
              <input hidden multiple onChange={e =>handleFileInput(e)} type="file" />
            </Button><br />
            <Button onClick={submit} style={{width: '40%', height: '30%'}} variant='contained'>Submit</Button>
          </div>
        </div>
      </div>
    </div>


  )
}