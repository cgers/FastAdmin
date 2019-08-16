/**
 * Function to test if an object is empty or null or has zero length
 * @param value any value or object or function
 */
const IsEmpty = (value: any) => {
	return value === undefined ||
		value === null ||
		(Array.isArray(value) && value.length === 0) ||
    	(Array.isArray(value) && value.length === 1 && value[0].length === 0) ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
		? true
		: (() => {
			for (const prop in value) {
				if (Object.prototype.hasOwnProperty.call(value, prop)) {
					return false;
				}
			}
			return true;
		})();
};

export default IsEmpty;
