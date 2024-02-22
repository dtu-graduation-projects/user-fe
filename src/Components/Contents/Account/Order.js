import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
function Orderpage(props) {
  const [getItem, setItem] = useState("")
  const [getOrders, setOrders] = useState("")
  let params = useParams()
  const navigate = useNavigate()
  let location = useLocation()
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  var gettong1 = 0
  gettong1 = location.state.data.total
  console.log(location.state.data)
  useEffect(() => {
    const getDataUser = JSON.parse(localStorage.getItem("User"))
    let accessToken = getDataUser?.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken,
      }
    }
    axios.get("http://localhost:8000/orders", config)
      .then(response => {
        const result = response.data.order.filter(e => (e.codeBill.includes(location.state.data.codeBill)))
        setOrders(result)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  const handleDelete = () => {
    let accessToken = getDataUser.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken,
      }
    }
    axios.delete(`http://localhost:8000/orders/${location.state.data._id}`, config)
      .then(res => {
        toast.success("Hủy đơn thành công")
        navigate("/myaccount")
      })
      .catch(err => {
        console.log(err)
      })
  }
  function fetchData() {
    if (getOrders.length > 0) {
      return getOrders.map((value, key) => {
        return value.products.map((value1, key1) => {
          const gettong = parseInt(+value1.quatity * value1.product.price)
          return (
            <tbody>
              <tr className="tbody-item" key={key1}>
                <td className="product-remove">
                  <span className="number_order">{key1 + 1}
                  </span>
                </td>
                <td className="product-thumbnail">
                  <div className="thumb">
                    <Link to={"/product-details/" + value1.product._id}>
                      <a>
                        <img src={"" + value1.product.image} style={{ width: "68px", height: "84px" }} width={68} height={84} alt="Image-HasTech" />
                      </a>
                    </Link>
                  </div>
                </td>
                <td className="product-name">
                  <Link to={"/product-details/" + value1.product._id}>
                    <a className="title">{value1.product.title}</a>
                  </Link>
                </td>
                <td className="product-price">
                  <span className="price">{Intl.NumberFormat().format(value1.product.price)} </span>
                </td>
                <td className="product-quantity">
                  <div className="pro-qty">
                    {/* <a onClick={decreaseqty} id={value._id} className="cart_quantity_up" href> - </a> */}
                    <input id={value._id} className="quantity" title="Quantity" value={value1.quatity} readOnly />
                    {/* <a onClick={increaseqty} id={value._id} className="cart_quantity_up" href> + </a> */}
                  </div>
                </td>
                <td className="product-subtotal">
                  <span className="price">{Intl.NumberFormat().format(gettong)} VNĐ</span>
                </td>
              </tr>
            </tbody>
          )
        })
      })
    }
  }
  return (
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
              {fetchData()}
            </table>
          </form>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="cart-totals-wrap">
              <h2 className="title">Cart totals</h2>
              <table>
                <tbody>
                  {/* <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span className="amount">{Intl.NumberFormat().format(gettong1)} VNĐ</span>
                      </td>
                    </tr> */}
                  <tr className="order-total">
                    <th>Total</th>
                    <td>
                      <span className="amount">{Intl.NumberFormat().format(gettong1)} VNĐ</span>
                    </td>
                  </tr>
                  <tr className="method-order">
                    <th>Method</th>
                    <td>
                      <span className="amount">{location.state.data.payments}</span>
                    </td>
                  </tr>
                  <tr className="status">
                    <th>Status</th>
                    <td>
                      <span className="amount">{location.state.data.status}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {location.state.data.payments === "Thanh Toán Khi Nhận Hàng" && location.state.data.status === "Processing" ?
          <div className="delete-order-page">
            <button className="delete-order" onClick={handleDelete}>Cancel Order</button>
          </div> : ""
        }
      </div>
    </section>
  )
}
export default Orderpage