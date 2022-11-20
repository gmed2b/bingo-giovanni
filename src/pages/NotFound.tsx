import { Link } from 'react-router-dom'

function NotFound() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<h1>404: Not Found</h1>
			<button>
				<Link to={'/'}>Go back home</Link>
			</button>
		</div>
	)
}

export default NotFound
