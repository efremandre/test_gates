interface TelegramWebApp {
	ready(): void
	expand(): void

	isVersionAtLeast(version: string): boolean
	requestFullscreen(): void

	isFullscreen: boolean
	version: string
	platform: string
}

interface Window {
	Telegram?: {
		WebApp: TelegramWebApp
	}
}