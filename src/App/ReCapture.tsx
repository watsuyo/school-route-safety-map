import { useRef } from 'react'
import GoogleReCaptcha from 'react-google-recaptcha'

export const ReCapture = () => {
  const recaptchaRef = useRef<GoogleReCaptcha>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync()
      console.log('Token:', token)
    }
  }

  return (
    <GoogleReCaptcha
      sitekey='p6LeYSyclAAAAAPyz76wPLdKBn1AMdeyDpxMUXeF0'
      ref={recaptchaRef}
      onChange={handleSubmit}
    />
  )
}
