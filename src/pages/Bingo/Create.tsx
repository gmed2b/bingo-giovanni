import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'

function Create() {
	const navigate = useNavigate()
	const [width, setWidth] = useState(5)
	const [height, setHeight] = useState(5)
	const [possibleAnswers, setPossibleAnswers] = useState<string[]>([])

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// get the form data out of state
		const res = await axios.post<string>('http://home.crbl.studio:7654/create', {
			width,
			height,
			answers: possibleAnswers
		})
		navigate(`/bingo/join?roomId=${res.data}`)
	}

	return (
		<>
			<Navbar />
			<div className='container'>
				<h1>Create</h1>
				<form
					className='form'
					onSubmit={handleFormSubmit}
				>
					<div className='form__item__inline'>
						<label htmlFor='width'>Width</label>
						<input
							type='number'
							name='width'
							id='width'
							value={width}
							onChange={v => setWidth(parseInt(v.target.value))}
							style={{ width: '3rem' }}
							min='3'
							max='20'
						/>
					</div>
					<div className='form__item__inline'>
						<label htmlFor='height'>Height</label>
						<input
							type='number'
							name='height'
							id='height'
							value={height}
							onChange={v => setHeight(parseInt(v.target.value))}
							style={{ width: '3rem' }}
							min='3'
							max='20'
						/>
					</div>
					<div className='form__item__inline'>
						<label htmlFor='height'>Possible Anwsers</label>
						<button
							type='button'
							onClick={() => {
								setPossibleAnswers([...possibleAnswers, `answer ${possibleAnswers.length}`])
							}}
						>
							Add
						</button>
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '85%' }}>
						{possibleAnswers.map((answer, index) => (
							<div
								key={index}
								style={{ display: 'flex', gap: '1rem' }}
							>
								<input
									type='text'
									name='possibleAnswers'
									id='possibleAnswers'
									value={answer}
									onChange={v => {
										const newPossibleAnswers = [...possibleAnswers]
										newPossibleAnswers[index] = v.target.value
										setPossibleAnswers(newPossibleAnswers)
									}}
								/>
								<button
									onClick={() => {
										const newPossibleAnswers = [...possibleAnswers]
										newPossibleAnswers.splice(index, 1)
										setPossibleAnswers(newPossibleAnswers)
									}}
								>
									Remove
								</button>
							</div>
						))}
					</div>
					<button
						type='submit'
						disabled={possibleAnswers.length < height}
					>
						Create
					</button>
				</form>
			</div>
		</>
	)
}

export default Create
