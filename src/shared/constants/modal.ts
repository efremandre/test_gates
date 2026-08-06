const giftPluralRules = new Intl.PluralRules('ru-RU')

const getGiftWord = (count: number) => {
	const pluralForm = giftPluralRules.select(Math.abs(count))

	switch (pluralForm) {
		case 'one':
			return 'подарок'

		case 'few':
			return 'подарка'

		default:
			return 'подарков'
	}
}


export const MODAL_TEXT = {
	title: 'Выберите подарок(-и)',
	description: 'Choose one gift',
	choose_all: 'Выбрать все',
	clear_all: 'Очистить выбор',
	tabLeft: 'NFT',
	tabRight: 'No NFT',
	dot: '•',
	getButtonText: (count: number) => {
		return `Поставить ${count} ${getGiftWord(count)}`
	},
} as const