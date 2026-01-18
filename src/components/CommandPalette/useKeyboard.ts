import { useEffect } from 'react';

interface UseKeyboardProps {
    onOpen: () => void;
    onClose: () => void;
    onSelect: () => void;
    onNext: () => void;
    onPrev: () => void;
    isOpen: boolean;
}

export function useKeyboard({
    onOpen,
    onClose,
    onSelect,
    onNext,
    onPrev,
    isOpen,
}: UseKeyboardProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Toggle Command Palette (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                onOpen();
            }

            if (!isOpen) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                onNext();
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                onPrev();
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                onSelect();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onOpen, onClose, onSelect, onNext, onPrev]);
}
