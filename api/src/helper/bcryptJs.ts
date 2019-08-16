import * as bcryptjs from "bcryptjs";

export function comparePassword(hash: string, candidatePassword: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		bcryptjs.compare(candidatePassword, hash, (err, success) => {
			if (err) return reject(err);
			return resolve(success);
		});
	});
}

export function hashPassword(candidatePassword: string): Promise<string> {
	return new Promise((resolve, reject) => {
		bcryptjs.hash(candidatePassword, 10, (err, success) => {
			if (err) return reject(err);
			return resolve(success);
		});
	});
}
