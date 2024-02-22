import { useState, useContext, useEffect, } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { UserContext } from "../../../UserContext";
function Login() {
  const { getvalueaorefresh, setvalueaorefresh } = useContext(UserContext)
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const handleInput = (e) => {
    const nameInput = e.target.name
    const value = e.target.value
    setInputs(state => ({ ...state, [nameInput]: value }))
  }
  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return (
          <p key={index}>{errors[key]}</p>
        )
      })
    }
  }
  function handleSubmit(e) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    e.preventDefault()
    let errorSubmit = {}
    let flag = true
    if (inputs.email == "") {
      errorSubmit.email = "Vui long nhap email"
      flag = false
      toast.error("" + errorSubmit.email);
    }
    if (inputs.password == "") {
      errorSubmit.pass = "Vui long nhap pass"
      flag = false
      toast.error("" + errorSubmit.pass);
    }
    if (!flag) {
      setErrors(errorSubmit)
    }
    if (flag) {
      const data = {
        email: inputs.email,
        password: inputs.password
      }
      axios.post("http://localhost:8000/auth/login", data)
        .then((res) => {
          const user = {
            user: res.data.user,
            token: res.data.access_token
          }
          localStorage.setItem("User", JSON.stringify(user))
          toast.success("Đăng Nhập Thành Công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/")
          setvalueaorefresh("ok2")
          // window.location.reload()
        })
        .catch((res) => {
          alert(res.response.data.mess)
        })
    }
  }
  return (
    <div className="my-account-form">
      <form action="#" method="post" onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label htmlFor="login_username">Email Address <sup>*</sup></label>
          <input type="email" id="login_username" name="email" onChange={handleInput} />
          {errors.email}
        </div>
        <div className="form-group mb-6">
          <label htmlFor="login_pwsd">Password <sup>*</sup></label>
          <input type="password" id="login_pwsd" name="password" onChange={handleInput} />
          {errors.pass}
        </div>
        <div className="form-group d-flex align-items-center mb-14">
          <button className="btn">Login</button>
        </div>
        <a className="lost-password" href="/forgot-password">Lost your Password?</a>
      </form>
    </div>
  )
}
export default Login