export const MODAL_TEXT = {
	title: 'Выберите подарок(-и)',
	description: 'Choose one gift',
	choose_all: 'Выбрать все',
	clear_all: 'Очистить выбор',
	tab_left: 'NFT',
	tab_right: 'No NFT',
	button: (num: number, sum: number) => `Поставить ${num} подарка • ${sum}`
} as const