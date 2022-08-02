import { Router } from "express";

const router = Router();

router.post('/signout', (req, res) => {
    res.send('Soy en signout');
})

export { router as signoutRouter };