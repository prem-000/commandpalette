export type CommandAction = () => void | Promise<void>;

export interface Command {
    id: string;
    title: string;
    description?: string;
    category?: string;
    keywords?: string[];
    shortcut?: string[]; 
    action: CommandAction;
    icon?: string; 
}

export interface SearchResult {
    command: Command;
    score: number;
    matches?: {
        indices: [number, number][]; // Start and end indices of matches
    };
}
