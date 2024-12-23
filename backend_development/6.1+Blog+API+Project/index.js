//Server part of the code that send API response to the client
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CHALLENGE 1: GET All posts
app.get('/posts', (req, res) => {
  res.json(posts)
})

//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id', (req, res) => {
  //getting hold of the body and req params(id)
  const {params: {id}} = req
  //converting the id to an integer value
  const intId =  parseInt(id);
  //Checking whether "intId" is a valid integer
  //opposite of 'isNaN' is '!isNaN'
  if(!isNaN(intId)){
    //retrieving the post which id matches the req.params.id and assigning it to a variable "findPost"
    const findPost = posts.find((post) => post.id === intId);
    //checking if findPost does not exist
    if(findPost){
      return res.json(findPost)
    } else {
      return res.status(404).json({error: `message not found`});
    }
  }else{
    return res.status(404).json({error: `Bad Request. invalid ID.`})
  }
})
//CHALLENGE 3: POST a new post
app.post('/posts', (req, res) => {
  const {body} = req
  //creating a new object 
  const newPost = {id: lastId + 1, title: body.title, content: body.content, author: body.author, date: currentDate}
  posts.push(newPost);
  return res.status(201).json(newPost)
})
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req, res) => {
  const {body, params: {id}} = req;
  const intId = parseInt(id)
  if(!isNaN(intId)){
    //finding the post in the array
    const targetPost = posts.find(post => post.id === intId) 
    //finding the index position of the selected post in the post array
    const postIndex  = posts.findIndex(post => post.id === intId)
    //checking if the post exist in the array
    if(postIndex !== -1){
      //updating the post with retrieved index
      posts[postIndex] = {
        id: intId,
        title: body.title || targetPost.title,
        content: body.content || targetPost.content,
        author: body.author || targetPost.author,
      }
      return res.json(posts[postIndex])
    }else{
      return res.status(404).json({error: `message not found`});
    }
  }else{
    return res.status(404).json({error: `Bad Request. invalid ID.`})
  }
})

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id', (req, res) => {
  const {params: {id}} = req;
  const intId = parseInt(id)
  if(!isNaN(intId)){
    //finding the post in the array
    const postIndex = posts.findIndex(post => post.id !== intId)
    if(postIndex === -1) return res.status(404).json({ message: "Post not found" })
    posts.splice(postIndex, 1)
    return res.json({message: 'post deleted'})
  }else{
    return res.status(404).json({error: `Bad Request. invalid ID.`})
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
