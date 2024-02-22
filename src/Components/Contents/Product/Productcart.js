import axios from "axios"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../UserContext"
import { toast } from "react-toastify"
function Productcart() {
  const [getItem, setItem] = useState("")
  const getdataCartItem = JSON.parse(localStorage.getItem("CartItem"))
  const [valueao, setvalueao] = useState("valueao")
  const [coupon, setCoupon] = useState('')
  const [couponValue, setCouponValue] = useState('')
  const [couponPrice, setCouponPrice] = useState()
  const getDataUser = JSON.parse(localStorage.getItem("User"))
  const { gettotalorder, settotalorder } = useContext(UserContext)
  var gettong1 = 0
  var gettong2 = 0
  const getMang = []
  useEffect(() => {
    axios.get('http://localhost:8000/coupons')
      .then(res => {
        setCoupon(res.data.coupon)
        console.log(res.data.coupon)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])
  const handleChangeInput = (e) => {
    let main = {}
    let nameInput = e.target.id
    let value = +e.target.value
    let test1 = localStorage.getItem("CartItem")
    if (getItem.length > 0) {
      return getItem.map((value1, key) => {
        if (nameInput == value1._id) {
          if (value < 1) {
            value = 1
            toast.error("Số lượng sản phẩm không thể nhỏ hơn 1 ")
          } else if (value < value1.quantity + 1) {
            if (test1) {
              main = JSON.parse(test1)
              for (var key in main) {
                if (nameInput == key) {
                  localStorage.setItem("CartItem", JSON.stringify(main))
                  setvalueao(main)
                }
              }
            }
            main[nameInput] = value
            localStorage.setItem("CartItem", JSON.stringify(main))
            setvalueao(main)
          } else {
            value = value1.quantity
            toast.error("Số lượng sản phẩm quá lớn,giới hạn của sản phẩm này là : " + value1.quantity)
          }
        }
      })
    }
  }
  const deleteItem = (e) => {
    e.preventDefault()
    if (Object.keys(getdataCartItem).length > 0) {
      return Object.keys(getdataCartItem).map((key2, index2) => {
        if (e.target.id == key2) {
          delete getdataCartItem[key2]
          localStorage.setItem("CartItem", JSON.stringify(getdataCartItem))
          setvalueao(getdataCartItem)
        }
      })
    }
  }
  useEffect(() => {
    axios.get("http://localhost:8000/products")
      .then(response => {
        setItem(response.data.mess)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [valueao])
  const increaseqty = (e) => {
    if (Object.keys(getdataCartItem).length > 0) {
      return Object.keys(getdataCartItem).map((value, key) => {
        if (e.target.id == value) {
          getdataCartItem[value]++
          localStorage.setItem("CartItem", JSON.stringify(getdataCartItem))
          setvalueao(getdataCartItem)
        }
      })
    }
  }
  const decreaseqty = (e) => {
    if (Object.keys(getdataCartItem).length > 0) {
      return Object.keys(getdataCartItem).map((value, key) => {
        if (e.target.id == value) {
          getdataCartItem[value]--
          localStorage.setItem("CartItem", JSON.stringify(getdataCartItem))
          setvalueao(getdataCartItem)
          if (getdataCartItem[value] == 0) {
            delete getdataCartItem[value]
            localStorage.setItem("CartItem", JSON.stringify(getdataCartItem))
            setvalueao(getdataCartItem)
          }
        }
      })
    }
  }
  const handleCoupon = () => {
    let accessToken = getDataUser.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken,
      }
    }
    const body = {
      pid: Object.keys(getdataCartItem).join(''),
      coupon: couponValue
    }
    axios.post('http://localhost:8000/coupons/apply-coupon', body, config)
      .then(res => {
        setCouponPrice(res.data.couponPrice)
      })
      .catch(err => {
        console.log(err)
      })

  }

  function fetchData() {
    if (getItem?.length > 0) {
      return getItem?.map((value, key) => {
        if (getdataCartItem != null) {
          return Object.keys(getdataCartItem).map((key1, index) => {
            if (value._id == key1) {
              getMang.push(value)
              const gettong = parseInt(getdataCartItem[key1] * value.price)
              {
                couponPrice
                  ? gettong1 += gettong - (gettong * couponPrice)
                  : gettong1 += gettong
              }
              gettong2 += gettong
              settotalorder(gettong1)
              return (
                <tr className="tbody-item" key={key}>
                  <td className="product-remove">
                    <a className="remove" id={value._id} onClick={deleteItem}>×</a>
                  </td>
                  <td className="product-thumbnail">
                    <div className="thumb">
                      <Link to={"/product-details/" + value._id}>
                        <a>
                          <img src={"" + value.image} style={{ width: "68px", height: "84px" }} width={68} height={84} alt="Image-HasTech" />
                        </a>
                      </Link>
                    </div>
                  </td>
                  <td className="product-name">
                    <Link to={"/product-details/" + value._id}>
                      <a className="title">{value.title}</a>
                    </Link>
                    <span className="quantity-item-cart"><i>Số lượng sản phẩm hiện có : {value.quantity}</i></span>
                  </td>
                  <td className="product-price">
                    <span className="price">{Intl.NumberFormat().format(value.price)}</span>
                  </td>
                  <td className="product-quantity">
                    <div className="pro-qty">
                      {/* <a onClick={decreaseqty} id={value._id} className="cart_quantity_up" href> - </a> */}
                      <input id={value._id} type="number" className="quantity" title="Quantity" onChange={handleChangeInput} defaultValue={getdataCartItem[key1]} max={value.quantity} min={1} />
                      {/* <a onClick={increaseqty} id={value._id} className="cart_quantity_up" href> + </a> */}
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <span className="price">{Intl.NumberFormat().format(gettong)} VNĐ</span>
                  </td>
                </tr>
              )
            }
          })
        }
      })
    }
  }
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <nav aria-label="breadcrumb" className="breadcrumb-style1">
        <div className="container">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Cart</li>
          </ol>
        </div>
      </nav>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Product Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="shopping-cart-form table-responsive">
            <form action="#" method="post">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="product-remove">&nbsp;</th>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchData()}
                </tbody>
              </table>
            </form>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="coupon-wrap">
                <h4 className="title">Coupon</h4>
                {
                  coupon[0]?.name
                    ? <p className="desc">Nhập mã phiếu <b>"{coupon[0]?.name}"</b> để được giảm giá </p>
                    : <p className="desc">Nhập mã phiếu giảm giá của bạn nếu bạn có.</p>
                }
                <input type="text" className="form-control" onChange={e => setCouponValue(e.target.value)} placeholder="Coupon code" />
                <button type="button" className="btn-coupon" onClick={handleCoupon}>Apply coupon</button>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="cart-totals-wrap">
                <h2 className="title">Cart totals</h2>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span className="amount">{Intl.NumberFormat().format(gettong2)} VNĐ</span>
                      </td>
                    </tr>
                    {couponPrice ?
                      <tr className="cart-coupon">
                        <th>Coupon</th>
                        <td>
                          <span className="amount">{Intl.NumberFormat().format(couponPrice * 100)} %</span>
                        </td>
                      </tr>
                      : ""
                    }
                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <span className="amount">{Intl.NumberFormat().format(gettong1)} VNĐ</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-end">
                  <Link to={"/productcheckout"} state={{ gettong1, couponPrice, getMang }}>
                    <a className="checkout-button">Proceed to checkout</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Product Area Wrapper ==*/}
    </>
  )
}
export default Productcart