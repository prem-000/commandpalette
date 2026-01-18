export interface ScoreResult {
    score: number;
    indices: number[];
}

/**
 * A custom fuzzy search algorithm that prioritizes:
 * 1. Exact matches
 * 2. Matches at the start of words
 * 3. Character proximity
 */
export function fuseSearch(query: string, text: string): ScoreResult {
    const q = query.toLowerCase();
    const t = text.toLowerCase();

    if (q === t) return { score: 100, indices: Array.from({ length: t.length }, (_, i) => i) };
    if (t.startsWith(q)) return { score: 90, indices: Array.from({ length: q.length }, (_, i) => i) };

    let score = 0;
    const indices: number[] = [];
    let lastIndex = -1;

    for (let i = 0; i < q.length; i++) {
        const char = q[i];
        const index = t.indexOf(char, lastIndex + 1);

        if (index === -1) return { score: 0, indices: [] };

        // Bonus for consecutive matches
        if (index === lastIndex + 1) {
            score += 5;
        }

        // Bonus for matching start of words
        if (index === 0 || t[index - 1] === ' ' || t[index - 1] === '-' || t[index - 1] === '_') {
            score += 10;
        }

        // Penalty for distance
        if (lastIndex !== -1) {
            score -= (index - lastIndex - 1) * 1;
        }

        indices.push(index);
        lastIndex = index;
        score += 2; // Base score for finding the character
    }

    // Normalize score (simple heuristic)
    const normalizedScore = Math.max(0, Math.min(100, (score / (q.length * 15)) * 100));

    return { score: normalizedScore, indices };
}
