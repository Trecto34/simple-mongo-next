import { Router } from 'express'
import UserController from './controller/UserController'
import BookController from './controller/BookController'

const routes = Router()

routes.get("/users", UserController.find)
routes.post("/users", UserController.create);
routes.post("/login", UserController.login)

routes.get("/books/:isbn", BookController.create)
routes.post("/books/manual", BookController.createManually)
routes.get("/books", BookController.find)

export default routes;
