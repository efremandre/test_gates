import { gifts } from './mok/gifts'

export async function getGifts() {
	await new Promise(resolve => setTimeout(resolve, 300))

	return gifts
}