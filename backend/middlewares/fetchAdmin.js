import jwt from "jsonwebtoken";
const JWT_SECRET = 'Sahid4@#' ;
  
// const JWT_SECRET = process.env.JWT_SECRET;

const fetchAdmin = (req,res,next) => {
   // Get the user from the jwt token and add id to req object

   const token = req.header('auth-token');
   if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
}
 
   try { 
    console.log("Received Token:", token);
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user; // Attach user data to request
    next();
   }catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
}  
 
}

export default fetchAdmin
