import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../../UserContext"
function Wishlist() {
  const [getWishlist, setWishlist] = useState("")
  const [getItem, setItem] = useState("")
  const { getCart, setCart } = useContext(UserContext)
  const { refresh, setrefresh } = useContext(UserContext)
  const handleRemove = (e) => {
    let accessToken = getDataUser.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken
      }
    }
    axios.delete(`http://localhost:8000/users/wish-list/${e.target.id}`, config)
      .then(response => {
        setrefresh(response.data.mess)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    setrefresh(false)
    window.scrollTo(0, 0)
    const getDataUser = JSON.parse(localStorage.getItem("User"))
    let accessToken = getDataUser.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken,
      }
    }
    axios.get("http://localhost:8000/users/wish-list", config)
      .then(response => {
        setWishlist(response.data.mess.wishlist)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get("http://localhost:8000/products")
      .then(response => {
        setItem(response.data.mess)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [refresh])
  const getDataUser = JSON.parse(localStorage.getItem("User"))
  function fetchDatwishlist() {
    if (getWishlist?.length > 0) {
      return getWishlist?.map((value, key) => {
        if (getItem.length > 0) {
          return getItem?.map((value1, key1) => {
            if (value._id === value1._id) {
              return (
                <tr className="tbody-item">
                  <td className="product-remove">
                    <a className="remove" onClick={handleRemove} id={"" + value._id}>×</a>
                  </td>
                  <td className="product-thumbnail">
                    <div className="thumb">
                      <Link to={`/product-details/${value1._id}`}>
                        <a>
                          <img src={"" + value1.image} style={{ width: "68", height: "84" }} width={68} height={84} alt="Image-HasTech" />
                        </a>
                      </Link>
                    </div>
                  </td>
                  <td className="product-name">
                    <Link to={`/product-details/${value1._id}`}>
                      <a className="title">{value1.title}</a>
                    </Link>
                  </td>
                  <td className="product-price">
                    <span className="price">{Intl.NumberFormat().format(value1.price)}</span>
                  </td>
                  <td className="product-stock-status">
                    <span className="wishlist-in-stock">{value1.quantity > 0 ? "In Stock" : "Hết Hàng"}</span>
                  </td>
                  <td className="product-add-to-cart">
                    <a className="btn-shop-cart" id={value._id} onClick={() => handleClick(value1)}>Add to Cart</a>
                  </td>
                </tr>
              )
            }
          })
        }
      })
    }
  }
  const handleClick = (e) => {
    if (e.quantity > 0) {
      if (getDataUser != null) {
        let main = {}
        let nameInput = e._id
        let value = 1
        let test1 = localStorage.getItem("CartItem")
        if (test1) {
          main = JSON.parse(test1)
          for (var key in main) {
            const getqty = main[key]
            if (nameInput == key) {
              value = main[nameInput] + 1
              localStorage.setItem("CartItem", JSON.stringify(main))
            }
          }
        }
        main[nameInput] = value
        localStorage.setItem("CartItem", JSON.stringify(main))
        setCart(main)
        toast.success("Thêm sản phẩm thành công")
        setrefresh(true)
      } else {
        toast.error("Vui lòng đăng nhập")
      }
    } else {
      toast.error("Sản phẩm này đã hết")
    }
  }
  return (
    <>
      {/*== Start Wishlist Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="shopping-wishlist-form table-responsive">
            <form action="#" method="post">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="product-remove">&nbsp;</th>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Product name</th>
                    <th className="product-price">Unit price</th>
                    <th className="product-stock-status">Stock status</th>
                    <th className="product-add-to-cart">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchDatwishlist()}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
      {/*== End Wishlist Area Wrapper ==*/}
    </>
  )
}
export default Wishlist