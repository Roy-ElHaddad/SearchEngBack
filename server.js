import config from "./configure.js";
import express  from "express"
import cors from "cors"

const app = express()
let param = ''

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/store-data", (req , res) =>{
    param = req.body.searchvalue
    console.log(param)
    res.send("works")
})

app.get("/images", async (req, res) =>{
    let URL = "https://pixabay.com/api/?key="+config.API_KEY+"&q="+encodeURIComponent(param)
    let str = [] 
    console.log(URL)
    const response = await fetch(URL)
    const data  = await response.json()
    let content = data.hits 
    if (content && content.length > 0)
    {
        content.map((item, index) => {
            str[index] = item.webformatURL
        })
        res.send(str)
    }    
})

app.listen(5000)