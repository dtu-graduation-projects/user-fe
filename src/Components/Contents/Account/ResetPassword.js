import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function ForgotPassword() {
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const navigate = useNavigate()
    let params = useParams()
    function handleSubmit(e) {
        e.preventDefault()
        if (password === rePassword) {
            console.log('token :', params.token);
            axios.put('http://localhost:8000/auth/reset-password', { password, token: params.token })
                .then(res => {
                    navigate('/account')
                    toast.success('Đặt lại mật khẩu thành công')
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            toast.error('Password không khớp')
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
                                    <li className="breadcrumb-item active text-dark" aria-current="page">Reset Password</li>
                                </ol>
                                <h2 className="page-header-title">Resset Password</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-space">
                <div className="container">
                    <div className="row mb-n8">
                        <div className="col-lg-6 mb-8">
                            {/*== Start Login Area Wrapper ==*/}
                            <div className="my-account-item-wrap">
                                <div className="my-account-form">
                                    <form>
                                        <div className="form-group mb-6">
                                            <label htmlFor="login_pwsd">Password <sup>*</sup></label>
                                            <input type="password" id="login_pwsd" name="password" onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-6">
                                            <label htmlFor="login_pwsd">Re-Password <sup>*</sup></label>
                                            <input type="password" id="login_pwsd" name="password" onChange={e => setRePassword(e.target.value)} />
                                        </div>
                                        <div className="form-group d-flex align-items-center mb-14">
                                            <button className="btn" onClick={e => handleSubmit(e)}>Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/*== End Login Area Wrapper ==*/}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ForgotPassword