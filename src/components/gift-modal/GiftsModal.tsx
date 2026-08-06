import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { giftStore } from '../../shared/stores/root-store'
import { Footer } from './footer/Footer'
import { Grid } from './grid/Grid'
import { Header } from './header/Header'
import s from './GiftsModal.module.scss'

export const GiftsModal = observer(() => {

	const [isClosing, setIsClosing] = useState(false)
	useEffect(() => {
		giftStore.loadGifts()
	}, [])

	if (!giftStore.isModalOpen) {
		return null
	}

	const handleClose = () => {
		setIsClosing(true)
	}

	const handleAnimationEnd = () => {
		if (!isClosing) return

		giftStore.closeModal()
		setIsClosing(false)
	}

	return (
		<div className={`${s.overlay} ${isClosing ? s.overlayClosing : ''
			}`}
			onAnimationEnd={handleAnimationEnd}>
			<div
				className={`${s.body} ${isClosing ? s.bodyClosing : ''}`}
				onClick={event => event.stopPropagation()}
			>
				<Header handleClose={handleClose} />
				<Grid gifts={giftStore.gifts} />
				<Footer />
			</div>
		</div>
	)
})