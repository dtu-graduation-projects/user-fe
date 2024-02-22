import axios from "axios"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import Category from "./Category"
import { UserContext } from "../../../UserContext";
function Blog() {
  const [gettotalblog, settotalblog] = useState("")
  const { getpageKey, setpageKey } = useContext(UserContext)
  const [getItem, setItem] = useState("")
  const [getselected, setselected] = useState(1)
  const [gettotalpage, settotalpage] = useState(1)
  const [search, setSearch] = useState('')
  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`http://localhost:8000/blogs`)
      .then(response => {
        settotalblog(response.data.blogs)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get(`http://localhost:8000/blogs?page=${getselected}`)
      .then(response => {
        setItem(response.data.blogs)
        settotalpage(response.data.pageTotal)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [getselected])
  const handlePageClick = (event) => {
    setselected(+event.selected + 1)
  }
  const handlesetKey = (e) => {
    setpageKey(e.target.id)
  }
  function fetchData() {
    if (getItem?.length > 0) {
      return getItem?.map((value, key) => {
        const setimage = value.images["0"]
        return (
          <div className="col-sm-6 col-lg-4 col-xl-6 mb-8">
            <div className="post-item">
              <Link to={`/blog-details/${value?._id}`} id={value._id} onClick={handlesetKey}>
                <img src={"" + setimage} style={{ width: "370px", height: "320px" }} id={value._id} alt="Image-HasTech" />
              </Link>
              <div className="content">
                <Link to={`/blog-details/${value?._id}`} id={value._id}>
                  <a className="post-category">{value?.category?.title}</a>
                  <h4 className="title"><a>{value?.title}</a></h4>
                </Link>
                <ul className="meta">
                  <li className="author-info"><span>By:</span>
                    <Link to={`/blog-details/${value?._id}`} id={value._id} >
                      <a> {value?.author?.firstname} {value?.author?.lastname}</a>
                    </Link>
                  </li>
                  <li className="post-date">{new Date(value?.updatedAt).toDateString()}</li>
                  <li><i class="fa fa-thumbs-up" aria-hidden="true">{+value.likes.length}</i></li>
                  <li><i class="fa fa-thumbs-down" aria-hidden="true">{+value.disLikes.length}</i></li>
                </ul>
              </div>
            </div>
          </div>
        )
      })
    }
  }
  function fetchRecentPost() {
    if (gettotalblog?.length > 0) {
      return gettotalblog?.map((value, key) => {
        // console.log(key)
        const setimage = value.images["0"]
        if (gettotalblog?.length - 3 <= key) {
          return (
            <div className="blog-widget-single-post">
              <Link to={`/blog-details/${value?._id}`}>
                <a>
                  <img src={"" + setimage} style={{ width: "75px", height: "78px" }} alt="Image-HasTech" />
                  <span className="title">{value?.title}</span>
                </a>
              </Link>
              <span className="date">{new Date(value?.updatedAt).toDateString()}</span>
            </div>
          )
        }
      })
    }
  }
  function handleSearch() {
    axios.post('http://localhost:8000/blogs/find ', { blogName: search })
      .then(res => {
        setItem(res.data.blog)
      })
      .catch(err => {
        console.log(err)
      })
  }
  function handleCategory(e) {
    e.preventDefault()
    var categoryTitle = e.target.innerHTML
    var categories = []
    switch (categoryTitle.trim()) {
      case 'Review':
        axios.get('http://localhost:8000/blogs')
          .then(res => {
            res.data.blogs?.forEach((value) =>
              value?.category?.title === 'Review'
                ? categories.push(value)
                : '')
            setItem(categories)
            settotalpage(Math.ceil(categories.length / 5))
          })
          .catch(err => {
            console.log('err', err)
          })
        break;
      case 'Beauty':
        axios.get('http://localhost:8000/blogs')
          .then(res => {
            res.data.blogs?.forEach((value) =>
              value?.category?.title === 'Beauty'
                ? categories.push(value)
                : '')
            setItem(categories)
            settotalpage(Math.ceil(categories.length / 5))
          })
          .catch(err => {
            console.log('err', err)
          })
        break;
      case 'Evaluate':
        axios.get('http://localhost:8000/blogs')
          .then(res => {
            res.data.blogs?.forEach((value) =>
              value?.category?.title === 'Evaluate'
                ? categories.push(value)
                : '')
            setItem(categories)
            settotalpage(Math.ceil(categories.length / 5))
          })
          .catch(err => {
            console.log('err', err)
          })
        break;
      case 'Health':
        axios.get('http://localhost:8000/blogs')
          .then(res => {
            res.data.blogs?.forEach((value) =>
              value?.category?.title === 'Health'
                ? categories.push(value)
                : '')
            setItem(categories)
            settotalpage(Math.ceil(categories.length / 5))
          })
          .catch(err => {
            console.log('err', err)
          })
        break;

      default:
        axios.get('http://localhost:8000/blogs')
          .then(res => {
            res.data.blogs?.forEach((value) =>
              value?.category?.title === 'Any'
                ? categories.push(value)
                : '')
            setItem(categories)
            settotalpage(Math.ceil(categories.length / 5))
          })
          .catch(err => {
            console.log('err', err)
          })
        break;
    }
  }
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <nav aria-label="breadcrumb" className="breadcrumb-style1 mb-10">
        <div className="container">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Blog</li>
          </ol>
        </div>
      </nav>
      {/*== Start Blog Area Wrapper ==*/}
      <section className="section-space pt-0">
        <div className="container">
          <div className="row justify-content-between flex-xl-row-reverse">
            <div className="col-xl-8">
              <div className="row" style={{ padding: "10px 0 0 0 " }}>
                {fetchData()}
              </div>
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
            <div className="col-xl-4">
              <div className="blog-sidebar-widget">
                <div className="blog-search-widget">
                  <div>
                    <input type="search" onChange={e => setSearch(e.target.value)} placeholder="Search Here" />
                    <button type="submit" onClick={handleSearch}><i className="fa fa-search" /></button>
                  </div>
                </div>
                {<Category handleCategory={handleCategory} />}
                <div className="blog-widget">
                  <h4 className="blog-widget-title">Recent Posts</h4>
                  <div className="blog-widget-post">
                    {fetchRecentPost()}
                  </div>
                </div>
              </div>
            </div>
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
      {/*== End News Letter Area Wrapper ==*/}
    </>
  )
}
export default Blog