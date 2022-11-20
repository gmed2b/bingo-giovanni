import { Link } from 'react-router-dom'

function Navbar() {
	return (
		<nav className='navbar'>
			<h2 style={{ margin: '1rem' }}>CRBl_ Studio Games</h2>
			<div className='right__side'>
				<button>
					<Link
						to={'/'}
						className='link'
					>
						Home
					</Link>
				</button>
				<button>
					<Link
						to=''
						className='link'
					>
						Github
					</Link>
				</button>
			</div>
		</nav>
	)
}

export default Navbar
