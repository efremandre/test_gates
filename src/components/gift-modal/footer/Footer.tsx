import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from 'react'
import { observer } from 'mobx-react-lite'

import { MODAL_TEXT } from '../../../shared/constants/modal'
import { giftStore } from '../../../shared/stores/root-store'

import iconCoins from '../assets/coin-general.svg'
import iconCoin from '../assets/coin.svg'
import iconUsers from '../assets/users.svg'

import s from './Footer.module.scss'

const FULL_DURATION_MS = 120_000
const SHORT_DURATION_MS = 30_000

const RANDOM_SWITCH_MIN_MS = 15_000
const RANDOM_SWITCH_MAX_MS = 75_000

const BORDER_RADIUS = 15
const BORDER_INSET = 1

const getRandomSwitchDelay = () => {
	return (
		RANDOM_SWITCH_MIN_MS +
		Math.random() *
		(RANDOM_SWITCH_MAX_MS - RANDOM_SWITCH_MIN_MS)
	)
}

/**
 * Контур начинается строго сверху по центру
 * и идёт по часовой стрелке.
 */
const createButtonBorderPath = (
	width: number,
	height: number,
	radius: number,
	inset: number,
) => {
	const left = inset
	const top = inset
	const right = width - inset
	const bottom = height - inset
	const centerX = width / 2

	const safeRadius = Math.min(
		radius,
		(right - left) / 2,
		(bottom - top) / 2,
	)

	return [
		// Начальная точка — верхняя середина.
		`M ${centerX} ${top}`,

		// Верхняя правая часть.
		`H ${right - safeRadius}`,
		`A ${safeRadius} ${safeRadius} 0 0 1 ${right} ${top + safeRadius}`,

		// Правая сторона.
		`V ${bottom - safeRadius}`,
		`A ${safeRadius} ${safeRadius} 0 0 1 ${right - safeRadius} ${bottom}`,

		// Нижняя сторона.
		`H ${left + safeRadius}`,
		`A ${safeRadius} ${safeRadius} 0 0 1 ${left} ${bottom - safeRadius}`,

		// Левая сторона.
		`V ${top + safeRadius}`,
		`A ${safeRadius} ${safeRadius} 0 0 1 ${left + safeRadius} ${top}`,

		// Возвращаемся в верхнюю середину.
		`H ${centerX}`,
	].join(' ')
}

export const Footer = observer(() => {
	const {
		selectedCount,
		selectedTotalPrice,
		isModalOpen,
	} = giftStore

	const buttonRef = useRef<HTMLButtonElement>(null)
	const progressPathRef = useRef<SVGPathElement>(null)

	const pathLengthRef = useRef(0)
	const progressPercentRef = useRef(100)

	const setProgress = useCallback((percent: number) => {
		const path = progressPathRef.current
		const totalLength = pathLengthRef.current

		if (!path || totalLength <= 0) {
			return
		}

		const safePercent = Math.max(
			0,
			Math.min(100, percent),
		)

		progressPercentRef.current = safePercent

		const visibleLength =
			totalLength * (safePercent / 100)

		/*
		 * Первый участок — видимая линия.
		 * Второй участок — невидимая часть.
		 *
		 * Поскольку SVG-path начинается сверху по центру,
		 * видимая линия тоже начинается именно там.
		 */
		path.style.strokeDasharray =
			`${visibleLength} ${totalLength}`

		path.style.strokeDashoffset = '0'
		path.style.opacity = safePercent > 0 ? '1' : '0'
	}, [])

	/**
	 * Строим контур по реальным размерам кнопки.
	 */
	useLayoutEffect(() => {
		const button = buttonRef.current
		const path = progressPathRef.current

		if (!button || !path) {
			return
		}

		const updatePath = () => {
			const pathData = createButtonBorderPath(
				button.clientWidth,
				button.clientHeight,
				BORDER_RADIUS,
				BORDER_INSET,
			)

			path.setAttribute('d', pathData)

			/*
			 * Используем настоящую длину пути.
			 * Так начало линии не зависит от особенностей
			 * pathLength и всегда остаётся в точке M.
			 */
			pathLengthRef.current = path.getTotalLength()

			setProgress(progressPercentRef.current)
		}

		updatePath()

		const resizeObserver = new ResizeObserver(updatePath)

		resizeObserver.observe(button)

		return () => {
			resizeObserver.disconnect()
		}
	}, [setProgress])

	/**
	 * При открытии модалки запускаем новый таймер.
	 * При закрытии отменяем его и возвращаем полную рамку.
	 */
	useEffect(() => {
		if (!isModalOpen) {
			setProgress(100)
			return
		}

		const startedAt = performance.now()
		const switchAt =
			startedAt + getRandomSwitchDelay()

		let finishAt = startedAt + FULL_DURATION_MS
		let switchedToShortTimer = false
		let animationFrameId = 0

		const animate = (now: number) => {
			/*
			 * В случайный момент оставшееся время
			 * становится равным 30 секундам.
			 */
			if (
				!switchedToShortTimer &&
				now >= switchAt
			) {
				switchedToShortTimer = true
				finishAt = now + SHORT_DURATION_MS
			}

			const remainingMs = Math.max(
				0,
				finishAt - now,
			)

			const remainingPercent =
				(remainingMs / FULL_DURATION_MS) * 100

			setProgress(remainingPercent)

			if (remainingMs > 0) {
				animationFrameId =
					requestAnimationFrame(animate)
				return
			}

			setProgress(0)
		}

		setProgress(100)

		animationFrameId =
			requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)

			// Сброс при закрытии или размонтировании.
			setProgress(100)
		}
	}, [isModalOpen, setProgress])

	return (
		<div className={s.footer}>
			<div className={s.statistics}>
				<div className={s.statblock}>
					<span>
						<img src={iconUsers} alt="" />
					</span>

					<span>12</span>
				</div>

				<div className={s.separator} />

				<div className={s.statblock}>
					<span>2 890.93</span>

					<span>
						<img src={iconCoins} alt="" />
					</span>
				</div>
			</div>

			<div className={s.button}>
				<button
					ref={buttonRef}
					type="button"
					disabled={selectedCount === 0}
				>
					<svg
						className={s.timerBorder}
						aria-hidden="true"
						focusable="false"
					>
						<path
							ref={progressPathRef}
							className={s.timerProgress}
						/>
					</svg>

					<span>
						{MODAL_TEXT.getButtonText(
							selectedCount,
						)}
					</span>

					<span>{MODAL_TEXT.dot}</span>

					<span>
						{selectedTotalPrice}

						<img src={iconCoin} alt="" />
					</span>
				</button>
			</div>
		</div>
	)
})