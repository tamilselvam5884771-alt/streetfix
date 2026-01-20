import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'Unauthorized,Login again' })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // FIXED: Changed tokenDecode.id to tokenDecode.userId to match the sign payload in authController
        if (tokenDecode.userId) {
            if (!req.body) req.body = {};
            req.body.userId = tokenDecode.userId;
        } else {
            return res.json({ success: false, message: 'Unauthorized,Login again' })
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export default userAuth;
