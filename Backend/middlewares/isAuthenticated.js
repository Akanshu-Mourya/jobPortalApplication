import jwt from "jsonwebtoken";

// this is middle ware to check user,company are Authenticate 
// if user is Authenticate it move in next step
// if user is not Authenticate it throw an error

const isAuthenticated = async (req, resp, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resp.status(401).json({
                message: "User not Authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return resp.status(401).json({
                message: "Invalid token",
                success: false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {

    }
}
export default isAuthenticated;