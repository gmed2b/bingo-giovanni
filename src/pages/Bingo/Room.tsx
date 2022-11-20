import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'

let socket: WebSocket

function Room() {
	const { roomId } = useParams()
	const pseudo = localStorage.getItem('pseudo') ?? 'BVP'
	const [players, setPlayers] = useState<string[]>([])
	const [grid, setGrid] = useState<string[][]>([])
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [answers, setAnswers] = useState<{ answer: string; isTrue: boolean }[]>([])
	const [gridState, setGridState] = useState<boolean[][]>()

	useEffect(() => {
		socket = new WebSocket(`ws://home.crbl.studio:7654/join/${roomId}/${pseudo}`)
		socket.onmessage = (msg: any) => {
			msg = JSON.parse(msg.data)
			console.log(msg)

			switch (Object.keys(msg)[0]) {
				case 'Init':
					if (msg.Init.answers) {
						setIsAdmin(e => msg.Init.answers !== undefined)
						setAnswers(e => {
							return msg.Init.answers.map((a: string) => {
								return { answer: a, isTrue: false }
							})
						})
					}
					setPlayers(e => msg.Init.players)
					setGrid(e => msg.Init.grid)
					setGridState(msg.Init.grid.map((e: any) => e.map((ee: any) => false)))
					break
				case 'Joined':
					setPlayers(e => [...e, msg.Joined])
					break
				case 'Left':
					setPlayers(e => e.filter(p => p !== msg.Left))
					break
				case 'Answer':
					console.log(msg.Answer)
					break
				case 'Bingo':
					alert(`${msg.Bingo} got a Bingo !!!`)
					break
			}
		}
	}, [])

	const handleAnswer = (x: number, y: number) => {
		socket.send(JSON.stringify({ TickBox: [x, y] }))
		let gridcp = gridState!.map(e => e)
		gridcp[x][y] = true
		setGridState(e => gridcp)
	}

	return (
		<>
			<Navbar />
			<nav style={{ display: 'flex', justifyContent: 'center' }}>
				<button>
					<Link to={'/bingo/join'}>Left Game</Link>
				</button>
				<button
					onClick={() => {
						socket.send(JSON.stringify('Bingo'))
					}}
				>
					BINGOOOOOOOOOOOOO
				</button>
			</nav>
			<div className='container'>
				<h1>Players ({players.length})</h1>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
					{players.map((player, idx) => (
						<div
							className='player'
							key={idx}
						>
							<span>{player}</span>
						</div>
					))}
				</div>
			</div>
			<div className='container'>
				<h1>Game</h1>
				<div style={{ display: 'grid', gridTemplateRows: `repeat(${grid.length}, 1fr)` }}>
					{grid.map((row, idx) => (
						<div
							style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}
							key={idx}
							className='row'
						>
							{row.map((col, idy) => (
								<div
									className='col'
									key={idy}
									style={gridState![idx][idy] ? { background: 'blue' } : {}}
								>
									<span onClick={e => handleAnswer(idx, idy)}>{col}</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
			{isAdmin && (
				<div className='container'>
					<h1>All answers</h1>
					<div className='admin'>
						{answers.map((col, idy) => (
							<div
								className='col'
								key={idy}
							>
								<span
									onClick={() => {
										socket.send(JSON.stringify({ Answer: col.answer }))
									}}
								>
									{col.answer}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default Room
