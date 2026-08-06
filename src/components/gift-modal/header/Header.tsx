import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { MODAL_TEXT } from '../../../shared/constants/modal'
import { giftStore } from '../../../shared/stores/root-store'
import iconCheckbox from '../assets/checkbox.svg'
import iconCheckboxSelected from '../assets/checkboxSelected.svg'
import iconClose from '../assets/close.svg'
import iconFilter from '../assets/filter.svg'
import iconTrash from '../assets/trash.svg'
import s from './Header.module.scss'

type Props = {
	handleClose: () => void
}

export const Header = observer(({ handleClose }: Props) => {
	useEffect(() => {
		giftStore.loadGifts()
		giftStore.loadGiftsCount()
	}, [])
	return (
		<div className={s.header}>
			<div className={s.title}>
				<button className={s.close} onClick={handleClose}>
					<img src={iconClose} alt="X" />
				</button>
				<h2>{MODAL_TEXT.title}</h2>
			</div>
			<div className={s.tabs}>
				<button className={
					giftStore.activeTab === 'giftsNFT'
						? s.active
						: ''
				}
					onClick={() => giftStore.setActiveTab('giftsNFT')}>
					<span>{MODAL_TEXT.tabLeft}</span>
					<span>{MODAL_TEXT.dot}</span>
					<span>{giftStore.giftsCount.giftsNFT}</span>
				</button>
				<button className={
					giftStore.activeTab === 'giftsNoNFT'
						? s.active
						: ''
				}
					onClick={() => giftStore.setActiveTab('giftsNoNFT')}>
					<span>{MODAL_TEXT.tabRight}</span>
					<span>{MODAL_TEXT.dot}</span>
					<span>{giftStore.giftsCount.giftsNoNFT}</span>
				</button>
			</div>
			<div className={s.filters}>
				<button>
					<img src={iconFilter} alt="F" />
				</button>
				<button className={s.choose}
					onClick={() => giftStore.selectAll()}
					disabled={giftStore.isAllSelected}>
					<span>{MODAL_TEXT.choose_all}</span>
					<span><img src={giftStore.isAllSelected ? iconCheckboxSelected : iconCheckbox} alt="C" /></span>
				</button>
				<button className={s.trash} onClick={() => giftStore.clearSelection()}
					disabled={giftStore.selectedCount === 0}>
					<span>{MODAL_TEXT.clear_all}</span>
					<span><img src={iconTrash} alt="T" /></span>
				</button>
			</div>
		</div>
	)
})