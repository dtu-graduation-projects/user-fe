import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Category from "./Category"
function BlogFilter() {
  const [getItem, setItem] = useState("")
  const [search, setSearch] = useState('')
  const location = useLocation()
  const [gettotalblog, settotalblog] = useState("")
  useEffect(() => {
    axios.get(`http://localhost:8000/blogs`)
      .then(response => {
        const result = response.data.blogs.filter(e => (e.category.title.includes(location.state.data)))
        setItem(result)
        settotalblog(response.data.blogs)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [location])
  function fetchData() {
    if (getItem?.length > 0) {
      return getItem.filter((e) => {
        return search.toLowerCase() === ""
          ? e : e.title.toLowerCase().includes(search)
      })?.map((value, key) => {
        const setimage = value.images["0"]
        return (
          <div className="col-sm-6 col-lg-4 col-xl-6 mb-8" key={key}>
            <div className="post-item">
              <Link to={`/blog-details/${value?._id}`} id={value._id}>
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
        const setimage = value.images["0"]
        if (gettotalblog?.length - 3 <= key) {
          return (
            <div className="blog-widget-single-post" key={key}>
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
            </div>
            <div className="col-xl-4">
              <div className="blog-sidebar-widget">
                <div className="blog-search-widget">
                  <div>
                    <input type="search" onChange={e => setSearch(e.target.value)} placeholder="Search Here" />
                  </div>
                </div>
                <Category />
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
export default BlogFilter