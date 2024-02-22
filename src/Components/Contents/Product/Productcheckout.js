import { useState, useContext, useEffect, } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { UserContext } from "../../../UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js"
function Productcheckout() {
  const [getItem, setItem] = useState("")
  const { getCart, setCart } = useContext(UserContext)
  const [getOption, setOption] = useState(1)
  const getdataCartItem = JSON.parse(localStorage.getItem("CartItem"))
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  const { gettotalorder, settotalorder } = useContext(UserContext)
  const [getcheckBox, setcheckBox] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [checkpaypal, setpaypal] = useState(false)
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    street: "",
    phone: "",
    email: "",
    note: ""
  })
  useEffect(() => {
    const getDataUser = JSON.parse(localStorage.getItem("User"))
    const getdataCartItem = JSON.parse(localStorage.getItem("CartItem"))
    setInputs({
      email: getDataUser?.user?.email,
      firstname: getDataUser?.user?.firstname,
      lastname: getDataUser?.user?.lastname,
      phone: getDataUser?.user?.phone,
      street: getDataUser?.user?.address
    })
    axios.get("http://localhost:8000/products")
      .then(response => {
        setItem(response.data.mess)
      })
      .catch(function (error) {
        console.log(error)
      })
    if (checkpaypal) {
      let accessToken = getDataUser.token
      let config = {
        headers: {
          'token': 'bearer ' + accessToken,
        }
      }
      const body = []

      for (const key in getdataCartItem) {
        body.push({
          pid: key,
          quatity: getdataCartItem[key],
          address: inputs.street,
          coupon: location?.state?.couponPrice,
          payment: getOption == 2 && 'Chuyển khoản'
        })
      }

      axios.post('http://localhost:8000/orders/placeOrders', body, config)
        .then(res => {
          navigate("/")
          setCart("")
          localStorage.removeItem("CartItem")
        })
    }
  }, [checkpaypal])
  function fetchData() {
    if (getItem.length > 0) {
      return getItem.map((value, key) => {
        if (getdataCartItem != null) {
          return Object.keys(getdataCartItem).map((key1, index) => {
            if (value._id == key1) {
              const gettong = parseInt(getdataCartItem[key1] * value.price)
              return (
                <tr className="cart-item">
                  <td className="product-name">{value.title} <span className="product-quantity">× {getdataCartItem[key1]}</span></td>
                  <td className="product-total">{Intl.NumberFormat().format(gettong)}</td>
                </tr>
              )
            }
          })
        }
      })
    }
  }
  function handleCheckBox() {
    setcheckBox(!getcheckBox)
  }
  function handleSubmit(e) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let flag = true
    let errorSubmit = {}
    if (inputs.email == "") {
      errorSubmit.email = "Vui long nhập email"
      flag = false
      toast.error("" + errorSubmit.email);
    } else {
      if (!regex.test(inputs.email)) {
        errorSubmit.email = "Nhập dung dinh dang"
      }
    }
    if (inputs.street == undefined) {
      errorSubmit.street = "Nhập street"
      flag = false
      toast.error("" + errorSubmit.street);
    }
    if (inputs.phone == "") {
      errorSubmit.phone = "Nhập phone"
      flag = false
      toast.error("" + errorSubmit.phone);
    }
    if (inputs.firstname == "") {
      errorSubmit.firstname = "Nhập firstname"
      flag = false
      toast.error("" + errorSubmit.firstname);
    }
    if (inputs.lastname == "") {
      errorSubmit.lastname = "Nhập lastname"
      flag = false
      toast.error("" + errorSubmit.lastname);
    }
    if (getcheckBox == false) {
      flag = false
      toast.error("Hãy đồng ý với các điều khoản");
    }
    if (flag) {
      // TO DO ORDER 
      if (getOption === 1) {
        let accessToken = getDataUser.token
        let config = {
          headers: {
            'token': 'bearer ' + accessToken,
          }
        }
        const body = [];
        for (const key in getdataCartItem) {
          body.push({
            pid: key,
            quatity: getdataCartItem[key],
            coupon: location?.state?.couponPrice,
            address: inputs.street
          });
        }
        axios.post('http://localhost:8000/orders/placeOrders', body, config)
          .then(res => {
            toast.success(res.data.mess)
            localStorage.removeItem("CartItem")
            navigate("/")
            setCart("")
          })
          .catch(err => {
            console.log('err')
          })
      }
    }
  }
  const handleChangeOption = (e) => {
    setOption(e)

  }
  const handleInput = (e) => {
    const nameInput = e.target.name
    const value = e.target.value
    setInputs(state => ({ ...state, [nameInput]: value }))
  }
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <nav aria-label="breadcrumb" className="breadcrumb-style1">
        <div className="container">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
          </ol>
        </div>
      </nav>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Shopping Checkout Area Wrapper ==*/}
      <section className="shopping-checkout-wrap section-space">
        <div className="container">
          <div className="checkout-page-coupon-wrap">
            {/*== Start Checkout Coupon Accordion ==*/}
            <div className="coupon-accordion" id="CouponAccordion">
              <div className="card">
                <h3>
                  <i className="fa fa-info-circle" />
                  Have a Coupon?
                  <a href="#/" data-bs-toggle="collapse" data-bs-target="#couponaccordion">Click here to enter your code</a>
                </h3>
                <div id="couponaccordion" className="collapse" data-bs-parent="#CouponAccordion">
                  <div className="card-body">
                    <div className="apply-coupon-wrap">
                      <p>If you have a coupon code, please apply it below.</p>
                      <form action="#" method="post">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input className="form-control" type="text" placeholder="Coupon code" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <button type="button" className="btn-coupon">Apply coupon</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*== End Checkout Coupon Accordion ==*/}
          </div>
          <div className="row">
            <div className="col-lg-6">
              {/*== Start Billing Accordion ==*/}
              <div className="checkout-billing-details-wrap">
                <h2 className="title">Billing details</h2>
                <div className="billing-form-wrap">
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="f_name">First name <abbr className="required" title="required">*</abbr></label>
                          <input id="f_name" type="text" className="form-control" name="firstname" onChange={handleInput} defaultValue={inputs.firstname} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="l_name">Last name <abbr className="required" title="required">*</abbr></label>
                          <input id="l_name" type="text" className="form-control" name="lastname" onChange={handleInput} defaultValue={inputs.lastname} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="street-address">Street address <abbr className="required" title="required">*</abbr></label>
                          <input id="street-address" type="text" className="form-control" placeholder="House number and street name" defaultValue={inputs.street} name="street" onChange={handleInput} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="phone">Phone <abbr className="required" title="required">*</abbr></label>
                          <input id="phone" type="text" className="form-control" name="phone" onChange={handleInput} defaultValue={inputs.phone} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Email address <abbr className="required" title="required">*</abbr></label>
                          <input id="email" type="text" className="form-control" name="email" onChange={handleInput} defaultValue={inputs.email} readOnly />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-0">
                          <label htmlFor="order-notes">Order notes (optional)</label>
                          <textarea id="order-notes" className="form-control" placeholder="Notes about your order, e.g. special notes for delivery." defaultValue={""} name="note" onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/*== End Billing Accordion ==*/}
            </div>
            <div className="col-lg-6">
              {/*== Start Order Details Accordion ==*/}
              <div className="checkout-order-details-wrap">
                <div className="order-details-table-wrap table-responsive">
                  <h2 className="title mb-25">Your order</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-name">Product</th>
                        <th className="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {fetchData()}
                    </tbody>
                    <tfoot className="table-foot">
                      {/* <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td>{Intl.NumberFormat().format(location.state.gettong1)}</td>
                      </tr> */}
                      <tr className="shipping">
                        <th>Giảm giá</th>
                        <td>{Intl.NumberFormat().format(location.state.couponPrice ? location.state.couponPrice * 100 : "0")} %</td>
                      </tr>
                      <tr className="order-total">
                        <th>Total </th>
                        <td>{Intl.NumberFormat().format(location.state.gettong1)}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="shop-payment-method">
                    <div id="PaymentMethodAccordion">
                      <div className="card" onClick={() => handleChangeOption(1)}>
                        <div className="card-header" id="check_payments">
                          <h5 className="title" value="1" data-bs-toggle="collapse" data-bs-target="#itemOne" aria-controls="itemOne" aria-expanded="true">Cash on Delivery</h5>
                        </div>
                        <div id="itemOne" className="collapse show" aria-labelledby="check_payments" data-bs-parent="#PaymentMethodAccordion">
                        </div>
                      </div>
                      <div className="card" onClick={() => handleChangeOption(2)}>
                        <div className="card-header" id="check_payments4">
                          <h5 className="title" data-bs-toggle="collapse" data-bs-target="#itemFour" aria-controls="itemTwo" aria-expanded="false" >Direct bank transfer</h5>
                        </div>
                        {getOption === 2 && getDataUser ?
                          <PayPalButtons style={{
                            color: "silver",
                            layout: "horizontal",
                            height: 48,
                            tagline: false,
                            shape: "pill",
                          }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    description: "Purchase from your website",
                                    amount: {
                                      value: (location.state.gettong1 / +23000).toFixed(2),
                                    },
                                  },
                                ],
                              })
                            }}
                            onApprove={async (data, actions) => {
                              const order = await actions.order.capture();
                              setpaypal(true)
                              console.log(order)
                              toast.success("Thanh toán thành công");
                            }}
                            onCancel={() => { }}
                            onError={() => {
                            }}
                          /> : ""
                        }
                        <div id="itemFour" className="collapse" aria-labelledby="check_payments4" data-bs-parent="#PaymentMethodAccordion">
                        </div>
                      </div>
                    </div>
                    <p className="p-text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#/">privacy policy.</a></p>
                    <div className="agree-policy">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" id="privacy" className="custom-control-input visually-hidden" onClick={handleCheckBox} />
                        <label htmlFor="privacy" className="custom-control-label">I have read and agree to the website terms and conditions <span className="required">*</span></label>
                      </div>
                    </div>
                    {getOption !== 2 ?
                      <a className="btn-place-order" onClick={handleSubmit} type="submit">Place order</a>
                      : ""
                    }
                  </div>
                </div>
              </div>
              {/*== End Order Details Accordion ==*/}
            </div>
          </div>
        </div>
      </section>
      {/*== End Shopping Checkout Area Wrapper ==*/}
    </>
  )
}
export default Productcheckout