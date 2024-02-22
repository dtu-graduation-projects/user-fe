import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import { UserContext } from "../../../UserContext";
function ProductFilter() {
  const params = useParams()
  const [products, setProducts] = useState([])
  const [products1, setProducts1] = useState([])
  const [category, setCategory] = useState([])
  const [value, setValue] = useState(0)
  const [search, setSearch] = useState('')
  let location = useLocation()
  const { getCart, setCart } = useContext(UserContext)
  const { getid, setid } = useContext(UserContext)
  const { getidlarge, setidlarge } = useContext(UserContext)
  const { getidwishlist, setidwishlist } = useContext(UserContext)
  const [getOption, setOption] = useState("")
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
      axios.get(`http://localhost:8000/products`)
        .then(res => {
          setProducts(res.data.mess)
          const result = res.data.mess.filter(e => (e.category.title.includes(location.state.data)))
          setProducts(result)
        })
      axios.get('http://localhost:8000/category-products')
        .then(res => {
          setCategory(res.data.category)
        })
    } catch (error) {
      console.log('err', error)
    }
  }, [location])
  const handleClick = (id) => {
    let main = {}
    let nameInput = id
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
  }
  const handleClicklarge = (id) => {
    setidlarge(id)
  }
  const handleclickwishlist = (id) => {
    setidwishlist(id)
    let idwishlist = id
    let main = []
    let test1 = localStorage.getItem("Wishlist")
    if (test1) {
      main = JSON.parse(test1)
      for (var key in main) {
        if (idwishlist == main[key]) {
          main.splice(key, 1)
        }
      }
    }
    main.push(idwishlist)
    localStorage.setItem("Wishlist", JSON.stringify(main))
  }
  const handleChangeOption = (e) => {
    const value = e.target.value
    setOption(value)
  }
  const handleChangePrice = (e) => {
  }
  const handleSearch = (e) => {
  }
  function fetchData() {
    if (products.length > 0) {
      if (getOption == "" || getOption == "2") {
        return products.filter((e) => {
          return search.toLowerCase() === ""
            ? e : e.title.toLowerCase().includes(search)
        }).sort((a, b) => b.sold - a.sold).map((e, i) => {
          return (
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
                    <button id={e._id} onClick={() => handleClick(e._id)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                      <span>Add to cart</span>
                    </button>
                    <button id={e._id} onClick={() => handleclickwishlist(e._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
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
          )
        })
      }
      if (getOption == "3") {
        return products.sort((a, b) => a.title.localeCompare(b.title)).map((e, i) => {
          return (
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
                    <button id={e._id} onClick={() => handleClick(e._id)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                      <span>Add to cart</span>
                    </button>
                    <button id={e._id} onClick={() => handleclickwishlist(e._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
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
          )
        })
      }
      if (getOption == "4") {
        return products.sort((a, b) => b.title.localeCompare(a.title)).map((e, i) => {
          return (
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
                    <button id={e._id} onClick={() => handleClick(e._id)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                      <span>Add to cart</span>
                    </button>
                    <button id={e._id} onClick={() => handleclickwishlist(e._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
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
          )
        })
      }
      if (getOption == "6") {
        return products.sort((a, b) => b.price - a.price).map((e, i) => {
          return (
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
                    <button id={e._id} onClick={() => handleClick(e._id)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                      <span>Add to cart</span>
                    </button>
                    <button id={e._id} onClick={() => handleclickwishlist(e._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
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
          )
        })
      }
      if (getOption == "5") {
        return products.sort((a, b) => a.price - b.price).map((e, i) => {
          return (
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
                    <button id={e._id} onClick={() => handleClick(e._id)} type="button" className="product-action-btn action-btn-cart" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">
                      <span>Add to cart</span>
                    </button>
                    <button id={e._id} onClick={() => handleclickwishlist(e._id)} type="button" className="product-action-btn action-btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal">
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
          )
        })
      }
    }
  }
  return (
    <>
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
              <h5 className="showing-pagination-results mt-5 mt-md-9 text-center text-md-end">Showing {products.length} Results</h5>
            </div>
          </div>
        </div>
      </section>
      <div className="shop-top-bar-area">
        <div className="container">
          <div className="shop-top-bar">
            <select style={{ border: 'none' }} onChange={e => handleChangeOption(e)}>
              <option value={2} data-display="Trending">Trending</option>
              <option value={3}>Alphabetically, A-Z</option>
              <option value={4}>Alphabetically, Z-A</option>
              <option value={5}>Price, low to high</option>
              <option value={6}>Price, high to low</option>
            </select>
            {/* <div className="select-price-range" onChange={e => handleChangePrice(e)} >
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
          </div>
        </div>
      </div >
      <section className="section-space pb-0">
        <div className="container">
          <div className="row g-3 g-sm-6">
            {/*== Start Product Category Item ==*/}
            {
              category?.map((e, i) => (
                <div className="col-6 col-lg-4 col-lg-2 col-xl-2">
                  <Link to={"/product/filter/" + e.title} state={{ data: e.title }}>
                    <a id={"" + e.title} className="product-category-item" style={{ backgroundColor: "" + (location.state.data == e.title ? "rgb(239 105 105)" : "") }} >
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
      <section className="section-space">
        <div className="container">
          <div className="row mb-n4 mb-sm-n10 g-3 g-sm-6">
            {/* START MAP PRODUCT */}
            {
              fetchData()
            }
            <div className="col-12">
              <ul className="pagination justify-content-center me-auto ms-auto mt-5 mb-0 mb-sm-10">
                {/* <ReactPaginate
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
              /> */}
              </ul>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}
export default ProductFilter