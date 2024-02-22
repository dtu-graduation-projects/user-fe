import axios from "axios"
import { useState, useContext, useEffect, } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../UserContext";
function Register() {
  const { getvalueaorefresh, setvalueaorefresh } = useContext(UserContext)
  const [inputs, setInputs] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    rePassword: ""
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
  // function isValidEmail(email) {
  //       // Regular expression pattern for email validation
  //       var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;        
  //       // Test the input email against the pattern
  //       return emailPattern.test(email);
  //     }        
  //     // Usage example
  //     var email = "example@example.com";
  //     if (isValidEmail(email)) {
  //       console.log("Valid email address");
  //     } else {
  //       console.log("Invalid email address");
  //     }
  function handleSubmit(e) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    e.preventDefault()
    let errorSubmit = {}
    let flag = true
    if (inputs.email == "") {
      errorSubmit.email = "Vui long nhap email"
      flag = false
      toast.error("" + errorSubmit.email);
    } else {
      if (!regex.test(inputs.email)) {
        errorSubmit.email = "Nhap dung dinh dang"
      }
    }
    if (inputs.password == "") {
      errorSubmit.password = "Vui long nhap pass"
      flag = false
      toast.error("" + errorSubmit.password);
    } else if (inputs.password != inputs.rePassword) {
      errorSubmit.password = "Pass phai giong nhau"
      flag = false
      toast.error("" + errorSubmit.password);
    }
    if (inputs.rePassword == "") {
      errorSubmit.rePassword = "Vui long nhap lai pass"
      flag = false
      toast.error("" + errorSubmit.rePassword);
    }
    if (inputs.phone == "") {
      errorSubmit.phone = "Nhap phone"
      flag = false
      toast.error("" + errorSubmit.phone);
    }
    if (inputs.firstname == "") {
      errorSubmit.firstname = "Nhap firstname"
      flag = false
      toast.error("" + errorSubmit.firstname);
    }
    if (inputs.lastname == "") {
      errorSubmit.lastname = "Nhap lastname"
      flag = false
      toast.error("" + errorSubmit.lastname);
    }
    if (!flag) {
      setErrors(errorSubmit)
    }
    if (flag) {
      const data = {
        email: inputs.email,
        password: inputs.password,
        rePassword: inputs.rePassword,
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        phone: inputs.phone
      }
      axios.post("http://localhost:8000/auth/register", data)
        .then((res) => {
          toast.success("Đăng Ký Thành Công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.mess)
          }
        })
    }
  }
  return (
    <div className="my-account-item-wrap">
      <h3 className="title">Register</h3>
      <div className="my-account-form">
        <form action="#" onSubmit={handleSubmit} encType="multipart/form-data" >
          <div className="form-group mb-6">
            <label htmlFor="register_username">Email Address <sup>*</sup></label>
            <input type="email" id="register_username" name="email" onChange={handleInput} />
            {errors.email}
          </div>
          <div className="form-group mb-6">
            <label htmlFor="register_pwsd">Password <sup>*</sup></label>
            <input type="password" id="register_pwsd" name="password" onChange={handleInput} />
            {errors.password}
          </div>
          <div className="form-group mb-6">
            <label htmlFor="register_pwsd">Repassword <sup>*</sup></label>
            <input type="password" id="register_repwsd" name="rePassword" onChange={handleInput} />
            {errors.rePassword}
          </div>
          <div className="form-group mb-6">
            <label htmlFor="register_username">First name<sup>*</sup></label>
            <input type="text" id="register_firstname" name="firstname" onChange={handleInput} />
            {errors.firstname}
          </div>
          <div className="form-group mb-6">
            <label htmlFor="register_username">Last name<sup>*</sup></label>
            <input type="text" id="register_lastname" name="lastname" onChange={handleInput} />
            {errors.lastname}
          </div>
          <div className="form-group mb-6">
            <label htmlFor="register_username">Phone<sup>*</sup></label>
            <input type="phone" id="register_phone" name="phone" onChange={handleInput} />
            {errors.phone}
          </div>
          <div className="form-group">
            <p className="desc mb-4">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
            <button type="submit" className="btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register