import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CommandPalette } from './components/CommandPalette/CommandPalette'
import { registry } from './commands/registry'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Register some global commands
    registry.register({
      id: 'increment-count',
      title: 'Increment Count',
      description: 'Increase the current counter value',
      action: () => setCount(prev => prev + 1),
      shortcut: ['Meta', 'I'],
    });

    registry.register({
      id: 'reset-count',
      title: 'Reset Count',
      description: 'Set the counter back to zero',
      action: () => setCount(0),
      shortcut: ['Meta', 'R'],
    });

    registry.register({
      id: 'alert-hello',
      title: 'Say Hello',
      description: 'Show a friendly greeting',
      action: () => alert('Hello from the Command Palette!'),
    });
  }, []);

  return (
    <>
      <CommandPalette isOpen={false} />
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Press <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sm">Ctrl + K</kbd> to open the Command Palette
      </p>
    </>
  )
}

export default App
