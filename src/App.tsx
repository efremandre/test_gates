import { useEffect } from 'react'
import { GiftCard } from './components/gift-modal/Modal'

function App() {
	useEffect(() => {
		const tg = window.Telegram?.WebApp

		tg?.ready()
		tg?.expand()
	}, [])

	return (
		<>
			<GiftCard />
		</>
	)
}

export default App
