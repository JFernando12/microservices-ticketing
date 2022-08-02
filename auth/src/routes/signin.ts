import { Router } from "express";

const router = Router();

router.post('/signin', (req, res) => {
    res.send('Soy en signin');
})

export { router as signinRouter };