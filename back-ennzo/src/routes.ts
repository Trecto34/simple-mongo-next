import { Router } from 'express'
import UserController from './controller/UserController'
import BookController from './controller/BookController'

const routes = Router()

routes.get("/users", UserController.find)
routes.post("/user", UserController.create);

routes.get("/books/:isbn", BookController.create)
routes.get("/books", BookController.find)

export default routes;
