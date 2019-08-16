import isEmpty from "../helper/isEmpty";
import randomstring from 'randomstring'

export default class Security {
	readonly JWT_SECRET: string;
	constructor() {
		var secret = process.env.JWT_SECRET;
		if (!isEmpty(secret)) {
			this.JWT_SECRET = secret;
		} else {
			secret = randomstring.generate({length:64, charset : 'alphanumeric' })
			this.JWT_SECRET = secret;
			console.log("Token secret for this session is: "+  secret)
		}
	}
}
