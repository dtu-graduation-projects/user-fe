import axios from "axios"
import { useContext, useEffect, useState, CSSProperties } from "react"
import './product.css'
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import { UserContext } from "../../../UserContext"
import { toast } from "react-toastify"
import ClipLoader from "react-spinners/ClipLoader";
function Product() {
  const [getselected, setselected] = useState(1)
  const [gettotalpage, settotalpage] = useState(1)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [value, setValue] = useState(0)
  const { getCart, setCart } = useContext(UserContext)
  const { getid, setid } = useContext(UserContext)
  const { getidwishlist, setidwishlist } = useContext(UserContext)
  const { getidlarge, setidlarge } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [getPage, setPage] = useState("")
  let getDataUser = JSON.parse(localStorage.getItem("User"))
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "silver",
  };
  function handleFile(e) {
    const file = e.target.file
    // setFile(e.target.files)
    let reader = new FileReader()
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    setLoading(true)
    axios.post("http://localhost:8000/products/find-image", formData)
      .then(response => {
        if (!response.data.mess) {
          console.log(response)
          setProducts(response.data.product)
          setLoading(false)
          settotalpage(Math.ceil(response.data.product.length / 9))
        } else {
          toast.error("Không tồn tại sản phẩm")
          setLoading(false)
          setPage("")
        }
      }).catch(function (error) {
        console.log(error)
      })
  }
  const handleClicklarge = (id) => {
    setidlarge(id)
  }
  const handlePageClick = (event) => {
    setselected(+event.selected + 1)
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
  const handleClick = (e) => {
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
    }
  }
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
      if (getPage === "") {
        axios.get(`http://localhost:8000/products?page=${getselected}`)
          .then(res => {
            setProducts(res.data.mess)
            settotalpage(res.data.pageTotal)
          })
      } else {
        if (getPage === "3") {
          axios.get(`http://localhost:8000/products?sort=title&type=asc&page=${getselected}`)
            .then(res => {
              setProducts(res.data.mess);
              console.log(res.data.mess)
            })
            .catch(err => {
              console.log('err', err);
            })
        }
        if (getPage === "4") {
          axios.get(`http://localhost:8000/products?sort=title&type=desc&page=${getselected}`)
            .then(res => {
              setProducts(res.data.mess);
              console.log(res.data.mess)
            })
            .catch(err => {
              console.log('err', err);
            })
        }
        if (getPage === "5") {
          axios.get(`http://localhost:8000/products?sort=price&type=asc&page=${getselected}`)
            .then(res => {
              setProducts(res.data.mess);
              console.log(res.data.mess)
            })
            .catch(err => {
              console.log('err', err);
            })
        }
        if (getPage === "6") {
          axios.get(`http://localhost:8000/products?sort=price&type=desc&page=${getselected}`)
            .then(res => {
              setProducts(res.data.mess);
              console.log(res.data.mess)
            })
            .catch(err => {
              console.log('err', err);
            })
        }
      }
      axios.get('http://localhost:8000/category-products')
        .then(res => {
          setCategory(res.data.category)
        })
    } catch (error) {
      console.log('err', error)
    }
  }, [getselected])
  const hanldeChangeOption = (e) => {
    const value = e.target.value
    setPage(value)
    switch (value) {
      case '2':
        axios.get('http://localhost:8000/products')
          .then(res => {
            setProducts(res.data.mess);
          })
          .catch(err => {
            console.log('err', err);
          })
        break;
      case '3':
        axios.get('http://localhost:8000/products?sort=title&type=asc&page=1')
          .then(res => {
            setProducts(res.data.mess);
            console.log(res.data.mess)
          })
          .catch(err => {
            console.log('err', err);
          })
        break;
      case '4':
        axios.get('http://localhost:8000/products?sort=title&type=desc&page=1')
          .then(res => {
            setProducts(res.data.mess);
          })
          .catch(err => {
            console.log('err', err);
          })
        break
      case '5':
        axios.get('http://localhost:8000/products?sort=price&type=asc&page=1')
          .then(res => {
            setProducts(res.data.mess);
          })
          .catch(err => {
            console.log('err', err);
          })
        break
      case '6':
        axios.get('http://localhost:8000/products?sort=price&type=desc&page=1')
          .then(res => {
            setProducts(res.data.mess);
          })
          .catch(err => {
            console.log('err', err);
          })
        break
      default:
        break;
    }
  }
  const hanldeChangePrice = (e) => {
    const value = e.target.value
    const valueNext = Number(e.target.value) + 200000
    axios(`http://localhost:8000/products?price[gte]=${value}&price[lte]=${valueNext}&page=1`)
      .then(res => {
        setProducts(res.data.mess)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  // const handleClickCategory = (e) => {
  //   console.log(e)
  //   var categoryTitle = e.currentTarget.querySelector('.title').textContent
  //   var categories = []
  //   setColor(e.currentTarget.querySelector('.title').textContent)
  //   switch (categoryTitle){
  //     case 'Hare Care':
  //       axios.get('http://localhost:8000/products')
  //         .then(res => {
  //           console.log(res)
  //           res.data.mess?.forEach((value) =>
  //             value?.category?.title === 'Hare Care'
  //               ? categories.push(value)
  //               : '')
  //           setProducts(categories)
  //           settotalpage(Math.ceil(categories.length/5))
  //         })
  //         .catch(err => {
  //           console.log('err', err)
  //         })
  //       break
  //     case 'Skin Care':
  //       axios.get('http://localhost:8000/products')
  //         .then(res => {
  //           res.data.mess?.forEach((value) =>
  //             value?.category?.title === 'Skin Care'
  //               ? categories.push(value)
  //               : '')
  //           setProducts(categories)
  //           settotalpage(Math.ceil(categories.length/5))
  //         })
  //         .catch(err => {
  //           console.log('err', err)
  //         })
  //       break
  //     case 'Lip Stick':
  //       axios.get('http://localhost:8000/products')
  //         .then(res => {
  //           res.data.mess?.forEach((value) =>
  //             value?.category?.title === 'Lip Stick'
  //               ? categories.push(value)
  //               : '')
  //           setProducts(categories)
  //           settotalpage(Math.ceil(categories.length/5))
  //         })
  //         .catch(err => {
  //           console.log('err', err)
  //         })
  //       break
  //     case 'Face Skin':
  //       axios.get('http://localhost:8000/products')
  //         .then(res => {
  //           res.data.mess?.forEach((value) =>
  //             value?.category?.title === 'Face Skin'
  //               ? categories.push(value)
  //               : '')
  //           setProducts(categories)
  //           settotalpage(Math.ceil(categories.length/5))
  //         })
  //         .catch(err => {
  //           console.log('err', err)
  //         })
  //       break
  //     case 'Blusher':
  //       axios.get('http://localhost:8000/products')
  //         .then(res => {
  //           res.data.mess?.forEach((value) =>
  //             value?.category?.title === 'Blusher'
  //               ? categories.push(value)
  //               : '')
  //           setProducts(categories)
  //           settotalpage(Math.ceil(categories.length/5))
  //         })
  //         .catch(err => {
  //           console.log('err', err)
  //         })
  //       break
  //     default:
  //       axios.get('http://localhost:8000/products')
  //         .then(res => {
  //           res.data.mess?.forEach((value) =>
  //             value?.category?.title === 'Natural'
  //               ? categories.push(value)
  //               : '')
  //           setProducts(categories)
  //           settotalpage(Math.ceil(categories.length/5))
  //         })
  //         .catch(err => {
  //           console.log('err', err)
  //         })
  //       break;
  //   }
  // }
  // const handleClear = () => {
  //   axios.get('http://localhost:8000/products')
  //     .then(res => {
  //       setProducts(res.data.mess)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
  function handleSearch() {
    axios.post('http://localhost:8000/products/find ', { productName: search })
      .then(res => {
        if (res.data.product != null) {
          setProducts(res.data.product)
          settotalpage(Math.ceil(res.data.product.length / 9))
        } else {
          toast.error("Sản phẩm không tồn tại")
        }
      })
      .catch(err => {
        console.log(err)
      })
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
                  <li className="breadcrumb-item"><a className="text-dark" href="/">Home</a></li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">Products</li>
                </ol>
                <h2 className="page-header-title">All Products</h2>
              </div>
            </div>
            <div className="col-md-7">
              <h5 className="showing-pagination-results mt-5 mt-md-9 text-center text-md-end">Showing {products?.length} Results</h5>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Shop Top Bar Area Wrapper ==*/}
      <div className="shop-top-bar-area">
        <div className="container">
          <div className="shop-top-bar">
            <select style={{ border: 'none' }} onChange={e => hanldeChangeOption(e)}>
              <option value={2} data-display="Trending">Trending</option>
              <option value={3}>Alphabetically, A-Z</option>
              <option value={4}>Alphabetically, Z-A</option>
              <option value={5}>Price, low to high</option>
              <option value={6}>Price, high to low</option>
            </select>
            {/* <div className="select-price-range" onChange={e => hanldeChangePrice(e)} >
              <h4 className="title" style={{ marginRight: '16px' }}>Pricing</h4>
              <input style={{ width: '100px' }} min={0} max={800000} step={10000} type="range"
                class="form-range" id="customRange1" onChange={(e) => setValue(e.currentTarget.value)}>
              </input>
              <p style={{ marginLeft: '10px' }}>
                ₫{value} - ₫{Number(value) + 200000}
              </p>
            </div> */}
            <div className="product-middle-widget">
              <div className="product-search-widget">
                <input type="search" onChange={e => setSearch(e.target.value)} placeholder="Search Here" />
                <button className="submit-search" type="submit" onClick={handleSearch}><i className="fa fa-search" /></button>
              </div>
            </div>
            <div className="input-file-product">
              <input type="file" onChange={handleFile} title="" />
              {/* <button onClick={handleClear} className="btnClear">Clear Filter <i class="fa fa-filter"></i></button> */}
              {/* <select style={{ border: 'none' }}>
                <option selected>Yes</option>
                <option value={1}>No</option>
              </select> */}
            </div>
          </div>
        </div>
      </div >
      {/*== End Shop Top Bar Area Wrapper ==*/}

      {/*== Start Product Category Area Wrapper ==*/}
      <section className="section-space pb-0">
        <div className="container">
          <div className="row g-3 g-sm-6">
            {/*== Start Product Category Item ==*/}
            {
              category?.map((e, i) => (
                <div className="col-6 col-lg-4 col-lg-2 col-xl-2" key={i} style={{ marginTop: "20px" }}>
                  <Link to={"/product/filter/" + e.title} state={{ data: e.title }}>
                    <a id={"" + e.title} className="product-category-item">
                      <img className="icon" src={`/assets/images/shop/category/${i + 1}.webp`} width={70} height={80} alt="Image-HasTech" />
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
      {/*== End Product Category Area Wrapper ==*/}
      {/*== Start Product Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
            {/* START MAP PRODUCT */}
            {
              loading ? <ClipLoader
                loading={loading}
                size={75}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> :
                products?.map((e, i) => (
                  <div key={i} className="col-6 col-lg-4 mb-4 mb-sm-8">
                    {/*== Start Product Item ==*/}
                    <div style={{ objectFit: 'cover' }} className="product-item">
                      <div className="product-thumb">
                        <Link to={"/product-details/" + e._id} state={{ data: e.category.title }}>
                          <a className="d-block">
                            <img src={e.image} style={{ height: '400px' }} width={370} height={450} alt="Image-HasTech" />
                          </a>
                        </Link>
                        <span className="flag-new">{e?.category?.title}</span>
                        <div className="product-action">
                          <button id={e._id} onClick={() => handleClicklarge(e._id)} type="button" className="product-action-btn action-btn-quick-view" data-bs-toggle="modal" data-bs-target="#action-QuickViewModal">
                            <i className="fa fa-expand" />
                          </button>
                          <button id={e._id} value={e.quantity} onClick={() => handleClick(e)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle={getDataUser && e.quantity > 0 ? "modal" : ""} data-bs-target="#action-CartAddModal">
                            <span>Add to cart</span>
                          </button>
                          <button id={e._id} onClick={() => handleclickwishlist(e._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="" data-bs-target="#action-WishlistModal">
                            <i className="fa fa-heart-o" />
                          </button>
                        </div>
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
                        <h4 className="title">
                          <Link to={`/product-details/${e._id}`}>{e.title}</Link>
                          {/* <a href={"product-details/" + e._id} >
                          {e.title}
                        </a> */}
                        </h4>
                        <div className="product-rating">
                          <div className="reviews">Đã bán {e.sold}</div>
                        </div>
                        <div className="prices">
                          <span style={{ color: 'rgb(239,84,53)' }} className="price">₫{Intl.NumberFormat().format(e.price)}</span>
                          {/* <span className="price-old">300.00</span> */}
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
                    {/*== End prPduct Item ==*/}
                  </div>
                ))
            }
            <div className="col-12">
              <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                <ReactPaginate
                  breakLabel="..."
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={gettotalpage}
                  previousClassName="page-link"
                  nextClassName="page-link"
                  nextLabel='>>'
                  previousLabel='<<'
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                />
              </ul>
            </div>
          </div>
        </div>
      </section >
      {/*== End Product Area Wrapper ==*/}
      {/*== Start Product Banner Area Wrapper ==*/}
      <section>
        <div className="container">
          {/*== Start Product Category Item ==*/}
          <a href="product.html" className="product-banner-item">
            <img src="assets/images/shop/banner/7.webp" style={{ height: '350px' }} width={1170} height={240} alt="Image-HasTech" />
          </a>
          {/*== End Product Category Item ==*/}
        </div>
      </section>
      {/*== End Product Banner Area Wrapper ==*/}
    </>
  )
}
export default Product