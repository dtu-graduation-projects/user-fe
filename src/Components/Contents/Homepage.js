import axios from "axios"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"
import { toast } from "react-toastify"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
function Homepage() {
  const { getvalueaorefresh, setvalueaorefresh } = useContext(UserContext)
  const [getItem, setItem] = useState("")
  const [getAllItem, setAllItem] = useState([])
  const [sold, setSold] = useState([])
  const [blog, setBlog] = useState([])
  const { getCart, setCart } = useContext(UserContext)
  const { getid, setid } = useContext(UserContext)
  const { getidlarge, setidlarge } = useContext(UserContext)
  const { getdataCart1, setdataCart1 } = useContext(UserContext)
  const { getidwishlist, setidwishlist } = useContext(UserContext)
  const [category, setCategory] = useState([])
  const [valueao, setvalueao] = useState("valueao")
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  let [loading, setLoading] = useState(true);
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  var settings1 = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    axios.get("http://localhost:8000/products")
      .then(response => {
        setItem(response.data.mess.slice(-3))
        setAllItem(response.data.mess)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get("http://localhost:8000/products?sort=sold&type=desc&page=1")
      .then(res => {
        setSold(res.data.mess.slice(0, 3))
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get('http://localhost:8000/blogs')
      .then(res => {
        setBlog(res.data.blogs.slice(-3))
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get('http://localhost:8000/category-products')
      .then(res => {
        setCategory(res.data.category)

      })
  }, [getvalueaorefresh])
  const handleClick = (e) => {
    console.log(e.quantity)
    if (e.quantity > 0) {
      if (getDataUser != null) {
        let main = {}
        let nameInput = e._id
        let value = 1
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
      } else {
        toast.error("Vui lòng đăng nhập")
      }
    } else {
      toast.error("Sản phẩm này đã hết")
      setid("")
    }
  }
  const handleClicklarge = (id) => {
    setidlarge(id)
  }
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
      console.log(data)
      axios.post("http://localhost:8000/users/wish-list", data, config)
        .then(res => {
          toast.success("Thêm sản phẩm thành công")
        })
        .catch(function (error) {
          toast.error("Bạn đã thêm sản phẩm này")
        })
    } else {
      toast.error("Vui lòng đăng nhập")
    }
  }
  function fetchDataproduct() {
    if (getItem.length > 0) {
      return (getItem.map((value, key) => {
        if (key <= 2) {
          return (
            <div className="col-6 col-lg-4 mb-4 mb-sm-9" key={key}>
              <div className="product-item">
                <div className="product-thumb">
                  <Link to={`/product-details/${value._id}`} state={{ data: value.category.title }}>
                    <img src={"" + value.image} style={{ width: "370px", height: "450px" }} width={370} height={450} alt="Image-HasTech" />
                  </Link>

                  <span className="flag-new">new</span>
                  <div className="product-action">
                    <button id={value._id} onClick={() => handleClicklarge(value._id)} type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                      <i className="fa fa-expand" />
                    </button>
                    <button id={value._id} onClick={() => handleClick(value)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle={getDataUser && value.quantity > 0 ? "modal" : ""} data-bs-target="#action-CartAddModal">
                      <span>Add to cart</span>
                    </button>
                    <button id={value._id} onClick={() => handleclickwishlist(value._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="" data-bs-target="#action-WishlistModal">
                      <i className="fa fa-heart-o" />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <div className="rating">
                      {Array.from({ length: value.totalRatings }, (_, index) => (
                        <i key={index} className="fa fa-star-o" />
                      ))}
                    </div>

                    <div className="reviews">{value.brand}</div>
                  </div>
                  <h4 className="title">
                    <Link to={`/product-details/${value._id}`}>{value.title}</Link>
                  </h4>
                  <div className="product-rating">
                    <div className="reviews">Đã bán {value.sold}</div>
                  </div>
                  <div className="prices">
                    <span style={{ color: 'rgb(239,84,53)' }} className="price">₫{Intl.NumberFormat().format(value.price)}</span>
                  </div>
                </div>
                <div className="product-action-bottom">
                  <button type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                    <i className="fa fa-expand" />
                  </button>
                  <button type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
                    <i className="fa fa-heart-o" />
                  </button>
                  <button type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          )
        }
      }))
    }
  }
  return (
    <>
      {/*== Start Hero Area Wrapper ==*/}
      <div className="banner">
        <Slider {...settings1}>
          <div className="card">
            <img className="d-block w-100" src="/assets/images/slider/slider1.jpg" style={{ width: "1268px", height: "507px" }} alt="First slide" />
          </div>
          <div className="card">
            <img className="d-block w-100" src="/assets/images/slider/slider2.jpg" style={{ width: "1268px", height: "507px" }} alt="Second slide" />
          </div>
          <div className="card">
            <img className="d-block w-100" src="/assets/images/slider/slider3.jpg" style={{ width: "1268px", height: "507px" }} alt="Second slide" />
          </div>
        </Slider>
      </div>
      {/*== End Hero Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">All Products</h2>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</p> */}
              </div>
            </div>
          </div>
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
            <Slider {...settings}>
              {getAllItem?.map((value, key) => (
                <div className="col-6 col-lg-4 mb-4 mb-sm-9" key={key}>
                  <div className="product-item">
                    <div className="product-thumb">
                      <Link to={`/product-details/${value._id} `} state={{ data: value.category.title }}>
                        <img src={"" + value.image} style={{ width: "370px", height: "450px" }} width={370} height={450} alt="Image-HasTech" />
                      </Link>

                      <span className="flag-new">new</span>
                      <div className="product-action">
                        <button id={value._id} onClick={() => handleClicklarge(value._id)} type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                          <i className="fa fa-expand" />
                        </button>
                        <button id={value._id} onClick={() => handleClick(value)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle={getDataUser && value.quantity > 0 ? "modal" : ""} data-bs-target="#action-CartAddModal">
                          <span>Add to cart</span>
                        </button>
                        <button id={value._id} onClick={() => handleclickwishlist(value._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="" data-bs-target="#action-WishlistModal">
                          <i className="fa fa-heart-o" />
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-rating">
                        <div className="rating">
                          {Array.from({ length: value.totalRatings }, (_, index) => (
                            <i key={index} className="fa fa-star-o" />
                          ))}
                        </div>

                        <div className="reviews">{value.brand}</div>
                      </div>
                      <h4 className="title">
                        <Link to={`/product-details/${value._id}`}>{value.title}</Link>
                      </h4>
                      <div className="product-rating">
                        <div className="reviews">Đã bán {value.sold}</div>
                      </div>
                      <div className="prices">
                        <span style={{ color: 'rgb(239,84,53)' }} className="price">₫{Intl.NumberFormat().format(value.price)}</span>
                      </div>
                    </div>
                    <div className="product-action-bottom">
                      <button type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                        <i className="fa fa-expand" />
                      </button>
                      <button type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
                        <i className="fa fa-heart-o" />
                      </button>
                      <button type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                        <span>Add to cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* </Slider> */}
        </div>
      </section>
      <section className="section-space pb-0">
        <div className="container">
          <div className="row g-3 g-sm-6">
            {/*== Start Product Category Item ==*/}
            {
              category?.map((e, i) => (
                <div className="col-6 col-lg-4 col-lg-2 col-xl-2" key={i}>
                  <Link to={"/product/filter/" + e.title} state={{ data: e.title }}>
                    <a id={"" + e.title} className="product-category-item" >
                      <img className="icon" src={`assets/images/shop/category/${i + 1}.webp`} width={70} height={80} alt="Image-HasTech" />
                      <h3 className="title">{e.title}</h3>
                      {/* <span className="flag-new"></span> */}
                    </a>
                  </Link>
                </div>
              ))
            }
            {/*== End Product Category Item ==*/}
          </div>
        </div>
      </section >
      {/*== Start Product Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">Top Products</h2>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</p> */}
              </div>
            </div>
          </div>
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
            {fetchDataproduct()}
          </div>
        </div>
      </section>
      {/*== End Product Area Wrapper ==*/}

      {/*== Start Product Area TOP SOLD ==*/}
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">Top Sold</h2>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</p> */}
              </div>
            </div>
          </div>
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
            {
              sold?.map((value, i) => (
                <div key={i} style={{ width: '370px' }} className="swiper mb-10">
                  <div className="product-item product-st2-item">
                    <div className="product-thumb">
                      <Link to={"/product-details/" + value._id} state={{ data: value.category.title }}>
                        <a className="d-block">
                          <img src={value.image} style={{ height: '400px' }} width={370} height={450} alt="Image-HasTech" />
                        </a>
                      </Link>
                      <span className="flag-new">new</span>
                    </div>
                    <div className="product-info">
                      <div className="product-rating">
                        <div className="rating">
                          {Array.from({ length: value.totalRatings }, (_, index) => (
                            <i key={index} className="fa fa-star-o" />
                          ))}
                        </div>

                        <div className="reviews">{value.brand}</div>
                      </div>
                      <h4 className="title"><a href={"/product-details/" + value._id}>{value.title}</a></h4>
                      <div className="product-rating">
                        <div className="reviews">Đã bán {value.sold}</div>
                      </div>
                      <div className="prices">
                        <span style={{ color: 'rgb(239,84,53)' }} className="price">₫{Intl.NumberFormat().format(value.price)}</span>
                        {/* <span className="price-old">300.00</span> */}
                      </div>
                      <div className="product-action">
                        <button id={value._id} onClick={() => handleClick(value)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle={getDataUser && value.quantity > 0 ? "modal" : ""} data-bs-target="#action-CartAddModal">
                          <span>Add to cart</span>
                        </button>
                        <button id={value._id} onClick={() => handleClicklarge(value._id)} type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                          <i className="fa fa-expand" />
                        </button>
                        <button id={value._id} onClick={() => handleclickwishlist(value._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="" data-bs-target="#action-WishlistModal">
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
      </section>
      {/*== End Product Area Wrapper ==*/}
      {/*== Start Blog Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">Blog posts</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</p>
              </div>
            </div>
          </div>
          <div className="row mb-n9">
            {
              blog?.map((e, i) => (
                <div className="col-sm-6 col-lg-4 mb-8" key={i}>
                  <div className="post-item">
                    <Link to={`/blog-details/${e?._id}`}>
                      <a className="thumb">
                        <img src={e?.images} style={{ height: '320px' }} width={370} height={320} alt="Image-HasTech" />
                      </a>
                    </Link>
                    <div className="content">
                      <a className="post-category" >{e?.category?.title}</a>
                      <h4 className="title">
                        <Link to={`/blog-details/${e?._id}`}>
                          <a>{e?.title}</a>
                        </Link>
                      </h4>
                      <ul className="meta">
                        <li className="author-info"><span>By:</span> <a href="blog.html">{e?.author?.firstname} {e?.author?.lastname}</a></li>
                        <li className="post-date">{new Date(e?.createdAt).toDateString()}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      {/*== End Blog Area Wrapper ==*/}

      {/*== Start News Letter Area Wrapper ==*/}
      <section className="section-space pt-0">
        <div className="container">
          <div className="newsletter-content-wrap" data-bg-img="assets/images/photos/bg1.webp">
            <div className="newsletter-content">
              <div className="section-title mb-0">
                <h2 className="title">Join with us</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam.</p>
              </div>
            </div>
            <div className="newsletter-form">
              <form>
                <input type="email" className="form-control" placeholder="enter your email" />
                <button className="btn-submit" type="submit"><i className="fa fa-paper-plane" /></button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/*== End News Letter Are a Wrapper ==*/}
    </>
  )
}
export default Homepage