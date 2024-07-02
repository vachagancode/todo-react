import { Plus } from "lucide-react"
import Todo from "./components/Todo"
import { useEffect, useRef } from "react"
import axios from "axios"
import { useState } from "react"

function App() {

  const inputRef = useRef()

  const addATodo = async () => {
    try {
      if (!inputRef.current.value) location.reload()
      else {
        console.log(inputRef.current.value)
        const response = await axios.post(import.meta.env.VITE_API_TODOS, {
          "title": inputRef.current.value
        })
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [todos, setTodos] = useState([])
  const [doneTodos, setDoneTodos] = useState([])

  const getTodos = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_API_TODOS)
      console.log(data)
      let notDoneTodos = []
      data.map((todo) => {
        if (todo.isDone && todo.isDone == true) {
          doneTodos.push(todo)
        }
        else {
          notDoneTodos.push(todo)
        }
      })
      setTodos(notDoneTodos)
      todos.reverse()
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    getTodos()
  }, [])
  // useEffect()

  return (
    <>
      <div className="">
        <div className="h-screen flex items-center justify-center flex-col">
          {/* Input Block */}
          <div className="flex items-center justify-center">
            <input required ref={inputRef} type="text" placeholder="Add a new task" className="px-9 text-start py-2 outline-none bg-transparent text-slate-400 border-violet-700 border-[1px] rounded-xl md:w-72  sm:w-64" />
            <button onClick={addATodo} className="ml-1 px-2 py-2 bg-violet-500 rounded-lg hover:bg-violet-600 transition"><Plus color="white" /></button>
          </div>
          <div className="mt-2">
          <p className="text-base text-start">Tasks to do - {todos.length}</p>
            {/* Cards */}
            { todos.map((todo, i) => (
              <Todo key={i} id={todo.id} title={todo.title} />
            )) }
          </div>
          {/* Done Tasks */}
          <div>
          <p className="text-base text-start">Done - {doneTodos.length}</p>
            {/* Cards */}
            { doneTodos.map((doneTodo, i) => (
              <Todo key={i} id={doneTodo.id} title={doneTodo.title} isDone={doneTodo.isDone} />
            )) }
          </div>
        </div>
        </div>
    </>
  )
}

export default App
