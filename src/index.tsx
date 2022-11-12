import * as esbuild from 'esbuild-wasm';
import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./Plugins/unpkg-path-plugin";


const App = () => {

    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })
    }

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if(!ref.current) {
            return;
        }

        // const result = await ref.current.transform(input, {
        //     loader: 'jsx',
        //     target: 'es2015'
        // });
        //
        // setCode(result.code);

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()]
        });

        // console.log(result);
        setCode(result.outputFiles.text);
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