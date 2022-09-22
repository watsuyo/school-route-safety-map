import { ChangeEvent, useState } from 'react'
import './Form.scss'
import axios from "axios"
import Header from './Header'

type Input = {
  title: string
  category: string
  content: string
  address: string
  postcode: string
  date: string
  time: string
}

type Zipcode = {
  main: string
  sub: string
}

const Content = () => {
  const [zipcode, setZipcodeMain] = useState<Zipcode>({
    main: "",
    sub: ""
  })

  const [inputs, setInputs] = useState<Input>({
    title: '',
    category: '',
    content: '',
    address: '',
    postcode: '',
    date: '',
    time: ''
  })

  const [showResult, setShowResult] = useState(false)

  const updateZipcodeMain = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ ...zipcode, main: e.target.value })
  }
  const updateZipcodeSub = async (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ ...zipcode, sub: e.target.value })
    if (e.target.value.length === 4 && zipcode.main.length === 3) {
      try {
        const res = await axios.get(
          "https://zipcloud.ibsnet.co.jp/api/search",
          {
            params: {
              zipcode: zipcode.main + e.target.value
            }
          }
        )
        if (res.data.results) {
          const result = res.data.results[0]
          setInputs(values => ({ ...values, 'address': result["address1"] + result["address2"] + result["address3"] }))
        }
      } catch {
        alert("住所の取得に失敗しました。")
      }
    }
  }

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async () => {
    setShowResult(!showResult)
  }

  return (
    <>
      <Header />

      {
        showResult ? <div className='result-container'><h1 className='result'>投稿しました ✅</h1></div> :
          <div className='container'>
            <h1>口コミ投稿</h1>
            <div className='form-container'>
              <label className='label'>郵便番号</label><br />
              <div className='form-flex'>
                <input className="form-input" type="text" onChange={updateZipcodeMain} value={zipcode.main} />
                <span className='form-hyphen'> - </span>
                <input className="form-input" type="text" onChange={updateZipcodeSub} value={zipcode.sub} />
              </div>
            </div><div className='form-container'>
              <label className='label'>
                住所
              </label><br />
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="form-input" />
            </div><div className='form-container'>
              <label className='label'>日付</label><br />
              <input type="date" name="date" value={inputs.date}
                onChange={handleChange}
                className="form-input" />
            </div><div className='form-container'>
              <label className='label'>時刻</label><br />
              <input type="time" name="time" value={inputs.time}
                onChange={handleChange}
                className="form-input" />
            </div><div className='form-container'>
              <label className='label'>
                カテゴリ
              </label><br />
              <input
                type="text"
                name="category"
                value={inputs.category}
                onChange={handleChange}
                className="form-input" />
            </div><div className='form-container'>
              <label className='label'>
                内容
              </label><br />
              <textarea
                name="content"
                value={inputs.content}
                onChange={handleChange}
                className="form-input-textarea" />
            </div><button className='submit' onClick={handleSubmit}>送信</button>
          </div>}
    </>
  )
}

export default Content
