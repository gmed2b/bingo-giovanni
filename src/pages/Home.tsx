import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
	return (
		<>
			<Navbar />
			<div className='container'>
				<Link to={'/bingo'}>
					<button className='home__button'>Bingo</button>
				</Link>
			</div>
		</>
	)
}

export default Home
