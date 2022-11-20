import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
	return (
		<>
			<Navbar />
			<div className='container'>
				<button className='home__button'>
					<Link to={'/bingo'}>Bingo</Link>
				</button>
			</div>
		</>
	)
}

export default Home
