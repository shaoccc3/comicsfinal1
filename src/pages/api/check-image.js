// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios")
import cloudinaryConnect from "@/utils/cloudiniaryConnect";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  await cloudinaryConnect()
  const response = await axios.get("https://cl.imagineapi.dev/items/images/"+req.query.id,{
      headers:  {
        Authorization : `Bearer ${process.env.IMAGINE_API}`,
        'Content-Type': 'application/json'
      }
    })

  if(response.data.data.status == "completed"){
    const images = response.data.data.upscaled_urls
    // const images = [
    //   'https://cl.imagineapi.dev/assets/ea16355f-b422-4837-9326-e6147d6021c6/ea16355f-b422-4837-9326-e6147d6021c6.png',
    //   'https://cl.imagineapi.dev/assets/77c46c74-e70a-4d92-b3e9-f631b833f0fe/77c46c74-e70a-4d92-b3e9-f631b833f0fe.png',
    //   'https://cl.imagineapi.dev/assets/76a62552-e288-46ed-97c2-24016d59b793/76a62552-e288-46ed-97c2-24016d59b793.png',
    //   'https://cl.imagineapi.dev/assets/c7b92154-f95f-41b7-9aa0-cf825c80ccc7/c7b92154-f95f-41b7-9aa0-cf825c80ccc7.png'
    // ]
    const promiseRes = await Promise.all([
      cloudinary.uploader.upload(images[0]),
      cloudinary.uploader.upload(images[1]),
      cloudinary.uploader.upload(images[2]),
      cloudinary.uploader.upload(images[3]),
    ])
    const uploadedUrl = promiseRes.map((result) => result.secure_url);
    let myRes = response.data
    myRes.data.upscaled_urls = uploadedUrl
    console.log(myRes, 'myRes');
    res.send(myRes)
  }else{
    res.send(response.data)
  }
  // res.status(200).json({ name: 'John Doe' })
}

