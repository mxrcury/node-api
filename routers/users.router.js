const { UserController } = require('../controllers/user.controller')
const { Router } = require('../core/Router')

const router = new Router()


router.get('/users',UserController.getAllUsers)
router.post('/users',UserController.createUser)
router.get('/user/:id',UserController.getOneUser)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)


module.exports = { router }