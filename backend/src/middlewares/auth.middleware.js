const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model.js");

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ error: "No token found" });
        }
        if(await blacklistTokenModel.findOne({ token })) {
            return res.status(401).json({ error: "Token is invalid" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {authUser};