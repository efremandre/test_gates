import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource-variable/onest/wght.css'
import './styles/colors.scss'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<App />
)
