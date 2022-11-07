import { createRoot } from "react-dom/client";

const App = () => {

    return (<div>
        <h1>
            Sample text!!!
        </h1>
    </div>
    )
}

const root = createRoot(document.querySelector('root') as HTMLElement);
root.render(<App />);