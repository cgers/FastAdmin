import * as passport from "passport";
import { Request, Response } from "express";
//import { DefaultNamingStrategy } from "typeorm";

export async function publicTestGet(request: Request, response: Response) {
	response.status(200).json({ Message: "You have accessed TestGet without authentication.", Date: Date.now() });
}

export async function publicTestPost(request: Request, response: Response) {
	response.status(200).json({ Message: 'Hi ' + request.user.EMail + " you have accessed TestPost with authentication." });
}

export async function publicTestDelete(request: Request, response: Response) {
	response.status(200).json({ Message: "You have accessed TestDelete without authentication.", Date: Date.now() });
}

export async function privateTestGet(request: Request, response: Response) {
	response.status(200).json({ Message: 'Hi ' +  request.user.EMail + " you have accessed TestGet with authentication." , Date: Date.now()});
}

export async function privateTestPost(request: Request, response: Response) {
	response.status(200).json({ Message: 'Hi ' + request.user.EMail + " you have accessed TestPost with authentication.", Date: Date.now()});
}

export async function privateTestDelete(request: Request, response: Response) {
	response.status(200).json({ Message: 'Hi ' + request.user.EMail + " you have accessed TestDelete with authentication.", Date: Date.now() });
}
