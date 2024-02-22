import axios from "axios"
import { useState } from "react"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function ForgotPassword() {
    const [email, setEmail] = useState('')

    function handleSubmit() {
        axios.post('http://localhost:8000/auth/forgot-password', { email })
            .then(res => {
                console.log('vui longf kieemr tra gmail')
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <section className="page-header-area pt-10 pb-9" data-bg-color="#FFF3DA">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="page-header-st3-content text-center text-md-start">
                                <ol className="breadcrumb justify-content-center justify-content-md-start">
                                    <li className="breadcrumb-item"><a className="text-dark" href="index.html">Home</a></li>
                                    <li className="breadcrumb-item active text-dark" aria-current="page">Account</li>
                                </ol>
                                <h2 className="page-header-title">Forgot Password</h2>
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
                                <h3 className="title">Find your account</h3>
                                <div className="my-account-form">
                                    <form action="https://mail.google.com/" method="post" onSubmit={handleSubmit}>
                                        <div className="form-group mb-6">
                                            <label htmlFor="login_username">Email Address <sup>*</sup></label>
                                            <input type="email" id="login_username" name="email" onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group d-flex align-items-center mb-14">
                                            <button className="btn">Send</button>
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