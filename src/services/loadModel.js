const tf = require('@tensorflow/tfjs-node');

async function loadModel(){
    const modelUrl = 'https://storage.googleapis.com/mlgc-model-bucket-1/model-in-prod/model.json';
    console.log(`loading model fom: ${modelUrl}`);

    if(!modelUrl){
        throw new Error('MODEL_URL env variable is not set or empty');
    }

    const model = await tf.loadGraphModel(modelUrl);
    console.log(`Model debug success`);
    return model;
}

module.exports = loadModel;
