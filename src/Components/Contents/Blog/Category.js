import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


function Category({ handleCategory }) {
    const [getItem, setItem] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/category-blogs")
            .then(response => {
                setItem(response.data.category)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])
    function fetchData() {
        if (getItem.length > 0) {
            return getItem.map((value, key) => {
                return (
                <li>
                    <a onClick={e => handleCategory(e)}>{value.title}</a>
                </li>
                )
            })
        }
    }

    return (
        <div className="blog-widget">
            <h4 className="blog-widget-title">Popular Categoris</h4>
            <ul className="blog-widget-category">
                {getItem?.map((e,i)=>(
                    <Link to={"/blog/filter/"+e.title} state={{data:e.title}} key={i}>
                        <li >
                            <a>{e.title}</a>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
export default Category