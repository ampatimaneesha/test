import  express  from "express";
import {getUsers,createUser, loginUser} from "../controllers/users.js";


const router = express.Router();

router.get("/expense",getUsers);
router.post("/expense",createUser);
router.patch("/expense",loginUser);
router.delete("/expense/:id",loginUser);


export default router;