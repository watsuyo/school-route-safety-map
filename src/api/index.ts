import axios from "axios"
import { NavigateFunction } from "react-router-dom"

const CLIENT_ID = '430416577043-vaudgfur0pdk5qqc1bmrfchuuf5cgkcv.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REFRESH_TOKEN = '1//0ejQEdwBJDx_uCgYIARAAGA4SNwF-L9Irw8w44X-7S4kYaW84_Ra2ae7t8f0KdwmOsVUB9QjOCpJZWxaPaIp7bsfkio69JR0ebFA'
const SCRIPT_ID = 'AKfycbwnv-EH1C95J6wSjfRpV28c3D-WE80NR2KVD-edX7zJauR0AYVZN95wXZfNxOsopZWq'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'

const URL = `https://script.googleapis.com/v1/scripts/${SCRIPT_ID}:run`

const getHeaders = async () => {
  const accessToken = await getAccessToken()
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}

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
    const payload = {
      function: 'postUserPost',
      parameters,
    }
    const headers = await getHeaders()
    const instance = await axios.create({ headers })
    const response = await instance.post(URL, payload) as any
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

export const getSafetyData = async () => {
  try {
    const payload = {
      function: 'getSafetyData',
    }
    const headers = await getHeaders()
    const instance = await axios.create({ headers })
    const response = await instance.post(URL, payload) as any
    if (response.data.response['@type'].includes('error')) {
      throw new Error()
    } else {
      return response.data.response.result
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const postLike = async (parameters: any) => {
  try {
    const payload = {
      function: 'postLike',
      parameters,
    }
    const headers = await getHeaders()
    const instance = await axios.create({ headers })
    const response = await instance.post(URL, payload) as any
    if (response.data.response['@type'].includes('error')) {
      throw new Error()
    } else {
      return response.data.response.result
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const postUnlike = async (parameters: any) => {
  try {
    const payload = {
      function: 'postUnlike',
      parameters,
    }
    const headers = await getHeaders()
    const instance = await axios.create({ headers })
    const response = await instance.post(URL, payload) as any
    if (response.data.response['@type'].includes('error')) {
      throw new Error()
    } else {
      return response.data.response.result
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
