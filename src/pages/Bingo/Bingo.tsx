import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Bingo() {
	return (
		<>
			<Navbar />
			<div className='container'>
				<button className='home__button'>
					<Link to={'/bingo/create'}>Create party</Link>
				</button>
				<button className='home__button'>
					<Link to={'/bingo/join'}>Join party</Link>
				</button>
			</div>
		</>
	)
}

export default Bingo
