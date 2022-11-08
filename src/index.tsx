import * as esbuild from 'esbuild-wasm';
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";


const App = () => {

    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })
        console.log(service);
    }

    useEffect(() => {
        startService();
    }, []);

    const onClick = () => {
        console.log(input);
    }

    return (
        <div>
            <textarea value={input} onChange={event => setInput(event.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    )
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);