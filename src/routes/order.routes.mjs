import { Router } from "express";
const router = Router();

router.post('/agregarOrden', test);

async function test({ res }) {
    console.log("Hello, World!");

    res.status(200).json({ message: 'Hello, World!' });
}



export default router;