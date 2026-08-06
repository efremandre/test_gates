import { makeAutoObservable, runInAction } from 'mobx'
import {
	getGifts,
	getGiftsCount,
	type GiftTab
} from '../../api/gifts'

type GiftsCount = Record<GiftTab, number>

export type Gift = {
	id: string
	title: string
	price: number
	image: string
	owned: boolean
	tag: number
}

class GiftStore {
	gifts: Gift[] = []
	loading = false
	isModalOpen = false
	activeTab: GiftTab = 'giftsNoNFT'
	giftsCount: GiftsCount = {
		giftsNFT: 0,
		giftsNoNFT: 0,
	}

	constructor() {
		makeAutoObservable(this)
	}

	async setActiveTab(tab: GiftTab) {
		if (this.activeTab === tab) return

		this.activeTab = tab
		await this.loadGifts()
	}

	get selectedGifts() {
		return this.gifts.filter(gift => gift.owned)
	}

	get selectedCount() {
		return this.selectedGifts.length
	}

	get selectedTotalPrice() {
		return this.selectedGifts.reduce(
			(total, gift) => total + gift.price,
			0
		)
	}

	get isAllSelected() {
		return (
			this.gifts.length > 0 &&
			this.gifts.every(gift => gift.owned)
		)
	}

	toggleGift(id: string) {
		const gift = this.gifts.find(gift => gift.id === id)

		if (!gift) return

		gift.owned = !gift.owned
	}

	selectAll() {
		this.gifts.forEach(gift => {
			gift.owned = true
		})
	}

	clearSelection() {
		this.gifts.forEach(gift => {
			gift.owned = false
		})
	}

	openModal() {
		this.isModalOpen = true
	}

	closeModal() {
		this.isModalOpen = false
	}

	async loadGiftsCount() {
		const count = await getGiftsCount()

		runInAction(() => {
			this.giftsCount = count
		})
	}

	async loadGifts() {
		this.loading = true

		try {
			const gifts = await getGifts(this.activeTab)

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