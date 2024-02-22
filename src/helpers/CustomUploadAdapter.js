import axios from 'axios'
let getDataUser = JSON.parse(localStorage.getItem("User"))
let url = "http://localhost:8000/blogs/upload-cke"
let config = {
}
if (getDataUser){
    let accessToken = getDataUser.token
    config = {
    headers: {
        'token': 'Bearer ' + accessToken,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    }
}
}

export default class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader
    }
    upload = () => {
            return this.loader.file.then(file => new Promise((resolve, reject) => {
                const formData = new FormData()
                formData.append('image', file)
                axios.post(url, formData, config)
                    .then(res => {
                        resolve({
                            default: res.data.path
                        })
                    })
                    .catch(err => {
                        reject(err)
                    })
            }))   
    }
}