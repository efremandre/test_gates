import {
	giftsNFT,
	giftsNoNFT,
	type Gift,
} from './mok/gifts'

export type GiftTab = 'giftsNFT' | 'giftsNoNFT'

export async function getGifts(tab: GiftTab): Promise<Gift[]> {
	await new Promise(resolve => setTimeout(resolve, 300))

	const gifts = tab === 'giftsNFT'
		? giftsNFT
		: giftsNoNFT

	return gifts.map(gift => ({ ...gift }))
}

export async function getGiftsCount() {
	await new Promise(resolve => setTimeout(resolve, 300))

	return {
		giftsNFT: giftsNFT.length,
		giftsNoNFT: giftsNoNFT.length,
	}
}