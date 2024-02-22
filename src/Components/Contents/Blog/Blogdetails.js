import axios from "axios"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "./Comment"
import './Comment.css'
import Listcomment from "./Listcomment"
import { UserContext } from "../../../UserContext"
import { toast } from "react-toastify"
function Blogdetails(props) {
  const [gettotalblog, settotalblog] = useState("")
  const { getpageKey, setpageKey } = useContext(UserContext)
  const [novalue, setnovalue] = useState("valueao")
  const [getdata1, setdata1] = useState("")
  const [getComment, setcomment] = useState("")
  const [getcheck, setcheck] = useState("")
  const [blog, setBlog] = useState([])
  const [like, setlike] = useState(false)
  const [dislike, setdislike] = useState(false)
  let params = useParams()
  const getDataUser = JSON.parse(localStorage.getItem("User"))
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:8000/blogs`)
      .then(response => {
        settotalblog(response.data.blogs)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get("http://localhost:8000/blogs/get-view/" + params.id)
      .then(response => {
        setdata1(response.data.blog)
        setcomment(response.data.blog.comments)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios.get('http://localhost:8000/blogs?page=1')
      .then(res => {
        setBlog(res.data.blogs.slice(0, 3))
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [getcheck])
  function getcmt(novalue) {
    const concatter = getcheck.concat(novalue)
    setcheck(concatter)
  }
  const handlesetKey = (e) => {
    setpageKey(e.target.id)
  }
  function fetchDataicon() {
    return (
      <>
        <h3 className="blog-detail-title">{getdata1.title}</h3>
        <div className="blog-detail-category">
          <a className="category" href="/">{getdata1?.category?.title}</a>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row">
              <div className="col-md-7">
                <ul className="blog-detail-meta">
                  <li className="meta-admin"><img style={{ width: '32px' }} src={getdata1.author?.avatar} alt="Image" />{getdata1.author?.firstname} {getdata1.author?.lastname}</li>
                  <li>{getdata1.updatedAt}</li>
                </ul>
              </div>
              <div className="col-md-5">
                <div className="blog-detail-social">
                  <span>Share:</span>
                  <a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i className="fa fa-pinterest-p" /></a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener"><i className="fa fa-twitter" /></a>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener"><i className="fa fa-facebook" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  function fetchData() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="blog-detail" dangerouslySetInnerHTML={{ __html: getdata1.description }}>
          </div>
          <ul className="icon-blog" style={{ float: "right", display: "inline-block" }}>
            <li className={"" + (like ? "text-primary" : "")}>
              <i class="fa fa-thumbs-up fa-3x" onClick={handleClickLike} aria-hidden="true"></i>
            </li>
            <li className={"" + (dislike ? "text-primary" : "")}>
              <i class="fa fa-thumbs-down fa-3x" onClick={handleClickdisLike} aria-hidden="true"></i>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  const handleClickLike = () => {
    if (getDataUser == null) {
      toast.error("Vui lòng đăng nhập")
    } else {
      setlike(true)
      setdislike(false)
      let accessToken = getDataUser.token
      let config = {
        headers: {
          'token': 'bearer ' + accessToken,
        }
      }
      const data = {
        blogId: params.id
      }
      axios.post("http://localhost:8000/blogs/like-blog", data, config)
        .then(response => {
          toast.success("Đánh giá thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
  const handleClickdisLike = () => {
    if (getDataUser == null) {
      toast.error("Vui lòng đăng nhập")
    } else {
      setlike(false)
      setdislike(true)
      let accessToken = getDataUser.token
      let config = {
        headers: {
          'token': 'bearer ' + accessToken,
        }
      }
      const data = {
        blogId: params.id
      }
      axios.post("http://localhost:8000/blogs/dislike-blog", data, config)
        .then(response => {
          toast.success("Đánh giá thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <nav aria-label="breadcrumb" className="breadcrumb-style1">
        <div className="container">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Blog Detail</li>
          </ol>
        </div>
      </nav>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Blog Detail Area Wrapper ==*/}
      <section className="section-space pb-0">
        <div className="container">
          {fetchDataicon()}
          {fetchData()}
          <div className="col-12 col-lg-6">
          </div>
          {/* <div className="section-space pb-0">
                <a href="product.html" className="product-banner-item">
                  <img src="assets/images/shop/banner/9.webp" width={1170} height={200} alt="Image-HasTech" />
                </a>
              </div> */}
          {/* <div className="row justify-content-between align-items-center pt-10 mt-4 section-space">
                <div className="col-sm-6">
                  <a href="blog-details.html" className="blog-next-previous">
                    <div className="thumb">
                      <span className="arrow">PREV</span>
                      <img src="assets/images/blog/next-previous1.webp" width={93} height={80} alt="Image" />
                    </div>
                    <div className="content">
                      <h4 className="title">Lorem ipsum dolor amet, consectetur adipiscing.</h4>
                      <h5 className="post-date">February 13, 2022</h5>
                    </div>
                  </a>
                </div>
                  {fetchDataNext()}
              </div> */}
          <Listcomment getComment={getComment} getcmt={getcmt} />
          <Comment idBlog={params.id} getcmt={getcmt} />
        </div>
      </section>
      {/*== End Blog Detail Area Wrapper ==*/}
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
                <div className="col-sm-6 col-lg-4 mb-8">
                  <div className="post-item">
                    <a href={`/blog-details/${e?._id}`} className="thumb">
                      <img src={e?.images} style={{ height: '320px' }} width={370} height={320} alt="Image-HasTech" />
                    </a>
                    <div className="content">
                      <a className="post-category" >{e?.category?.title}</a>
                      <h4 className="title"><a href={`/blog-details/${e?._id}`}>{e?.title}</a></h4>
                      <ul className="meta">
                        <li className="author-info"><span>By:</span> <a href="blog.html">{e?.author?.firstname} {e?.author?.lastname}</a></li>
                        <li className="post-date">{e?.createdAt}</li>
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
      {/*== End News Letter Area Wrapper ==*/}
    </>
  )
}
export default Blogdetails