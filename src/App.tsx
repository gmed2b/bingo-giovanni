import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './pages/Bingo/Create'
import Bingo from './pages/Bingo/Bingo'
import Join from './pages/Bingo/Join'
import NotFound from './pages/NotFound'
import Room from './pages/Bingo/Room'
import Home from './pages/Home'

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/bingo'
				element={<Bingo />}
			/>
			<Route
				path='/bingo/create'
				element={<Create />}
			/>
			<Route
				path='/bingo/join'
				element={<Join />}
			/>
			<Route
				path='/bingo/room/:roomId'
				element={<Room />}
			/>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	)
}

function WrappedApp() {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
}

export default WrappedApp
