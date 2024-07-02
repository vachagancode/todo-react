import { Check, Trash } from "lucide-react"
import axios from "axios"

const Todo = ({title, id, isDone}) => {

	const removeATodo = async () => {
		try {
			const response = await axios.delete(`${import.meta.env.VITE_API_TODOS}/${id}`)
			location.reload()
		} catch (error) {
			location.reload()
		}
	}

	const updateATodo = async () => {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_API_TODOS}/${id}`)
			// if (data["isDone"] == false) {
				const response = await axios.patch(`${import.meta.env.VITE_API_TODOS}/${id}`, {
					"isDone": !data["isDone"]
				})
				location.reload()
			// }
			// else {
			// 	const response = await axios.patch(`${import.meta.env.VITE_API_TODOS}/${id}`, {
			// 		"isDone": false
			// 	})
			// 	location.reload()
			// }
		} catch (error) {
			location.reload()
		}
	}

	return (
		<div className="py-7 bg-[#15101C] rounded-2xl flex items-center justify-between">
			<p className="todo-text px-4" style={isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{ title }</p>
			<div className="mt-1 px-4">
				<button onClick={updateATodo} className="todo-button"><Check /></button>
				<button onClick={removeATodo} className="todo-button"><Trash /></button>
			</div>
		</div>
	)
}

export default Todo