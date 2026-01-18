import type { Meta, StoryObj } from '@storybook/react'
import { CommandPalette } from '../components/CommandPalette/CommandPalette';
import { registry } from '../commands/registry';
import { useEffect } from 'react';

const meta: Meta<typeof CommandPalette> = {
    title: 'Components/CommandPalette',
    component: CommandPalette,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta
type Story = StoryObj<typeof CommandPalette>

// Setup dummy commands for demonstration
const setupCommands = () => {
    registry.clear();
    registry.register({
        id: 'search-users',
        title: 'Search Users',
        description: 'Find users by name or email',
        category: 'Users',
        action: () => alert('Searching users...'),
        shortcut: ['Meta', 'U'],
    });
    registry.register({
        id: 'create-project',
        title: 'Create New Project',
        description: 'Start a new development project',
        category: 'Projects',
        action: () => alert('Creating project...'),
        shortcut: ['Meta', 'P'],
    });
    registry.register({
        id: 'toggle-dark-mode',
        title: 'Toggle Dark Mode',
        description: 'Switch between light and dark themes',
        category: 'Settings',
        action: () => alert('Toggling dark mode...'),
        shortcut: ['Meta', 'D'],
    });
    registry.register({
        id: 'settings',
        title: 'Open Settings',
        description: 'Adjust application preferences',
        category: 'Settings',
        action: () => alert('Opening settings...'),
        shortcut: ['Meta', ','],
    });
    registry.register({
        id: 'help',
        title: 'Help & Documentation',
        description: 'View the documentation and guides',
        category: 'Support',
        action: () => alert('Opening help...'),
    });
};

interface DemoWrapperProps {
    isOpen: boolean;
    onClose?: () => void;
}

const DemoWrapper: React.FC<DemoWrapperProps> = (args) => {
    useEffect(() => {
        setupCommands();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-md mx-auto text-white text-center space-y-4">
                <h1 className="text-3xl font-bold text-sky-400">Command Palette</h1>
                <p className="text-slate-400 italic">Press <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Ctrl + K</kbd> to open</p>
                <div className="p-4 rounded border border-slate-800 bg-slate-800/50 text-slate-300">
                    This demo showcases a keyboard-driven command palette with custom fuzzy search and glassmorphism.
                </div>
            </div>
            <CommandPalette {...args} />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <DemoWrapper {...args} />,
    args: {
        isOpen: false,
    },
}
