import * as PasswordValidator from "password-validator";

export const PasswordSchema = new PasswordValidator();
PasswordSchema.is()
	.min(8) // Minimum length 8
	.is()
	.max(25) // Maximum length 25
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits() // Must have digits
	.has()
	.not()
	.spaces() // Should not have spaces
	.is()
	.not()
	.oneOf([
		"Password",
		"Password1",
		"Password12",
		"Password123",
		"Password1234",
		"Password12345",
		"Password123456",
		"Password1234567",
		"Password12345678",
		"Password12345679",
		"Password123456710",
		"Passw0rd",		
		"P@$$w0rd",
		"P@$$w0rd123",
		"P@$$w0rd1234",
		"P@$$w0rd12345",
		"P@$$w0rd123456",
		"P@$$w0rd1234567",
		"P@$$w0rd12345678",
		"P@$$w0rd123456789",
		"P@$$w0rd10",
		"P@$$w0rd11",
		"P@$$w0rd12",
		"P@$$w0rd13",
		"Password1234"
	]);
// Blacklist these values
