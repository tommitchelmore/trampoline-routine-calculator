export default {
    helloWorld: async (req, res) => {
        res
        .send({ "message": "Hello World!" })
        .status(200)
    }
}