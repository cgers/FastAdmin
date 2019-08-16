/**
 * Class for error handling and field validation.
 */

class Error implements Error {
	field: string;
	displayField: string;
	message: string;
	constructor(Field: string, DisplayField: string, Message: string) {
		this.field = Field;
		this.displayField = DisplayField;
		this.message = Message;
	}
}

export default Error;
