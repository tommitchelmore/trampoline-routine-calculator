export default {
    helloWorld: (req, res) => {
        res
        .send({ "message": "Hello World!" })
        .status(200)
    }
}