import { Card } from '../card/Card'
import s from './Grid.module.scss'

type Gift = {
	id: string
	title: string
	price: number
	image: string
	owned: boolean
	tag: number
}

type Props = {
	gifts: Gift[]
}

export const Grid = ({ gifts }: Props) => {

	return (
		<div className={s.wrapper}>
			<div className={s.grid}>
				{gifts && gifts.map(gift => <div key={gift.id}><Card gift={gift} /></div>)}
			</div>
		</div>
	)
}