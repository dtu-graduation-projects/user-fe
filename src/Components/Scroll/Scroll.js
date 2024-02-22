import axios from "axios"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"
import { toast } from "react-toastify"
function Scroll() {
  const [getItem, setItem] = useState("")
  const [getdataCart, setdataCart] = useState("")
  const { getCart, setCart } = useContext(UserContext)
  const { getid, setid } = useContext(UserContext)
  const getdataCartItem = JSON.parse(localStorage.getItem("CartItem"))
  const { getidlarge, setidlarge } = useContext(UserContext)
  const { getidwishlist, setidwishlist } = useContext(UserContext)
  var gettong1 = 0
  const [errors, setErrors] = useState({})
  const [getquantity, setquantity] = useState(1)
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return (
          <p key={index}>{errors[key]}</p>
        )
      })
    }
  }
  const onChancequantity = (e) => {
    let quantity = +e.target.value
    setquantity(e.target.value)
    let flag = true
    let errorSubmit = {}
    if (e.target.value <= 0) {
      toast.error("Số lượng sản phẩm không thể nhỏ hơn 1")
    } else {
      if (e.target.id > 0) {
        if (quantity > +e.target.id) {
          toast.error("Số lượng sản phẩm không thể lớn hơn : " + quantity)
        }
      } else {
        toast.error("Sản phẩm đã hết")
      }
    }
  }
  useEffect(() => {
    axios.get("http://localhost:8000/products")
      .then(response => {
        setItem(response.data.mess)
        // console.log(response.data.mess)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  const handleClick = (e) => {
    console.log(e.quantity)
    if (e.quantity > 0) {
      if (getDataUser != null) {
        if (getquantity <= e.quantity) {
          let main = {}
          let nameInput = e._id
          let value = getquantity
          let test1 = localStorage.getItem("CartItem")
          setid(nameInput)
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
        } else {
          console.log("test")
          toast.error("Quá nhiều sản phẩm")
        }
      } else {
        toast.error("Vui lòng đăng nhập")
      }
    } else {
      toast.error("Sản phẩm này đã hết")
      setid("")
    }
  }
  const deleteItem = (e) => {
    e.preventDefault()
    if (Object.keys(getdataCartItem).length > 0) {
      return Object.keys(getdataCartItem).map((key2, index2) => {
        if (e.target.id == key2) {
          delete getdataCartItem[key2]
          localStorage.setItem("CartItem", JSON.stringify(getdataCartItem))
          setCart(getdataCartItem)
        }
      })
    }
  }
  function FetchCart() {
    if (Object.keys(getCart).length > 0) {
      return Object.keys(getCart).map((key1, index) => {
        if (getItem?.length > 0) {
          return getItem?.map((value, key) => {
            if (key1 == value._id) {
              const gettong = parseInt(getCart[key1] * value.price)
              gettong1 += gettong
              return (
                <li className="aside-product-list-item" key={key}>
                  <a href="" id={value._id} onClick={deleteItem} className="remove">×</a>
                  <a href={"product-details/" + value._id}>
                    <img src={"" + value.image} style={{ width: "68px", height: "84px" }} width={68} height={84} alt="Image" />
                    <span className="product-title">{value.title}</span>
                  </a>
                  <span className="product-price">{Intl.NumberFormat().format(getCart[key1])} × {Intl.NumberFormat().format(value.price)}</span>
                </li>
              )
            }
          })
        }
      })
    } else if (getdataCartItem != null) {
      if (Object.keys(getdataCartItem).length > 0) {
        return Object.keys(getdataCartItem).map((key2, index2) => {
          if (getItem.length > 0) {
            return getItem?.map((value, key) => {
              if (key2 == value._id) {
                const gettong = parseInt(getdataCartItem[key2] * value.price)
                gettong1 += gettong
                return (
                  <li className="aside-product-list-item" key={key}>
                    <a href="" id={value._id} onClick={deleteItem} className="remove">×</a>
                    <a href={"product-details/" + value._id}>
                      <img src={"" + value.image} style={{ width: "68px", height: "84px" }} width={68} height={84} alt="Image" />
                      <span className="product-title">{value.title}</span>
                    </a>
                    <span className="product-price">{Intl.NumberFormat().format(getdataCartItem[key2])} × {Intl.NumberFormat().format(value.price)}</span>
                  </li>
                )
              }
            })
          }
        })
      }
    }
  }
  function fetchProduct() {
    if (getItem.length > 0) {
      return getItem.map((value, key) => {
        if (getid == value._id) {
          return (
            <div className="modal-action-product" key={key}>
              <div className="thumb">
                <img src={"" + value.image} style={{ width: "466px", height: "320px" }} alt="Organic Food Juice" width={466} height={320} />
              </div>
              <h4 className="product-name"><a href={"product-details/" + value._id}>{value.title}</a></h4>
            </div>
          )
        }
      })
    }
  }
  function fetchlarge() {
    if (getItem.length > 0) {
      return getItem.map((value3, key3) => {
        if (getidlarge == value3._id) {
          return (
            <div className="row">
              <div className="col-lg-6">
                {/*== Start Product Thumbnail Area ==*/}
                <div className="product-single-thumb">
                  <img src={"" + value3.image} style={{ width: "544px", height: "560px" }} width={544} height={560} alt="Image-HasTech" />
                </div>
                {/*== End Product Thumbnail Area ==*/}
              </div>
              <div className="col-lg-6">
                {/*== Start Product Info Area ==*/}
                <div className="product-details-content">
                  <h5 className="product-details-collection">{value3.brand}</h5>
                  <h3 className="product-details-title">{value3.title}</h3>
                  <div className="product-details-review mb-5">
                    <div className="product-review-icon">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-half-o" />
                    </div>
                    <button type="button" className="product-review-show">150 reviews</button>
                  </div>
                  <p className="mb-6">{value3.description}</p>
                  <div className="product-details-pro-qty">
                    <div className="pro-qty">
                      <input type="text" title="Quantity" id={"" + value3.quantity} defaultValue={1} onChange={onChancequantity} min={1} />
                    </div>
                  </div>
                  <div className="product-details-action">
                    <h4 className="price">{Intl.NumberFormat().format(value3.price * getquantity)}</h4>
                    <div className="product-details-cart-wishlist">
                      <button id={value3._id} onClick={() => handleClick(value3)} type="button" className="btn" data-bs-toggle="" data-bs-target="#action-CartAddModal">Add to cart</button>
                    </div>
                  </div>
                </div>
                {/*== End Product Info Area ==*/}
              </div>
            </div>
          )
        }
      })
    }
  }
  function fetchwishlist() {
    if (getItem.length > 0) {
      return getItem.map((value4, key4) => {
        if (getidwishlist == value4._id) {
          return (
            <div className="modal-action-product">
              <div className="thumb">
                <img src={"" + value4.image} style={{ width: "466", height: "320" }} alt="Organic Food Juice" width={466} height={320} />
              </div>
              <h4 className="product-name"><a href={"product-details/" + value4._id}>{value4.title}</a></h4>
            </div>
          )
        }
      })
    }
  }
  return (
    <div>
      {/*== Start Product Quick Wishlist Modal ==*/}
      <aside className="product-action-modal modal fade" id="action-WishlistModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="product-action-view-content">
                <button type="button" className="btn-close" data-bs-dismiss="modal">
                  <i className="fa fa-times" />
                </button>
                <div className="modal-action-messages">
                  <i className="fa fa-check-square-o" /> Added to wishlist successfully!
                </div>
                {fetchwishlist()}
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/*== End Product Quick Wishlist Modal ==*/}
      {/*== Start Product Quick Add Cart Modal ==*/}
      <aside className="product-action-modal modal fade" id="action-CartAddModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="product-action-view-content">
                <button type="button" className="btn-close" data-bs-dismiss="modal">
                  <i className="fa fa-times" />
                </button>
                <div className="modal-action-messages">
                  <i className="fa fa-check-square-o" /> Added to cart successfully!
                </div>
                {fetchProduct()}
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/*== End Product Quick Add Cart Modal ==*/}
      {/*== Start Aside Search Form ==*/}
      <aside className="aside-search-box-wrapper offcanvas offcanvas-top" tabIndex={-1} id="AsideOffcanvasSearch" aria-labelledby="offcanvasTopLabel">
        <div className="offcanvas-header">
          <h5 className="d-none" id="offcanvasTopLabel">Aside Search</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fa fa-close" /></button>
        </div>
        <div className="offcanvas-body">
          <div className="container pt--0 pb--0">
            <div className="search-box-form-wrap">
              <div className="search-note">
                <p>Start typing and press Enter to search</p>
              </div>
              <form action="#" method="post">
                <div className="aside-search-form position-relative">
                  <label htmlFor="SearchInput" className="visually-hidden">Search</label>
                  <input id="SearchInput" type="search" className="form-control" placeholder="Search entire store…" />
                  <button className="search-button" type="submit"><i className="fa fa-search" /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </aside>
      {/*== End Aside Search Form ==*/}
      {/*== Start Product Quick View Modal ==*/}
      <aside className="product-cart-view-modal modal fade" id="action-QuickViewModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="product-quick-view-content">
                <button type="button" className="btn-close" data-bs-dismiss="modal">
                  <span className="fa fa-close" />
                </button>
                <div className="container">
                  {fetchlarge()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/*== End Product Quick View Modal ==*/}
      {/*== Start Aside Cart ==*/}
      <aside className="aside-cart-wrapper offcanvas offcanvas-end" tabIndex={-1} id="AsideOffcanvasCart" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h1 className="d-none" id="offcanvasRightLabel">Shopping Cart</h1>
          <button className="btn-aside-cart-close" data-bs-dismiss="offcanvas" aria-label="Close">Shopping Cart <i className="fa fa-chevron-right" /></button>
        </div>
        <div className="offcanvas-body">
          <ul className="aside-cart-product-list">
            {FetchCart()}
          </ul>
          <p className="cart-total"><span>Subtotal:</span><span className="amount">{Intl.NumberFormat().format(gettong1)}</span></p>
          <Link to={"/productcart"}><a className="btn-total">View cart</a></Link>
          {/* <a className="btn-total">
            <Link to={"/productcheckout"}>Checkout</Link>
            </a> */}
        </div>
      </aside>
      {/*== End Aside Cart ==*/}
      {/*== Start Aside Menu ==*/}
      <aside className="off-canvas-wrapper offcanvas offcanvas-start" tabIndex={-1} id="AsideOffcanvasMenu" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h1 className="d-none" id="offcanvasExampleLabel">Aside Menu</h1>
          <button className="btn-menu-close" data-bs-dismiss="offcanvas" aria-label="Close">menu <i className="fa fa-chevron-left" /></button>
        </div>
        <div className="offcanvas-body">
          <div id="offcanvasNav" className="offcanvas-menu-nav">
            <ul>
              <li className="offcanvas-nav-parent"><a className="offcanvas-nav-item" href="#">home</a>
                <ul>
                  <li><a href="index.html">Home One</a></li>
                  <li><a href="index-two.html">Home Two</a></li>
                </ul>
              </li>
              <li className="offcanvas-nav-parent"><a className="offcanvas-nav-item" href="about-us.html">about</a></li>
              <li className="offcanvas-nav-parent"><a className="offcanvas-nav-item" href="#">shop</a>
                <ul>
                  <li><a href="#" className="offcanvas-nav-item">Shop Layout</a>
                    <ul>
                      <li><a href="product.html">Shop 3 Column</a></li>
                      <li><a href="product-four-columns.html">Shop 4 Column</a></li>
                      <li><a href="product-left-sidebar.html">Shop Left Sidebar</a></li>
                      <li><a href="product-right-sidebar.html">Shop Right Sidebar</a></li>
                    </ul>
                  </li>
                  <li><a href="#" className="offcanvas-nav-item">Single Product</a>
                    <ul>
                      <li><a href="product-details-normal.html">Single Product Normal</a></li>
                      <li><a href="product-details.html">Single Product Variable</a></li>
                      <li><a href="product-details-group.html">Single Product Group</a></li>
                      <li><a href="product-details-affiliate.html">Single Product Affiliate</a></li>
                    </ul>
                  </li>
                  <li><a href="#" className="offcanvas-nav-item">Others Pages</a>
                    <ul>
                      <li><a href="product-cart.html">Shopping Cart</a></li>
                      <li><a href="product-checkout.html">Checkout</a></li>
                      <li><a href="product-wishlist.html">Wishlist</a></li>
                      <li><a href="product-compare.html">Compare</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="offcanvas-nav-parent"><a className="offcanvas-nav-item" href="#">Blog</a>
                <ul>
                  <li><a className="offcanvas-nav-item" href="#">Blog Layout</a>
                    <ul>
                      <li><a href="blog.html">Blog Grid</a></li>
                      <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                    </ul>
                  </li>
                  <li><a href="blog-details.html">Blog Details</a></li>
                </ul>
              </li>
              <li className="offcanvas-nav-parent"><a className="offcanvas-nav-item" href="#">Pages</a>
                <ul>
                  <li><a href="account-login.html">My Account</a></li>
                  <li><a href="faq.html">Frequently Questions</a></li>
                  <li><a href="page-not-found.html">Page Not Found</a></li>
                </ul>
              </li>
              <li className="offcanvas-nav-parent"><a className="offcanvas-nav-item" href="contact.html">Contact</a></li>
            </ul>
          </div>
        </div>
      </aside>
      {/*== End Aside Menu ==*/}
    </div>
  )
}
export default Scroll