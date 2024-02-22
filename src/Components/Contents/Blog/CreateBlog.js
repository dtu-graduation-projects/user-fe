import axios from "axios"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from "../../../helpers/CustomUploadAdapter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
function CreateBlog() {
    const [loading,setLoading] = useState(false)
    const override= {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    let getDataUser = JSON.parse(localStorage.getItem("User"))
    const [getItem, setItem] = useState("")
    const [inputs, setInputs] = useState({
        title: ""
    })
    const navigate = useNavigate()
    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState("")
    const [getdata, setdata] = useState("")
    const [getselectcategory, setselectcategory] = useState("")
    const handleselectcategory = (e) => {
        setselectcategory(e.target.value)
    }
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    useEffect(() => {
        axios.get("http://localhost:8000/category-blogs")
            .then(response => {
                // console.log(response.data.category)
                setItem(response.data.category)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])
    function fetchdataCatergory() {
        if (getItem.length > 0) {
            return getItem.map((value, key) => {
                return (
                    <option value={value._id} key={key}>{value.title}</option>
                )
            })
        }
    }
    function handleFile(e) {
        const file = e.target.files
        setFile(e.target.files)
        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(file[0])
        // console.log(reader)
    }

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your back-end here!
            return new CustomUploadAdapter(loader);
        };
    }

    function handleSubmit(e) {
        e.preventDefault()
        let flag = true
        let errorSubmit = {}
        if (!getDataUser) {
            flag = false
            toast.error("Ban phai dang nhap truoc");            
        }else{
            if (inputs.title == "") {
                errorSubmit.title = "Nhap title"
                flag = false
                toast.error(""+errorSubmit.title);
            }
            if (getselectcategory == "") {
                errorSubmit.category = "Nhap category"
                flag = false
                toast.error(""+errorSubmit.category);
            }
            if (!flag) {
                setErrors(errorSubmit)
            }
            if (getFile == "") {
                errorSubmit.files = "Chon hinh anh"
                flag = false
                toast.error(""+errorSubmit.files);
            } else {
                Object.keys(getFile).map((item,i)=>{
                    let checkImg = ["png", "jpg", "jpeg", "PNG", "JPG"]
                    let getsize = getFile[item].size
                    let getname = getFile[item].name
                    let test = getname.split(".")
                    let test1 = checkImg.includes(test[1])
                    if (getsize > 1024 * 1024) {
                        errorSubmit.files = "File qua lon"
                        toast.error("File qua lon");
                    } else if (!checkImg.includes(test[1])) {
                        errorSubmit.files = "Sai dinh dang"
                        toast.error("Sai dinh dang");
                    }
                })
            }
            if (flag) {
                setLoading(true)
                let url = "http://localhost:8000/blogs/create-blog"
                let accessToken = getDataUser.token
                let config = {
                    headers: {
                        'token': 'Bearer ' + accessToken,
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                }
                const formData = new FormData()
                formData.append("title", inputs.title)
                // console.log(inputs.title)
                formData.append("description", getdata)
                // console.log(getdata)
                formData.append("category", getselectcategory)
                Object.keys(getFile).map((item, i) => {
                    formData.append("images", getFile[item])
                })
                axios.post(url, formData, config)
                    .then(response => {
                        toast.success("Đăng bài thành công", {
                        position: toast.POSITION.TOP_RIGHT,                       
                        });
                        navigate("/blog")
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
    return (
        <>
        {
            loading ? <ClipLoader
            loading={loading}
            size={75}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
            /> : 
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Blog</h3></div>
                        <div className="card-body">
                            <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input onChange={handleInput} className="form-control" id="inputTitle" type="name" name="title" placeholder="title" />
                                    {errors.title}
                                    <label for="inputTitle">Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select onChange={handleselectcategory}>
                                        <option value="">Please choose Category</option>
                                        {fetchdataCatergory()}
                                    </select>
                                    {errors.category}
                                </div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log( 'Editor is ready to use!', editor );
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setdata(data)
                                    }}
                                    config={{
                                        extraPlugins: [MyCustomUploadAdapterPlugin],
                                    }}
                                />
                                <div className="form-floating mb-3">
                                    <input type="file" name="files" onChange={handleFile} multiple />
                                    {errors.files}
                                </div>
                                <div className="mt-4 mb-0">
                                    <div className="d-grid"><button type="submit" className="btn btn-primary btn-block">Create Blog</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}
export default CreateBlog