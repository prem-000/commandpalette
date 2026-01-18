import type { Command } from './types';

class CommandRegistry {
    private commands: Map<string, Command> = new Map();

    register(command: Command) {
        if (this.commands.has(command.id)) {
            console.warn(`Command with id ${command.id} already exists. Overwriting.`);
        }
        this.commands.set(command.id, command);
    }

    unregister(id: string) {
        this.commands.delete(id);
    }

    getCommand(id: string): Command | undefined {
        return this.commands.get(id);
    }

    getAllCommands(): Command[] {
        return Array.from(this.commands.values());
    }

    clear() {
        this.commands.clear();
    }
}

export const registry = new CommandRegistry();
