import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Bingo() {
	return (
		<>
			<Navbar />
			<div className='container'>
				<Link to={'/bingo/create'}>
					<button className='home__button'>Create party</button>
				</Link>

				<Link to={'/bingo/join'}>
					<button className='home__button'>Join party</button>
				</Link>
			</div>
		</>
	)
}

export default Bingo
