# Command Palette

A highly customizable, keyboard-driven command palette for React applications. Built with performance, accessibility, and developer experience in mind.

## 🚀 Features

- **Fuzzy Search**: Lightning-fast command searching using fuzzy matching algorithms.
- **Keyboard Navigation**: Fully controllable via keyboard (Arrow keys, Enter, Esc).
- **Dynamic Action Registry**: Easily register and manage commands with specific callbacks.
- **Storybook Driven**: Component development and documentation powered by Storybook.
- **Clean API**: Simple Hooks and Context-based API for easy integration.
- **Tailwind CSS**: Modern, utility-first styling for easy customization.

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Storybook**
- **Vitest** (for unit testing)

## 📁 Project Structure

```text
src/
├── commands/      # Command registration and types
├── components/    # UI components (CommandPalette, Overlay, etc.)
├── fuzzy/         # Fuzzy matching logic
├── hooks/         # Custom hooks for search and navigation
├── stories/       # Storybook stories
└── App.tsx        # Demo application
```

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Storybook

View components and documentation in isolation:

```bash
npm run storybook
```

### Build

```bash
npm run build
```

## 📄 License

MIT

