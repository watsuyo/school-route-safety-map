import { useEffect, useState } from 'react'
import axios from "axios"
import Header from './Header'
import { postPreview } from '../api'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import dayjs from 'dayjs'
import CircularIndeterminate from './CircularIndeterminate'
import { useNavigate } from "react-router-dom";
import './Form.scss'
import { ReCapture } from './ReCapture'
import { FormHelperText } from '@mui/material'

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
    if (!isHuman || isLoading || !inputs.introduction || !inputs.spot) {
      setIsEmptySpot(!inputs.spot)
      setIsEmptyIntroduction(!inputs.introduction)
      setIsEmptyHuman(!isHuman)
    } else {
      setIsLoading(true)
      await postPreview(inputs, navigate)
      setIsLoading(false)
    }
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

  const useIsHuman = useState(false)
  const [isHuman] = useIsHuman
  const [isEmptyIntroduction, setIsEmptyIntroduction] = useState(false)
  const [isEmptySpot, setIsEmptySpot] = useState(false)
  const [isEmptyHuman, setIsEmptyHuman] = useState(false)

  return (
    <>
      <Header />

      <div className='form-container'>
        <Typography variant="h5" gutterBottom margin="normal">
          危険箇所を投稿
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          {address ? address + ' 付近' : ''}
        </Typography>

        <FormControl fullWidth required onBlurCapture={() => {
          setIsEmptySpot(!inputs.spot)
        }} error={isEmptySpot}
          sx={
            { mb: 2 }
          }>
            <InputLabel>スポット</InputLabel>
            <Select
            name="spot"
            value={inputs.spot}
            onChange={handleChange}
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
          <FormHelperText
            error={isEmptySpot}
            sx={{ ml: 2 }}
          >{
              isEmptySpot ? '入力は必須です' : ''
            }</FormHelperText>
          </FormControl>
        <FormControl fullWidth required>
          <TextField
            label="内容"
            name="introduction"
            multiline
            rows={4}
            value={inputs.introduction}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
            helperText={
              isEmptyIntroduction ? '入力は必須です' : ''
            }
            error={isEmptyIntroduction}
            onBlurCapture={() => {
              setIsEmptyIntroduction(!inputs.introduction)
            }}
          />
        </FormControl>

        <FormControl fullWidth required>
          <ReCapture useIsHuman={useIsHuman} />
          <FormHelperText
            error={isEmptyHuman && !isHuman} sx={{ ml: 2 }}>{
              isEmptyHuman && !isHuman ? 'チェックは必須です' : ''
            }</FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ margin: '24px 0' }}>
          投稿
        </Button>

        {isLoading && <CircularIndeterminate />}
      </div>
    </>
  )
}

export default Content
