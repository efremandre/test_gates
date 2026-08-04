
import { makeAutoObservable, runInAction } from 'mobx'
import { getGifts } from '../../api/gifts'

type Gift = {
	id: string
	title: string
	price: number
	image: string
	owned: boolean
	tag: number
}

class GiftStore {
	gifts: Gift[] = [];
	loading = false;

	constructor() {
		makeAutoObservable(this)
	}

	async loadGifts() {
		this.loading = true

		try {
			const gifts = await getGifts()

			runInAction(() => {
				this.gifts = gifts
			})
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const giftStore = new GiftStore()