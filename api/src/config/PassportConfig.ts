import isEmpty from "../helper/isEmpty";
import { ExtractJwt, Strategy } from "passport-jwt";
import PortalUser from "../entity/User";
import * as passport from "passport";
import  Security from "./Security";
import { ConnectionManager, EntitySchema, getManager, getRepository } from "typeorm";

class PassportConfig {

	public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

	public initialize = () => {
		passport.use("jwt", this.getStrategy());
		return passport.initialize();
	};

	private getStrategy = (): Strategy => {
		const security = new Security();
		const params : any = {
			jsonWebTokenOptions: {
				algorithms: "HS384",
				ignoreExpiration: false,
				maxAge: "2h",
			},
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			passReqToCallback: true,
			secretOrKey: security.JWT_SECRET,
		};

		return new Strategy(params, (req, payload: any, done) => {
			const UserRepository = getManager("PORTAL").getRepository(PortalUser);
			const UserGuid: string = !isEmpty(payload.id) ? payload.id.toString() : "9999999";
			UserRepository.findOne({ where: { idPortalUserGuid: UserGuid } })
				.then((User) => {
					if (User) {
						return done(undefined, User);
					}
					return done(undefined, false, { message: "The user in the token was not found" });
				})
				.catch((error) => {
					throw new error(error);
					// console.error(`Auth:getStrategy:UserRepository.find threw an error: ${error}`);
				});
		});
	};
}

export default new PassportConfig();
