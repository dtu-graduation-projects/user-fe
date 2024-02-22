import { useEffect } from "react"

function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <section className="page-header-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-lg-7 col-xl-5">
              <div className="page-header-content">
                <div className="title-img"><img src="assets/images/photos/about-title.webp" alt="Image" /></div>
                <h2 className="page-header-title">We, are Rose</h2>
                <h4 className="page-header-sub-title">Best cosmetics provider</h4>
                <p className="page-header-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.</p>
              </div>
            </div>
            <div className="col-md-5 col-lg-5 col-xl-7">
              <div className="page-header-thumb">
                <img src="https://xxivstore.com/wp-content/themes/yootheme/cache/82/cover-822e5984.webp" width={570} height={669} alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Page Header Area Wrapper ==*/}
      {/*== Start Funfact Area Wrapper ==*/}
      <section className="funfact-area section-space">
        <div className="container">
          <div className="row mb-n6">
            <div className="col-sm-6 col-lg-4 mb-6">
              {/*== Start Funfact Item ==*/}
              <div className="funfact-item">
                <div className="icon">
                  <img src="assets/images/icons/funfact1.webp" width={110} height={110} alt="Icon" />
                </div>
                <h2 className="funfact-number">5000+</h2>
                <h6 className="funfact-title">Clients</h6>
              </div>
              {/*== End Funfact Item ==*/}
            </div>
            <div className="col-sm-6 col-lg-4 mb-6">
              {/*== Start Funfact Item ==*/}
              <div className="funfact-item">
                <div className="icon">
                  <img src="assets/images/icons/funfact2.webp" width={110} height={110} alt="Icon" />
                </div>
                <h2 className="funfact-number">250+</h2>
                <h6 className="funfact-title">Projects</h6>
              </div>
              {/*== End Funfact Item ==*/}
            </div>
            <div className="col-sm-6 col-lg-4 mb-6">
              {/*== Start Funfact Item ==*/}
              <div className="funfact-item">
                <div className="icon">
                  <img src="assets/images/icons/funfact3.webp" width={110} height={110} alt="Icon" />
                </div>
                <h2 className="funfact-number">1.5M+</h2>
                <h6 className="funfact-title">Revenue</h6>
              </div>
              {/*== End Funfact Item ==*/}
            </div>
          </div>
        </div>
      </section>
      {/*== End Funfact Area Wrapper ==*/}
      {/*== Start Brand Logo Area Wrapper ==*/}
      <div className="section-space">
        <div className="container">
          <div className="swiper brand-logo-slider-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide brand-logo-item">
                {/*== Start Brand Logo Item ==*/}
                <img src="assets/images/logo.webp" width={155} height={110} alt="Image-HasTech" />
                {/*== End Brand Logo Item ==*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*== End Brand Logo Area Wrapper ==*/}
      {/*== Start About Area Wrapper ==*/}
      <section className="section-space pt-0 mb-n1">
        <div className="container">
          <div className="about-thumb">
            <img src="https://pendecor.vn/uploads/files/2020/10/23/bg5.jpg" alt="Image" />
          </div>
          <div className="about-content">
            <h2 className="title">Best Cosmetics Provider</h2>
            <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel arcu aliquet sem risus nisl. Neque, scelerisque in erat lacus ridiculus habitant porttitor. Malesuada pulvinar sollicitudin enim, quis sapien tellus est. Pellentesque amet vel maecenas nisi. In elementum magna nulla ridiculus sapien mollis volutpat sit. Arcu egestas massa consectetur felis urna porttitor ac.</p>
          </div>
        </div>
      </section>
      {/*== End About Area Wrapper ==*/}
      {/*== Start Feature Area Wrapper ==*/}
      <div className="feature-area section-space">
        <div className="container">
          <div className="row mb-n9">
            <div className="col-md-6 col-lg-4 mb-8">
              {/*== Start Feature Item ==*/}
              <div className="feature-item">
                <h5 className="title"><img className="icon" src="assets/images/icons/feature1.webp" width={60} height={60} alt="Icon" /> Support Team</h5>
                <p className="desc">Lorem ipsum dolor amet, consectetur adipiscing. Ac tortor enim metus, turpis.</p>
              </div>
              {/*== End Feature Item ==*/}
            </div>
            <div className="col-md-6 col-lg-4 mb-8">
              {/*== Start Feature Item ==*/}
              <div className="feature-item">
                <h5 className="title"><img className="icon" src="assets/images/icons/feature2.webp" width={60} height={60} alt="Icon" /> Certification</h5>
                <p className="desc">Lorem ipsum dolor amet, consectetur adipiscing. Ac tortor enim metus, turpis.</p>
              </div>
              {/*== End Feature Item ==*/}
            </div>
            <div className="col-md-6 col-lg-4 mb-8">
              {/*== Start Feature Item ==*/}
              <div className="feature-item">
                <h5 className="title"><img className="icon" src="assets/images/icons/feature3.webp" width={60} height={60} alt="Icon" /> Natural Products</h5>
                <p className="desc">Lorem ipsum dolor amet, consectetur adipiscing. Ac tortor enim metus, turpis.</p>
              </div>
              {/*== End Feature Item ==*/}
            </div>
          </div>
        </div>
      </div>
      {/*== End Feature Area Wrapper ==*/}
    </>
  )
}
export default About