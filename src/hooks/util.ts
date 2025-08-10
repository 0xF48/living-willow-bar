export function randomItem(items: any[]) {
	const i = Math.floor(Math.random() * items.length)
	return items[i]
}