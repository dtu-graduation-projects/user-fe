import { useState } from "react"
import axios from "axios"
import Register from "./Register"
import Login from "./Login"
function Account() {
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <section className="page-header-area pt-10 pb-9" data-bg-color="#FFF3DA">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="page-header-st3-content text-center text-md-start">
                <ol className="breadcrumb justify-content-center justify-content-md-start">
                  <li className="breadcrumb-item"><a className="text-dark" href="index.html">Home</a></li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">Account</li>
                </ol>
                <h2 className="page-header-title">Account</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Account Area Wrapper ==*/}
      <section className="section-space">
        <div className="container">
          <div className="row mb-n8">
            <div className="col-lg-6 mb-8">
              {/*== Start Login Area Wrapper ==*/}
              <div className="my-account-item-wrap">
                <h3 className="title">Login</h3>
                {Login()}
              </div>
              {/*== End Login Area Wrapper ==*/}
            </div>
            <div className="col-lg-6 mb-8">
              {/*== Start Register Area Wrapper ==*/}
              {Register()}
              {/*== End Register Area Wrapper ==*/}
            </div>
          </div>
        </div>
      </section>
      {/*== End Account Area Wrapper ==*/}
    </>
  )
}
export default Account