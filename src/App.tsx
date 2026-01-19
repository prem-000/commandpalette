import { useState, useEffect } from 'react'
import { CommandPalette } from './components/CommandPalette/CommandPalette'
import { registry } from './commands/registry'
import './App.css'

function App() {
  const [lastAction, setLastAction] = useState<string>('Ready');

  useEffect(() => {
    registry.clear();

    // Register Demo Commands
    registry.register({
      id: 'theme-dark',
      title: 'Switch to Dark Mode',
      description: 'Optimize the interface for low-light environments',
      action: () => setLastAction('Theme changed to Dark'),
      shortcut: ['Meta', 'D'],
    });

    registry.register({
      id: 'theme-light',
      title: 'Switch to Light Mode',
      description: 'Increase contrast for bright environments',
      action: () => setLastAction('Theme changed to Light'),
      shortcut: ['Meta', 'L'],
    });

    registry.register({
      id: 'search-users',
      title: 'Search Users',
      description: 'Query the global user database',
      action: () => setLastAction('Searching users...'),
      shortcut: ['Meta', 'U'],
    });

    registry.register({
      id: 'system-status',
      title: 'View System Status',
      description: 'Check uptime and resource performance',
      action: () => setLastAction('System status: Healthy'),
    });

    registry.register({
      id: 'help-center',
      title: 'Open Help Center',
      description: 'Browse documentation and support guides',
      action: () => setLastAction('Opening help center...'),
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0f18] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <CommandPalette isOpen={false} />

      <main className="max-w-3xl w-full text-center space-y-8 z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-pulse">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            System Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Command Prompt
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            The ultimate keyboard-driven interface for your next generation web application.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xl font-semibold shadow-lg">
              Ctrl
            </kbd>
            <span className="text-gray-500 font-bold">+</span>
            <kbd className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xl font-semibold shadow-lg">
              K
            </kbd>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">
            Press to trigger command palette
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl opacity-50"></div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider">
              <span>Terminal Output</span>
              <span>v1.0.42</span>
            </div>
            <div className="font-mono text-left space-y-2 text-sm md:text-base">
              <div className="flex gap-2 text-blue-400">
                <span>$</span>
                <span className="text-white">init workspace --status</span>
              </div>
              <div className="text-green-400/80">✔ Connection established</div>
              <div className="text-green-400/80">✔ Registry loaded (5 commands found)</div>
              <div className="text-gray-500">_</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-gray-600">
          Last Action: <span className="text-blue-400/80">{lastAction}</span>
        </div>
      </main>

      <footer className="fixed bottom-8 text-gray-600 text-sm">
        • Built with Vite + Tailwind
      </footer>
    </div>
  )
}

export default App
