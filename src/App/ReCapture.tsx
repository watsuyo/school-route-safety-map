import { Dispatch, SetStateAction, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  useIsHuman: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const ReCapture = (props: Props) => {
  const captchaDemo = useRef<ReCAPTCHA>(null)
  const [_, setIsHuman] = props.useIsHuman

  const onChange = () => {
    setIsHuman(true)
  }

  return (
    <div>
      <ReCAPTCHA
        ref={captchaDemo}
        sitekey="6LdTUCslAAAAAPTi3kxAQKMEpvJYYDwIw3WTntJ3"
        onChange={onChange}
      />
    </div>
  )
}
