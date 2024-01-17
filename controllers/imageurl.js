
import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";


const imageurl = (req, res)=>{
     const { imageUrl } = req.body;

const PAT = 'b3b155d011c8496d91bf66396d450b8f';
const USER_ID = 'colm26';
const APP_ID = 'myapp';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const IMAGE_URL = imageUrl;


const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + 'b3b155d011c8496d91bf66396d450b8f');

stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                        allow_duplicate_url: true
                    }
                }
            }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        const regions = response.outputs[0].data.regions;

    
   const boundingBoxes = regions.map(region => {
    const boundingBox = region.region_info.bounding_box;
    const topRow = boundingBox.top_row.toFixed(3);
    const leftCol = boundingBox.left_col.toFixed(3);
    const bottomRow = boundingBox.bottom_row.toFixed(3);
    const rightCol = boundingBox.right_col.toFixed(3);


    return [topRow, leftCol, bottomRow, rightCol] ;
});

Promise.all(boundingBoxes).then(data => {
    res.json(data);
});

})
}



// const imageurl = (req ,res)=>{
// console.log('Request Body:', req.body);
// console.log('Image URL:', req.body.input);
// fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setUpClarifai(req.body.input))
// .then(data=>{
//     console.log('clarifi response ', data)
//     res.json(data)

// })
// .catch(err=>{
//     console.error('Error:', err);
//     res.status(400).json('Unable to work with Clarifai API')
// });
// }


export default imageurl
