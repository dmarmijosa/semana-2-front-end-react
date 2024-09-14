import {useState, useEffect} from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState(()=> {
        const storedTddos = localStorage.getItem('todos');
        return storedTddos ? JSON.parse(storedTddos) : [{ text: 'Iniciar con buena actitud', completed: false }];
    });
    const [newTodo, setNewTodo] = useState('');


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() === '') return;
        setTodos([...todos, {text: newTodo, completed: false}]);
        setNewTodo('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    const toggleTodo = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? {...todo, completed: !todo.completed} : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Lista de TODOs</h1>
            <div className="flex mb-4">
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border p-2 rounded-l w-full"
                    placeholder="Añadir nueva tarea"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Añadir
                </button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center p-2 mb-2 border-b ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                        <span>{todo.text}</span>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => toggleTodo(index)}
                                className={`px-3 py-1 rounded ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                            >
                                {todo.completed ? 'Desmarcar' : 'Completar'}
                            </button>
                            <button
                                onClick={() => deleteTodo(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
