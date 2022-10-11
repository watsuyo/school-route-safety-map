import { useEffect, useState } from 'react'
import axios from "axios"
import Header from './Header'
import { postPreview } from '../api'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import CircularIndeterminate from './CircularIndeterminate'
import { useNavigate } from "react-router-dom";
import './Form.scss'

type Input = {
  title: string
  category: string
  latitude: string
  longitude: string
  timestamp: string
  spot: string
  introduction: string
}

const zlatlng = window.location.hash.split('/')
const lat = zlatlng[2]
const lon = zlatlng[3]

const Content = () => {
  const [inputs, setInputs] = useState<Input>({
    title: '',
    category: '住民要望',
    latitude: lat,
    longitude: lon,
    timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    spot: '',
    introduction: '',
  })

  const handleChange = (e: any) => {
    const name = e.target?.name
    const value = name ? e.target?.value : dayjs(e).format('YYYY-MM-DDTHH:mm:ss')
    setInputs(values => ({ ...values, [name || 'timestamp']: value }))
  }

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true)
    await postPreview(inputs, navigate)
    setIsLoading(false)
  }

  const [address, setAddress] = useState("")

  useEffect(() => {
    (async () => {
      const zlatlng = window.location.hash.split('/')
      const lat = zlatlng[2]
      const lon = zlatlng[3]
      if (lat && lon) {
        const res = await axios.get(
          "https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json",
          {
            params: {
              lat,
              lon
            }
          }
        )
        const { result } = res.data
        const { prefecture: { pname }, municipality: { mname } } = result
        const { section } = result.local[0]

        setAddress(pname + mname + section)
      }
    })()
  })


  return (
    <>
      <Header />

      <div className='form-container'>
        <Typography variant="h5" gutterBottom margin="normal">
          要望を投稿
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          {address ? address + ' 付近' : ''}
        </Typography>

        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} sx={{ mb: 2 }}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="日時"
                value={inputs.timestamp}
                onChange={handleChange}
              />
            </Stack>
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>スポット</InputLabel>
            <Select
            name="spot"
            value={inputs.spot}
              onChange={handleChange}
              sx={{ mb: 2 }}
          >
            <MenuItem value="車両交通量">車両交通量</MenuItem>
            <MenuItem value="道幅">道幅</MenuItem>
            <MenuItem value="歩道">歩道</MenuItem>
            <MenuItem value="横断歩道">横断歩道</MenuItem>
              <MenuItem value="立哨・見守り">立哨・見守り</MenuItem>
            <MenuItem value="カーブミラー">カーブミラー</MenuItem>
            <MenuItem value="信号機">信号機</MenuItem>
            <MenuItem value="見通し">見通し</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="内容"
            name="introduction"
            multiline
            rows={4}
            value={inputs.introduction}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </FormControl>

        <Button variant="contained" onClick={handleSubmit} disabled={isLoading} fullWidth sx={{ margin: '24px 0' }}>
          投稿
        </Button>

        {isLoading && <CircularIndeterminate />}
      </div>
    </>
  )
}

export default Content
