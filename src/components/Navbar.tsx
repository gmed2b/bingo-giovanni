import { Link } from 'react-router-dom'

function Navbar() {
	return (
		<nav className='navbar'>
			<h2 style={{ margin: '1rem' }}>CRBl_ Studio Games</h2>
			<div className='right__side'>
				<Link
					to={'/'}
					className='link'
				>
					<button>Home</button>
				</Link>

				<Link
					to=''
					className='link'
				>
					<button>Github</button>
				</Link>
			</div>
		</nav>
	)
}

export default Navbar
