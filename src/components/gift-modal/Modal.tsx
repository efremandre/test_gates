import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { giftStore } from '../../shared/stores/root-store'

export const GiftCard = observer(() => {
	const gifts = giftStore.gifts

	useEffect(() => {
		giftStore.loadGifts()
	}, [])

	return (
		<div>
			{gifts && gifts.map(gift => <div key={gift.id}>{gift.title}</div>)}
		</div>
	)
})