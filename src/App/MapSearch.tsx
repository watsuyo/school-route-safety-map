import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import { FaSearch } from 'react-icons/fa'
import { LoadScript } from '@react-google-maps/api'

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''

type Props = {
  geocode: () => void
  setPlace: React.Dispatch<React.SetStateAction<undefined>>
}

export default function CustomizedInputBase(props: Props) {
  const changeLocationName = (event: any) => {
    if (event.key === 'Enter') {
      props.geocode()
      return
    }
    props.setPlace(event.target.value)
  }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <FaSearch />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="住所で検索"
        inputProps={{ 'aria-label': '住所で検索' }}
        onChange={(event) => changeLocationName(event)}
        onKeyPress={(event) => changeLocationName(event)}
        style={{ height: '60px' }}
      />
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
      </LoadScript>

    </Paper>
  )
}
