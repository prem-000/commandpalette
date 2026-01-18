import React, { useState, useMemo, useEffect } from 'react';
import { registry } from '../../commands/registry';
import { fuseSearch } from '../../fuzzy/score';
import { useKeyboard } from './useKeyboard';
import type { Command } from '../../commands/types';
import './styles.css';

interface CommandPaletteProps {
    onClose?: () => void;
    isOpen: boolean;
}

interface ResultWithScore {
    command: Command;
    score: number;
    matches?: {
        indices: [number, number][];
    };
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose, isOpen: controlledIsOpen }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const results = useMemo<ResultWithScore[]>(() => {
        if (!query) {
            return registry.getAllCommands().map(c => ({ command: c, score: 1 }));
        }
        return registry.getAllCommands()
            .map(c => {
                const titleResult = fuseSearch(query, c.title);
                const descResult = c.description ? fuseSearch(query, c.description) : { score: 0, indices: [] };
                const score = Math.max(titleResult.score, descResult.score);
                return {
                    command: c,
                    score,
                    matches: titleResult.score >= descResult.score
                        ? { indices: titleResult.indices.map(i => [i, i + 1] as [number, number]) }
                        : undefined
                };
            })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score);
    }, [query]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedIndex(0);
    }, [results.length]);

    const handleSelect = () => {
        if (results[selectedIndex]) {
            results[selectedIndex].command.action();
            handleClose();
        }
    };

    const handleClose = () => {
        setInternalIsOpen(false);
        onClose?.();
        setQuery('');
    };

    useKeyboard({
        isOpen,
        onOpen: () => setInternalIsOpen(true),
        onClose: handleClose,
        onSelect: handleSelect,
        onNext: () => setSelectedIndex((prev: number) => (prev + 1) % results.length),
        onPrev: () => setSelectedIndex((prev: number) => (prev - 1 + results.length) % results.length),
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 command-palette-overlay" onClick={handleClose}>
            <div
                className="w-full max-w-2xl overflow-hidden rounded-xl border command-palette-container animate-slide-in text-white"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center border-b border-white/10 px-4 py-3">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        autoFocus
                        className="flex-1 bg-transparent border-none outline-none px-3 py-1 text-lg placeholder-gray-500"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-1">
                        <kbd className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20 text-gray-400">ESC</kbd>
                    </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto py-2">
                    {results.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-400">
                            No results found for "{query}"
                        </div>
                    ) : (
                        results.map((result: ResultWithScore, index: number) => (
                            <div
                                key={result.command.id}
                                className={`command-palette-item px-4 py-3 flex items-center justify-between cursor-pointer ${index === selectedIndex ? 'active' : ''
                                    }`}
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={handleSelect}
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium">{result.command.title}</span>
                                    {result.command.description && (
                                        <span className="text-sm text-gray-400">{result.command.description}</span>
                                    )}
                                </div>
                                {result.command.shortcut && (
                                    <div className="flex gap-1">
                                        {result.command.shortcut.map((key: string) => (
                                            <kbd key={key} className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-gray-500">
                                                {key}
                                            </kbd>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-white/5 border-t border-white/10 px-4 py-2 flex items-center justify-between text-[11px] text-gray-500">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1 rounded bg-white/10">↑↓</kbd> to navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1 rounded bg-white/10">↵</kbd> to select
                        </span>
                    </div>
                    <span>{results.length} commands available</span>
                </div>
            </div>
        </div>
    );
};
