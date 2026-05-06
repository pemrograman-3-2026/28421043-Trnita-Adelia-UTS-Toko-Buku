import express from 'express'
import * as controller from '../controllers/buku.controller.js'

const router = express.Router()

router.get('/', controller.getAll)
router.get('/id/:id', controller.getById)
router.post('/', controller.create)
router.put('/edit/:id', controller.update)
router.delete('/delete/:id', controller.remove)

export default router