import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { uniqueNamesGenerator, Config, adjectives, starWars } from 'unique-names-generator'
import axios from 'axios'

const customConfig: Config = {
	dictionaries: [adjectives, starWars],
	separator: ' ',
	length: 2,
	style: 'capital'
}

const generateRandomPseudo = () => {
	const pseudo = uniqueNamesGenerator(customConfig)
	localStorage.setItem('pseudo', pseudo)
	return pseudo
}

function Join() {
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo') || generateRandomPseudo())
	const [roomId, setRoomId] = useState(() => searchParams.get('roomId') ?? '')
	const [publicRooms, setPublicRooms] = useState<string[]>([])

	useEffect(() => {
		;(async () => {
			setPublicRooms(await getPublicRooms())
		})()
	}, [])

	const handleJoin = () => {
		navigate(`/bingo/room/${roomId}`)
	}

	const getPublicRooms = async () => {
		const res = await axios.get('http://home.crbl.studio:7654/rooms')
		return res.data as string[]
	}

	return (
		<>
			<Navbar />
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<div className='container'>
					<h1>Join</h1>
					<div className='form__container'>
						<div className='form__item'>
							<label htmlFor='pseudo'>Pseudo</label>
							<input
								type='text'
								name='pseudo'
								id='pseudo'
								value={pseudo}
								onChange={v => {
									setPseudo(v.target.value)
									localStorage.setItem('pseudo', v.target.value)
								}}
							/>
							<button onClick={() => setPseudo(generateRandomPseudo())}>Generate</button>
						</div>
						<div className='form__item'>
							<label htmlFor='pseudo'>Room Code</label>
							<input
								type='text'
								name='roomCode'
								id='roomCode'
								value={roomId}
								onChange={v => {
									setRoomId(v.target.value)
									setSearchParams({ roomId: v.target.value })
								}}
							/>
						</div>
					</div>
					<button onClick={handleJoin}>Join</button>
				</div>
				<span
					className='separator'
					style={{ height: 300, border: '1px solid white', alignSelf: 'center' }}
				></span>
				<div className='container'>
					<h1>Public room available</h1>
					<div>
						{publicRooms.map((room, idx) => (
							<Link
								to={`/bingo/room/${room}`}
								key={idx}
							>
								<button>{room}</button>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Join
