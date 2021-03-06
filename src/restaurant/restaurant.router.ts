import { ModelRouter } from "../common/model-router";
import * as restify from "restify"
import { NotFoundError } from "restify-errors";
import { Restaurant } from "./restaurant.model";

class RestaurantsRouter extends ModelRouter<Restaurant>{
	constructor(){
		super(Restaurant)
	}

	findMenu = (req, res, next) => {
		Restaurant.findById(req.params.id, "+menu")
		.then(rest => {
			if(!rest){
				throw new NotFoundError("Restaurant Not Found")
			} else {
				res.json(rest.menu);
				return next()
			}
		}).catch(next)
	};

	replaceMenu = (req, res, next) => {
		Restaurant.findById(req.params.id)
		.then(rest => {
			if(!rest){
				throw new NotFoundError("Restaurant Not Found")
			} else {
				rest.menu = req.body;
				return rest.save(req.menu)
			}
		}).then(rest => {
			res.json(rest.menu);
			return next()
		}).catch(next())
	};

	applyRouter(application: restify.Server) {
		application.get("/restaurants", this.findAll);
		application.get('/restaurants/:id', [this.validateId, this.findById]);
		application.post("/restaurants", this.save);
		application.put("/restaurants/:id", [this.validateId, this.replace]);
		application.patch("/restaurants/:id", [this.validateId, this.update]);
		application.del('/restaurants/:id', [this.validateId, this.delete]);

		application.get("/restaurants/:id/menu", [this.validateId, this.findMenu]);
		application.put("/restaurants/:id/menu", [this.validateId, this.replaceMenu])

	} //End of applyRouter()
}

export const restaurantsRouter = new RestaurantsRouter();