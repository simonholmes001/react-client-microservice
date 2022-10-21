const filePath = "../backend/assets/";

exports.getImage = (req, res, next) => {
    const input = req.query.input;
    res.download(filePath + input)
};