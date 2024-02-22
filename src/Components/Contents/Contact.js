import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function Contact() {
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      email,
      text
    }

    axios.post('http://localhost:8000/users/contact', body)
      .then(res => {
        setEmail('')
        setText('')
        toast.success(res.data.mess)
      })
      .catch(err => {
        toast.error('Gửi thất bại')
      })
  }

  return (
    <>
      {/*== Start Contact Area Wrapper ==*/}
      <section className="contact-area">
        <div className="container">
          <div className="row">
            <div className="offset-lg-6 col-lg-6">
              <div className="section-title position-relative">
                <h2 className="title">Get in touch</h2>
                <p className="m-0">Nếu có vấn đề gì thắc mắc thì làm ơn để lại thông tin dưới đây ! Chúng tôi sẽ sớm liên lạc lại với bạn </p>
                <div className="line-left-style mt-4 mb-1" />
              </div>
              {/*== Start Contact Form ==*/}
              <div className="contact-form">
                <form id="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input type='email' value={email} onChange={e => { setEmail(e.target.value) }} className="form-control" name="con_email" placeholder="Email address" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea onChange={e => { setText(e.target.value) }} value={text} className="form-control" required name="con_message" placeholder="Message" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-0">
                        <button className="btn btn-sm" onClick={e => handleSubmit(e)}>SUBMIT</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/*== End Contact Form ==*/}
              {/*== Message Notification ==*/}
              <div className="form-message" />
            </div>
          </div>
        </div>
        <div className="contact-left-img">
          <img src="https://th.bing.com/th/id/R.9a010f486641ab58759bcf742cf3c586?rik=jR%2btvB7z1qXrZw&riu=http%3a%2f%2fboxmedia.ie%2fwp-content%2fuploads%2f2015%2f11%2fContact1.jpg&ehk=WU3iQF%2b1SB7B9vSZZyU106NnD3gVlsfS5mz7M89kYFk%3d&risl=&pid=ImgRaw&r=0" />
        </div>
      </section>
      {/*== End Contact Area Wrapper ==*/}
      {/*== Start Contact Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="contact-info">
            <div className="contact-info-item">
              <img className="icon" src="assets/images/icons/1.webp" width={30} height={30} alt="Icon" />
              <a href="tel://+11020303023">+11 0203 03023</a>
              <a href="tel://+11020303023">+11 0203 03023</a>
            </div>
            <div className="contact-info-item">
              <img className="icon" src="assets/images/icons/2.webp" width={30} height={30} alt="Icon" />
              <a href="mailto://example@demo.com">example@demo.com</a>
              <a href="mailto://demo@example.com">demo@example.com</a>
            </div>
            <div className="contact-info-item mb-0">
              <img className="icon" src="assets/images/icons/3.webp" width={30} height={30} alt="Icon" />
              <p>Sunset Beach, North Carolina(NC), 28468</p>
            </div>
          </div>
        </div>
      </section>
      {/*== End Contact Area Wrapper ==*/}
      <div className="map-area">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d802879.9165497769!2d144.83475730949783!3d-38.180874157285366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sbd!4v1636803638401!5m2!1sen!2sbd" />
      </div>
    </>
  )
}
export default Contact