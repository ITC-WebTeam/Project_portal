import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect } from 'react';

export default function ChipInput() {


  const [selected, setSelected] = useState([])
  const [options, setOption] = useState(['India', 'Pakistan', 'Bangladesh', 'Russia'])

  const selectionChangeHandler = (event) => {
    setSelected(oldArray => [...oldArray, event.target.value]);
    setOption(prev => prev.filter(options => options !== event.target.value))
  };

  const handleDelete = (e, value) => {
    setSelected(prev => prev.filter(selected => selected !== value))
    setOption(oldArray => [...oldArray, value]);
  }

  return (
    <>
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        defaultValue="India"
        style={{width: '80%'}}
        onChange={e => selectionChangeHandler(e)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <div>
        {selected.map((value) => (
          <Chip color='primary' onDelete={e => handleDelete(e, value)} deleteIcon={<DeleteIcon color='red' />} key={value} label={value} />
        ))}
      </div>
    </>

  );
}
