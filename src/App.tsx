import { useEffect } from 'react'
import { GiftsModal } from './components/gift-modal/GiftsModal'
import { giftStore } from './shared/stores/root-store'

function App() {
	useEffect(() => {
		const tg = window.Telegram?.WebApp

		tg?.ready()
		tg?.expand()
	}, [])

	const handleOpenModal = () => {
		const tg = window.Telegram?.WebApp

		const desktopPlatforms = ['tdesktop', 'weba', 'webk', 'macos']
		const isDesktop = tg
			? desktopPlatforms.includes(tg.platform)
			: true

		if (
			tg &&
			!isDesktop &&
			tg.isVersionAtLeast('8.0') &&
			!tg.isFullscreen
		) {
			tg.requestFullscreen()
		}

		giftStore.openModal()
	}

	return (
		<div className="app">
			<button
				className="button-open"
				onClick={handleOpenModal}
			>
				Открыть модалку
			</button>

			<GiftsModal />
		</div>
	)
}

export default App