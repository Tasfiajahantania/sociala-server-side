const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());

const user = 'sociala'
const password = 'f388MHgRckoEI3XY';

const uri = `mongodb+srv://${user}:${password}@cluster0.hdi07kd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// function verfiyJwt(req, res, next){
//     const authHeader = req.headers.authorization;
//     if(!authHeader){
//         res.status(401).send({message: "Unauthorized Access"})
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN, function(error, decoded){
//         if(error){
//             res.status(401).send({message: "Unauthorized Access"})
//         }
//         req.decoded = decoded;
//         next()
//     })

// }

async function run() {
    try {
        const postCollection = client.db('sociala').collection('post');
        app.get('/sociala-post', async(req, res) => {
            const query = {};
            const post = await postCollection.find(query).sort({_id: -1}).toArray();
            res.send(post);

        })
        app.get('/sociala-top-post', async(req, res) => {
            const query = {};
            const post = await postCollection.find(query).limit(3).sort({like: -1}).toArray();
            res.send(post);

        })
        
        app.post('/sociala-post', async(req, res) => {
            // console.log(req.body)
            const data = req.body;
            const result = await postCollection.insertOne(data);
            res.send(result)
        })

        app.put('/post/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            // const filter = { _id: ObjectId(id) }
            // const likedata = req.body;
            // const options = { upsert: true };
            // console.log(post)
            // const updatepost = {
            //     $set: {
            //         like: likrd,
            //     },
            // }
            // const result = await postCollection.updateOne(filter, updatepost, options)
            // console.log(result)
            // res.send(result)
        })
        

    }
    finally {

    }
}
run().catch(error => {
    console.log(error);
})

// app.post('/jwt', (req, res) => {
//     const user = req.body;
//     const token = jwt.sign( user, process.env.ACCESS_TOKEN, {expiresIn: '1h'})
//     res.send({token})
// })
app.get('/', (req, res) => {
    res.send("sociala server is running...");
})

app.listen(port, () => {
    console.log("sociala server is running on", {port})
})