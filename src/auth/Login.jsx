import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('cityslicka');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });


            const data = await response.json();
            console.log(data);
            if (response.ok) {
                onLoginSuccess();
                localStorage.setItem('token', data.token);
            } else {
                setError(data.error);
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('Error de red. Intenta nuevamente.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
