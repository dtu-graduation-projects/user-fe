import { Link } from "react-router-dom"
function PageNotFound() {
    return (
        <section classname="page-not-found-area">
            <div classname="container">
                <div classname="notfound" style={{ textAlign: "center" }}>
                    <img src="assets/images/photos/page-not-found.webp" width="975" height="538" alt="Image" />
                    <h3 classname="title">Opps! You Lost</h3>
                    <Link to={"/"}>
                        <h5 classname="back-btn">Go to <a >Home</a> Page</h5>
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default PageNotFound