import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import './product.css'
import { UserContext } from "../../../UserContext"
import { toast } from "react-toastify"
function Productdetails() {
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const [star, setStar] = useState(1)
  const [feedback, setFeedback] = useState('')
  const { getCart, setCart } = useContext(UserContext)
  const { getid, setid } = useContext(UserContext)
  let params = useParams()
  const { getidwishlist, setidwishlist } = useContext(UserContext)
  const [getquantity, setquantity] = useState(1)
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  const location = useLocation()
  const [getAllItem, setAllItem] = useState([])
  const onChancequantity = (e) => {
    setquantity(e.target.value)
    if (e.target.value < 0) {
      toast.error("Số lượng sản phẩm không thể nhỏ hơn 1")
    } else if (e.target.value >= 1) {
      if (product.quantity > 0) {
        if (e.target.value > product.quantity) {
          toast.error("Số lượng sản phẩm không thể lớn hơn : " + product.quantity)
        }
      } else {
        toast.error("Sản phẩm đã hết")
      }
    }
  }
  const handleClick = (id) => {
    if (getquantity > 0) {
      if (product.quantity > 0) {
        if (getDataUser != null) {
          if (product.quantity < getquantity) {
            toast.error("Số lượng quá nhiều")
          } else {
            let main = {}
            let nameInput = id
            let value = +getquantity
            let test1 = localStorage.getItem("CartItem")
            setid(nameInput)
            if (test1) {
              main = JSON.parse(test1)
              for (var key in main) {
                if (nameInput == key) {
                  value = main[nameInput] + +value
                  localStorage.setItem("CartItem", JSON.stringify(main))
                }
              }
            }
            main[nameInput] = value
            localStorage.setItem("CartItem", JSON.stringify(main))
            setCart(main)
          }
        } else {
          toast.error("Vui lòng đăng nhập")
        }
      } else {
        toast.error("Sản phẩm này đã hết")
      }
    } else {
      toast.error("Sản phẩm không thể nhỏ hơn 1")
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    try {
      axios.get('http://localhost:8000/products/' + params.id)
        .then(res => {
          setProduct(res.data.product)
        })
        .catch(err => {
          console.log('catch log', err)
        })
      axios.get('http://localhost:8000/products/')
        .then(res => {
          const result = res.data.mess.filter(e => (e.category.title.includes(location.state.data)))
          setAllItem(result.slice(0, 3))
        })
        .catch(err => {
          console.log('catch log', err)
        })
      axios.get('http://localhost:8000/products/')
        .then(res => {
          setProducts(res.data.mess.slice(0, 3))
        })
        .catch(err => {
          console.log('catch log', err)
        })
      axios.get('http://localhost:8000/products/' + params.id)
        .then(res => {
          setProduct(res.data.product)
        })
        .catch(err => {
          console.log('catch log', err)
        })
    } catch (error) {
      console.log('error', error)
    }
  }, [feedback])
  const handleclickwishlist = (id) => {
    if (getDataUser != null) {
      let accessToken = getDataUser.token
      let config = {
        headers: {
          'token': 'bearer ' + accessToken,
        }
      }
      const data = {
        pid: id
      }

      axios.post("http://localhost:8000/users/wish-list", data, config)
        .then(res => {
          setidwishlist(id)
          toast.success("Thêm sản phẩm thành công")
        })
        .catch(function (error) {
          toast.error("Bạn đã thêm sản phẩm này")
          setidwishlist("")
        })
    } else {
      toast.error("Vui lòng đăng nhập")
    }
  }
  const handleFeedback = (e) => {
    e.preventDefault()
    let accessToken = getDataUser.token
    let config = {
      headers: {
        'token': 'bearer ' + accessToken,
      }
    }

    const body = {
      postId: params.id,
      star,
      comment: feedback
    }
    axios.put('http://localhost:8000/products/rating-product', body, config)
      .then(res => {
        toast.success('Feedback Thành Công !!')
        setFeedback('')
      })
      .catch(err => { toast.error("Bạn Không Được Phép Feedback") })
  }
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <section className="page-header-area pt-10 pb-9" data-bg-color="#FFF3DA">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="page-header-st3-content text-center text-md-start">
                <ol className="breadcrumb justify-content-center justify-content-md-start">
                  <li className="breadcrumb-item"><a className="text-dark" href="index.html">Home</a></li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">Product Detail</li>
                </ol>
                <h2 className="page-header-title">Product Detail</h2>
              </div>
            </div>
            <div className="col-md-7">
              <h5 className="showing-pagination-results mt-5 mt-md-9 text-center text-md-end">Showing Single Product</h5>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Product Details Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row product-details">
            <div className="col-lg-6">
              <div className="product-details-thumb">
                <img src={product.image} width={570} height={693} alt="Image" />
                <span className="flag-new">new</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-details-content">
                {/* <h5 className="product-details-collection">Premioum collection</h5> */}
                <h1 className="product-details-title" style={{ fontSize: '26px' }}>{product.title}</h1>
                <div className="product-details-review mb-7">
                  <div className="product-review-icon">
                    <div className="rating">
                      {Array.from({ length: product.totalRatings }, (_, index) => (
                        <i key={index} className="fa fa-star-o" />
                      ))}
                    </div>
                  </div>
                  <button type="button" className="product-review-show">{product.brand}</button>
                  <button style={{ marginLeft: '32px' }} type="button" className="product-review-show">Đã bán {product.sold}</button>
                  <button style={{ marginLeft: '32px' }} type="button" className="product-review-show">Số lượng {product.quantity}</button>
                  <button style={{ marginLeft: '32px' }} type="button" className="product-review-show">Tình trạng : {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}</button>
                </div>

                <div className="product-details-pro-qty">
                  <div className="pro-qty">
                    <input type="number" title="Quantity" defaultValue={1} onChange={onChancequantity} min={1} max={product?.quantity} />
                  </div>
                </div>
                <div className="product-details-shipping-cost">
                  <p><i class="fa fa-shield" aria-hidden="true"></i> Hàng chính hãng 100% </p>
                  <p><i class="fa fa-arrow-circle-down" aria-hidden="true"></i> 3 ngày miễn phí trả hàng</p>
                  <p>Vận Chuyển Nhanh <i class="fa fa-truck" aria-hidden="true"></i> Xử lý đơn hàng bởi Rose <i class="fa fa-shopping-bag" aria-hidden="true"></i></p>
                </div>
                <div className="product-details-action">
                  <h4 style={{ color: 'rgb(239,84,53)' }} className="price">₫{Intl.NumberFormat().format(product.price * getquantity)}</h4>
                  <div className="product-details-cart-wishlist">
                    <button id={product._id} onClick={() => handleclickwishlist(product._id)} type="button" className="btn-wishlist" data-bs-toggle="" data-bs-target="#action-WishlistModal"><i className="fa fa-heart-o" /></button>
                    <button id={product._id} onClick={() => handleClick(product._id)} type="button" className="btn" data-bs-toggle="" data-bs-target="#action-CartAddModal">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="nav product-details-nav" id="product-details-nav-tab" role="tablist">
                <button className="nav-link" id="specification-tab" data-bs-toggle="tab" data-bs-target="#specification" type="button" role="tab" aria-controls="specification" aria-selected="false">Specification</button>
                <button className="nav-link active" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="true">Review</button>
              </div>
              <div className="tab-content" id="product-details-nav-tabContent">
                <div className="tab-pane" id="specification" role="tabpanel" aria-labelledby="specification-tab">
                  <p>{product.description}</p>
                </div>
                <div className="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                  {/*== Start Reviews Content Item ==*/}
                  {
                    product?.ratings?.map((e, i) => (
                      <div className="product-review-item">
                        <div className="product-review-top">
                          <div className="product-review-thumb">
                            <img src={e.postedBy?.avatar} style={{ width: '40px', height: '40px' }} alt="Images" />
                          </div>
                          <div className="product-review-content">
                            <span className="product-review-name">{e.postedBy?.firstname} {e.postedBy?.lastname}</span>
                            <span className="product-review-designation">Delveloper</span>
                            <div className="product-review-icon">
                              {
                                Array.from({ length: e.star }, (_, index) => (
                                  <i key={index} className="fa fa-star-o" />
                                ))
                              }

                            </div>
                          </div>
                        </div>
                        <p className="desc">{e.comment}</p>
                        <button type="button" className="review-reply"><i className="fa fa fa-undo" /></button>
                      </div>
                    ))
                  }
                </div>
                {/*== END Reviews Content Item ==*/}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="product-reviews-form-wrap">
                <h4 className="product-form-title">Leave a replay</h4>
                <div className="product-reviews-form">
                  <form action="#">
                    <div className="form-input-item">
                      <textarea onChange={e => setFeedback(e.target.value)} value={feedback} className="form-control" placeholder="Enter you feedback" defaultValue={""} />
                    </div>

                    <div className="form-input-item">
                      <div className="form-ratings-item">
                        <select onChange={e => setStar(e.target.value)} id="product-review-form-rating-select" className="select-ratings">
                          <option value={1}>01</option>
                          <option value={2}>02</option>
                          <option value={3}>03</option>
                          <option value={4}>04</option>
                          <option value={5}>05</option>
                        </select>
                        <span className="title">Provide Your Ratings</span>
                        <div className="product-ratingsform-form-wrap">
                          <div className="product-ratingsform-form-icon">
                            {
                              Array.from({ length: star }, (_, index) => (
                                <i key={index} className="fa fa-star-o" />
                              ))
                            }
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="form-input-item mb-0">
                      <button type="submit" onClick={handleFeedback} className="btn">SUBMIT</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Product Details Area Wrapper ==*/}
      {/*== Start Product Banner Area Wrapper ==*/}
      <section>
        <div className="container">
          {/*== Start Product Category Item ==*/}
          <a href="product.html" className="product-banner-item">
            <img src="https://topprint.vn/wp-content/uploads/2021/07/mau-banner-kem-chong-nang.jpg" style={{ height: '350px' }} width={1170} height={240} alt="Image-HasTech" />
          </a>
          {/*== End Product Category Item ==*/}
        </div>
      </section>
      {/*== End Product Banner Area Wrapper ==*/}
      {/*== Start Product Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-product">
                <h2 >Sản phẩm liên quan</h2>
              </div>
            </div>
          </div>
          <div className="row mb-n10">
            <div className="col-12">
              <div className="swiper related-product-slide-container">
                <div className="swiper-wrapper">
                  {/*== Start Product Item ==*/}
                  {
                    getAllItem?.map((e, i) => (
                      <div key={i} style={{ width: '370px' }} className="swiper mb-10">
                        <div className="product-item product-st2-item">
                          <div className="product-thumb">
                            <Link to={"/product-details/" + e._id} state={{ data: e.category.title }}>
                              <a className="d-block">
                                <img src={e.image} style={{ height: '400px' }} width={370} height={450} alt="Image-HasTech" />
                              </a>
                            </Link>
                            <span className="flag-new">new</span>
                          </div>
                          <div className="product-info">
                            <div className="product-rating">

                              <div className="rating">
                                {Array.from({ length: e.totalRatings }, (_, index) => (
                                  <i key={index} className="fa fa-star-o" />
                                ))}
                              </div>

                              <div className="reviews">{e.brand}</div>
                            </div>
                            <h4 className="title"><a href={"/product-details/" + e._id}>{e.title}</a></h4>
                            <div className="product-rating">
                              <div className="reviews">Đã bán {e.sold}</div>
                            </div>
                            <div className="prices">
                              <span style={{ color: 'rgb(239,84,53)' }} className="price">₫{e.price}</span>
                              {/* <span className="price-old">300.00</span> */}
                            </div>
                            <div className="product-action">
                              <button type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                                <span>Add to cart</span>
                              </button>
                              <button type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                                <i className="fa fa-expand" />
                              </button>
                              <button type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
                                <i className="fa fa-heart-o" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      {/*== End Product Area Wrapper ==*/}
    </>
  )
}
export default Productdetails