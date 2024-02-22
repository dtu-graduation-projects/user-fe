import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../UserContext";
import { useState, useContext, useEffect, } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
function Myaccount(props) {
  const [getOrders, setOrders] = useState("")
  const [getRemainPassword, setRemainPassword] = useState("")
  const [getPassword, setPassword] = useState("")

  const handleChangePass = (e) => {
    e.preventDefault()
    let accessToken = getDataUser?.token
    const data = {
      oldPassword: getRemainPassword,
      newPassword: getPassword
    }
    let config = {
      headers: {
        'token': 'Bearer ' + accessToken,
      }
    }
    axios.post("http://localhost:8000/auth/change-password", data, config)
      .then(response => {
        console.log(response)
        toast.success(response.data.mess)
        localStorage.clear()
        setTimeout(() => {
          navigate("/account")
          window.location.reload()
        }, 3000);
      })
      .catch(function (error) {
        console.log(error)
        toast.error("Đổi mật khẩu thất bại")
      })
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    const getDataUser = JSON.parse(localStorage.getItem("User"))
    setInputs({
      email: getDataUser?.user?.email,
      firstname: getDataUser?.user?.firstname,
      lastname: getDataUser?.user?.lastname,
      phone: getDataUser?.user?.phone,
      address: getDataUser?.user?.address
    })
    let accessToken = getDataUser?.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken,
      }
    }
    axios.get("http://localhost:8000/orders", config)
      .then(response => {
        const result = response.data.order.filter(e => (e.orderBy.email.includes(getDataUser?.user?.email)))
        setOrders(result)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  const { getvalueaorefresh, setvalueaorefresh } = useContext(UserContext)
  const navigate = useNavigate()
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    phone: "",
    firstname: "",
    lastname: "",
    address: ""
  })
  const handleSaveChange = (e) => {
    e.preventDefault()
    console.log(inputs.firstname)
    let url = "http://localhost:8000/users/update-user"
    let accessToken = getDataUser?.token
    let config = {
      headers: {
        'token': 'baerer ' + accessToken,
      }
    }
    const data = {
      email: inputs.email,
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      phone: inputs.phone,
      address: inputs.address
    }
    axios.put(url, data, config)
      .then(response => {
        console.log(response.data.data)
        toast.success("Update thông tin thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const user = {
          user: response.data.data
        }
        localStorage.setItem("User", JSON.stringify(user))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleInput = (e) => {
    const nameInput = e.target.name
    const value = e.target.value
    setInputs(state => ({ ...state, [nameInput]: value }))
  }
  const logout = (e) => {
    if (getDataUser != null) {
      localStorage.clear()
      toast.success("Logout thành công")
      navigate("/")
      // window.location.reload()
      setvalueaorefresh("ok1")
    } else {
      toast.error("Bạn phải đăng nhập trước");
      navigate("/account")
    }
  }
  function fetchDataOrder() {
    if (getOrders.length > 0) {
      return getOrders.map((value, key) => {
        if (value?.orderBy?.email == getDataUser?.user?.email) {
          const i = 0
          return (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{new Date(value?.updatedAt).toDateString()}</td>
              <td>{value.status}</td>
              <td>{Intl.NumberFormat().format(value.total)} VNĐ</td>
              <td>{value.payments}</td>
              <td><Link to={`/order/${+key + 1}`} state={{ data: value }} ><a className="check-btn sqr-btn ">View</a></Link></td>
            </tr>
          )
        }
      })
    }
  }
  const createBlog = (e) => {
    navigate("/createblog")
  }
  const onClickwishlist = (e) => {
    navigate("/wishlist")
  }
  return (
    <>
      <ToastContainer />
      {/*== Start Page Header Area Wrapper ==*/}
      <section className="page-header-area pt-10 pb-9" data-bg-color="#FFF3DA">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="page-header-st3-content text-center text-md-start">
                <ol className="breadcrumb justify-content-center justify-content-md-start">
                  <li className="breadcrumb-item"><a className="text-dark" href="index.html">Home</a></li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">My Account</li>
                </ol>
                <h2 className="page-header-title">My Account</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start My Account Area Wrapper ==*/}
      <section className="my-account-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="my-account-tab-menu nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="dashboad-tab" data-bs-toggle="tab" data-bs-target="#dashboad" type="button" role="tab" aria-controls="dashboad" aria-selected="true">Dashboard</button>
                <button className="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="false"> Orders</button>
                <button className="nav-link" id="address-edit-tab" data-bs-toggle="tab" data-bs-target="#address-edit" type="button" role="tab" aria-controls="address-edit" aria-selected="false">Password Change</button>
                <button className="nav-link" id="account-info-tab" data-bs-toggle="tab" data-bs-target="#account-info" type="button" role="tab" aria-controls="account-info" aria-selected="false">Account Details</button>
                {getDataUser?.user?.role === "admin" ?
                  <button className="nav-link" id="create-blog-tab" onClick={createBlog} >Create Blog</button>
                  : ""}
                <button className="nav-link" id="wishlist-tab" onClick={onClickwishlist} >Wishlist</button>
                <button className="nav-link" onClick={logout} type="button">Logout</button>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="dashboad" role="tabpanel" aria-labelledby="dashboad-tab">
                  <div className="myaccount-content">
                    <h3>Dashboard</h3>
                    <div className="welcome">
                      <p>Hello, <strong>{getDataUser?.user?.firstname} {getDataUser?.user?.lastname}</strong> (If Not <strong>{getDataUser?.user?.firstname} {getDataUser?.user?.lastname} !</strong><a onClick={logout} className="logout"> Logout</a>)</p>
                    </div>
                    <p>From your account dashboard. you can easily check &amp; view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
                  </div>
                </div>
                <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                  <div className="myaccount-content">
                    <h3>Orders</h3>
                    <div className="myaccount-table table-responsive text-center">
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Method</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fetchDataOrder()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="download" role="tabpanel" aria-labelledby="download-tab">
                  <div className="myaccount-content">
                    <h3>Downloads</h3>
                    <div className="myaccount-table table-responsive text-center">
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th>Product</th>
                            <th>Date</th>
                            <th>Expire</th>
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Haven - Free Real Estate PSD Template</td>
                            <td>Aug 22, 2018</td>
                            <td>Yes</td>
                            <td><a href="#/" className="check-btn sqr-btn"><i className="fa fa-cloud-download" /> Download File</a></td>
                          </tr>
                          <tr>
                            <td>HasTech - Profolio Business Template</td>
                            <td>Sep 12, 2018</td>
                            <td>Never</td>
                            <td><a href="#/" className="check-btn sqr-btn"><i className="fa fa-cloud-download" /> Download File</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="payment-method" role="tabpanel" aria-labelledby="payment-method-tab">
                  <div className="myaccount-content">
                    <h3>Payment Method</h3>
                    <p className="saved-message">You Can't Saved Your Payment Method yet.</p>
                  </div>
                </div>
                <div className="tab-pane fade" id="address-edit" role="tabpanel" aria-labelledby="address-edit-tab">
                  <div className="myaccount-content">
                    <h3>Account Details</h3>
                    <div className="account-details-form">
                      <form action="#">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="first-name" className="required">Remain password</label>
                              <input type="password" id="remain-password" value={getRemainPassword} onChange={e => { setRemainPassword(e.target.value) }} />
                            </div>
                            <div className="single-input-item">
                              <label htmlFor="first-name" className="required">New password</label>
                              <input type="password" id="password" value={getPassword} onChange={e => { setPassword(e.target.value) }} />
                            </div>
                          </div>
                        </div>
                        <div className="single-input-item">
                          <button className="check-btn sqr-btn" onClick={handleChangePass}>Save Changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-info" role="tabpanel" aria-labelledby="account-info-tab">
                  <div className="myaccount-content">
                    <h3>Account Details</h3>
                    <div className="account-details-form">
                      <form action="#">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="first-name" className="required">First Name</label>
                              <input type="text" name="firstname" id="first-name" defaultValue={inputs.firstname} onChange={handleInput} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="last-name" className="required">Last Name</label>
                              <input type="text" name="lastname" id="last-name" defaultValue={inputs.lastname} onChange={handleInput} />
                            </div>
                          </div>
                        </div>
                        <div className="single-input-item">
                          <label htmlFor="display-name" className="required">Display Name</label>
                          <input type="text" id="display-name" defaultValue={getDataUser?.user?.firstname + " " + getDataUser?.user?.lastname} readOnly></input>
                        </div>
                        <div className="single-input-item">
                          <label htmlFor="email" className="required">Email Addres</label>
                          <input type="text" id="email" value={inputs?.email} readOnly />
                        </div>
                        <div className="single-input-item">
                          <label htmlFor="phone" className="required">Phone</label>
                          <input type="number" name="phone" id="phone" value={inputs?.phone} onChange={handleInput} />
                        </div>
                        <div className="single-input-item">
                          <label htmlFor="address" className="required">Address</label>
                          <input type="text" name="address" id="address" defaultValue={inputs?.address} onChange={handleInput} />
                        </div>
                        <div className="single-input-item">
                          <button className="check-btn sqr-btn" onClick={handleSaveChange}>Save Changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End My Account Area Wrapper ==*/}
    </>
  )
}
export default Myaccount