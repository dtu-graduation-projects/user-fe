function Footer() {
  return (
    <>
      <footer className="footer-area">
        <div className="footer-main">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="widget-item">
                  <div className="widget-about">
                    <a className="widget-logo" href="index.html">
                      <img src="/assets/images/logo.webp" width={95} height={68} alt="Logo" />
                    </a>
                    <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-5 mt-md-0 mt-9">
                <div className="widget-item">
                  <h4 className="widget-title">Information</h4>
                  <ul className="widget-nav">
                    <li><a href="blog">Blog</a></li>
                    <li><a href="about">About us</a></li>
                    <li><a href="contact">Contact</a></li>
                    <li><a href="faq">Privacy</a></li>
                    <li><a href="accountl">Login</a></li>
                    <li><a href="product">Shop</a></li>
                    <li><a href="myaccount">My Account</a></li>
                    <li><a href="faq">FAQs</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mt-lg-0 mt-6">
                <div className="widget-item">
                  <h4 className="widget-title">Social Info</h4>
                  <div className="widget-social">
                    <a href="https://twitter.com/" target="_blank" rel="noopener"><i className="fa fa-twitter" /></a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener"><i className="fa fa-facebook" /></a>
                    <a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i className="fa fa-pinterest-p" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container pt-0 pb-0">
            <div className="footer-bottom-content">
              <p className="copyright">© 2022 Brancy. Made with <i className="fa fa-heart" /> by <a target="_blank" href="https://themeforest.net/user/codecarnival">Codecarnival.</a></p>
            </div>
          </div>
        </div>
      </footer>
      {/*== End Footer Area Wrapper ==*/}
    </>
  )
}
export default Footer