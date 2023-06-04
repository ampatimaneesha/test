import  express  from "express";
import {getUsers,createUser, loginUser, uploadProfilePicture} from "../controllers/users.js";
import auth from "../middleware/auth.js";


const router = express.Router();

// router.get("/",getUsers);
router.post("/",createUser);
router.post("/login",loginUser);
router.put("/profile-picture",auth, uploadProfilePicture )


export default router;