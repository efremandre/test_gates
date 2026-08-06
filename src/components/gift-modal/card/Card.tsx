import { observer } from 'mobx-react-lite'
import { giftStore } from '../../../shared/stores/root-store'
import iconCoin from '../assets/coin.svg'
import iconTickCircle from '../assets/tick-circle.svg'
import iconTick from '../assets/tick.svg'
import s from './Card.module.scss'

type Gift = {
	id: string
	title: string
	price: number
	image: string
	owned: boolean
	tag: number
}

type Props = {
	gift: Gift
}

export const Card = observer(({ gift }: Props) => {
	const { id, title, image, price, owned, tag } = gift

	return (
		<div className={`${s.wrapper} ${owned ? s.active : ''}`}
			onClick={() => giftStore.toggleGift(id)}
			aria-pressed={owned}>
			<div className={s.header}>
				<div className={s.price}>
					<span>{price}</span>
					<span><img src={iconCoin} alt="C" /></span>
				</div>
				<div className={s.check}>
					<img src={owned ? iconTickCircle : iconTick} alt="o" />
				</div>
			</div>
			<div className={s.image}>
				<img src={image} alt="D" />
			</div>
			<div className={s.title}>
				<div className={s.name}>
					{title}
				</div>
				<div className={s.tag}>
					#{tag}
				</div>
			</div>
		</div>
	)
})