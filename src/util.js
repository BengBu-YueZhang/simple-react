export function assign(obj, props) {
	if (props) {
		return Object.assign(obj, props)
	}
	return obj
}
