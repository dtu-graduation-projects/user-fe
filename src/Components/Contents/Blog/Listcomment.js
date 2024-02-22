import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../../UserContext"

function Listcomment(props) {
    const [comment, setcomment] = useState("")
    const getDataUser = JSON.parse(localStorage.getItem("User"))
    let blog = useParams()
    const handleDelete = (commentId) => {
        let accessToken = getDataUser.token
        let config = {
            headers: {
                'token': 'bearer ' + accessToken,
            }
        }

        axios.delete(`http://localhost:8000/blogs/comment/${blog.id}/${commentId}`, config)
            .then(res => {
                toast.success('Xóa Thành Công !')
                props.getcmt("ok")
            })
            .catch(err => {
                toast.error('Xóa Thất Bại !')
            })
    }
    function fetchData() {
        const getComment = props.getComment
        if (getComment.length > 0) {
            return getComment.map((value, key) => {
                return (
                    <div className="comment_box" style={{ marginBottom: '32px' }}>
                        <img className="media_man" src={value?.userId?.avatar} alt="" />
                        <div className="media-body">
                            <div className="custom_flex">
                                <h5 className="custom_para">{value?.userId?.firstname} {value?.userId?.lastname} <span>{value.date}</span></h5>
                                <div style={{ paddingLeft: '20px', cursor: 'pointer' }} class="dropdown">
                                    <p data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v"></i>
                                    </p>
                                    <ul class="dropdown-menu">
                                        <li><a onClick={e => handleDelete(value._id)} class="dropdown-item">Xóa Bình Luận</a></li>
                                    </ul>
                                </div>
                            </div>
                            <p className="blog_details_para">{value.content}</p>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <>
            <div className="comment_wrapper">
                <div className="container">
                    <h2 className="head_text">Recent Comment</h2>
                </div>
            </div>
            {fetchData()}
        </>
    )
}
export default Listcomment