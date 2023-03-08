import './Request.scss'
import Header from './Header'

const Content = () => {
  return (
    <>
      <Header />
      <iframe
        className="container"
        src="https://docs.google.com/forms/d/e/1FAIpQLSeixO3ABTkGJ_fRZeIPSjLzVT2QyAX_MXnyvt-eKdEbEmSpjQ/viewform?embedded=true"
        width="100%"
        height="100%"
      >
        Loading…
      </iframe>
    </>
  )
}

export default Content
