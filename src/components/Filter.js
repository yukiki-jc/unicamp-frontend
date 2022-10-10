import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { apiPath, backend } from '../utils/urls';
import { joinPaths } from '@remix-run/router';
import { PageContext } from '../App';

export default function CategoryFilter () {
  const [checkState, setCheckState] = React.useState({});
  let categoryList = {};
  
  const pageContextValue = React.useContext(PageContext);

  

  return (
    <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
      <FormLabel component='legend'>
        Category
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={gilad} onChange={handleChange} name='gilad' />
          }
          label='Gilad Gray'
        />
        <FormControlLabel
          control={
            <Checkbox checked={jason} onChange={handleChange} name='jason' />
          }
          label='Jason Killian'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={antoine}
              onChange={handleChange}
              name='antoine'
            />
          }
          label='Antoine Llorca'
        />
      </FormGroup>
      <FormHelperText>Be careful</FormHelperText>
    </FormControl>
  )
}
