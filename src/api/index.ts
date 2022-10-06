import axios from "axios"
import { NavigateFunction } from "react-router-dom"

const CLIENT_ID = '430416577043-vaudgfur0pdk5qqc1bmrfchuuf5cgkcv.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REFRESH_TOKEN = '1//0ejQEdwBJDx_uCgYIARAAGA4SNwF-L9Irw8w44X-7S4kYaW84_Ra2ae7t8f0KdwmOsVUB9QjOCpJZWxaPaIp7bsfkio69JR0ebFA'
const SCRIPT_ID = 'AKfycbwSwQqMJSMjA3GT7mcr7celmHDXy4QV8pasL45mQsMvfIMjeYIHqNdLS87pCiv5nQuN'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'

/**
 * アクセストークンを取得する関数
 * @return string
 */
const getAccessToken = async () => {
  const payload = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }
  // リクエスト
  const response = await axios.post(TOKEN_URL, payload)
  if (response.status !== 200 || !response.data) {
    throw new Error('Failed to get access token.')
  }
  const accessToken = response.data.access_token
  return accessToken
}

/**
 * @return string
 */
export const postPreview = async (parameters: any, navigate: NavigateFunction) => {
  try {
    // アクセストークンを取得する
    const accessToken = await getAccessToken()
    // GASを実行
    const url = `https://script.googleapis.com/v1/scripts/${SCRIPT_ID}:run`
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }
    const payload = {
      function: 'doGet',
      parameters,
    }
    // リクエスト
    const instance = await axios.create({ headers })
    const response = await instance.post(url, payload) as any
    if (response.data.response['@type'].includes('error')) {
      throw new Error()
    } else {
      navigate('/?success')
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
