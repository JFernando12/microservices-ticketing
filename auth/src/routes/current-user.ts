import { Router } from "express";

const router = Router();

router.get('/currentuser', (req, res) => {
    res.send('Soy en currentuser');
})

export { router as currentuserRouter };