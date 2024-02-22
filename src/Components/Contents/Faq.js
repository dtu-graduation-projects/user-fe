function Faq() {
  return (
    <>
      {/*== Start Page Header Area Wrapper ==*/}
      <nav aria-label="breadcrumb" className="breadcrumb-style1">
        <div className="container">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Faq</li>
          </ol>
        </div>
      </nav>
      {/*== Start Faq Area Wrapper ==*/}
      <section className="faq-area">
        <div className="container">
          <div className="row flex-xl-row-reverse">
            <div className="col-lg-6 col-xl-7">
              <div className="faq-thumb">
                <img src="assets/images/photos/faq-home.webp" width={601} height={368} alt="Image" />
              </div>
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="faq-content">
                <div className="faq-text-img"><img src="assets/images/photos/faq.webp" width={199} height={169} alt="Image" /></div>
                <h2 className="faq-title">Frequently Questions</h2>
                <div className="faq-line" />
                <p className="faq-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the industry's standard</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="accordion" id="FaqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                      Mauris congue euismod purus at semper. Morbi et vulputate massa?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                      Donec mattis finibus elit ut tristique?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                      Aenean elit orci, efficitur quis nisl at, accumsan?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading4">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                      Pellentesque habitant morbi tristique senectus et netus?
                    </button>
                  </h2>
                  <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading5">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                      Nam pellentesque aliquam metus?
                    </button>
                  </h2>
                  <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading6">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                      Aenean elit orci, efficitur quis nisl at?
                    </button>
                  </h2>
                  <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading7">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                      Morbi gravida, nisi id fringilla ultricies, elit lorem?
                    </button>
                  </h2>
                  <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading8">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                      Aenean elit orci, efficitur quis nisl at, accumsan?
                    </button>
                  </h2>
                  <div id="collapse8" className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#FaqAccordion">
                    <div className="accordion-body">
                      <p>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*== End Faq Area Wrapper ==*/}
    </>
  )
}
export default Faq