# JSONCraft

> Instantly convert JSON to TypeScript, Zod & Prisma schemas

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**JSONCraft** is a fast, open-source developer tool that converts raw JSON into production-ready schemas. Paste your JSON, generate TypeScript interfaces, Zod validation schemas, and Prisma models instantly, then share with a unique link.

---

## ✨ Features

### ⚡ Instant Conversion
- **TypeScript Interfaces**: Generate clean, properly typed interfaces with nested object support
- **Zod Schemas**: Create validation schemas with type inference for runtime safety
- **Prisma Models**: Generate database models ready for your Prisma schema
- **Smart Type Detection**: Automatically infers types including integers, floats, dates, booleans, and nullables

### 🔗 Shareable Links
- **Permanent URLs**: Share conversions with unique, permanent links (`/s/[slug]`)
- **Read-Only Viewer**: Beautiful public pages for shared conversions
- **No Authentication**: Zero friction - just paste, convert, and share

### 🎨 Developer Experience
- **Monaco Editor**: Full-featured VS Code editor experience in the browser
- **Dark/Light Mode**: Seamless theme switching with system preference support
- **Keyboard Shortcuts**: `Ctrl+Enter` to convert, `Ctrl+B` to format JSON
- **Copy & Download**: One-click copy to clipboard or download as files
- **Real-time Validation**: Instant JSON error feedback with line numbers

### 🚀 Modern Stack
- **Zero Configuration**: No complex setup - works out of the box
- **Fast Performance**: Conversions in <100ms, optimized bundle size
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Open Source**: MIT licensed, fully transparent codebase

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **State Management** | Zustand, TanStack React Query |
| **Database** | Supabase (PostgreSQL) |
| **Backend** | Next.js API Routes, Supabase Client |
| **Authentication** | None (Public access) |
| **Utilities** | nanoid, axios, date-fns, next-themes |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Supabase Account** (for database and sharing features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akshadjaiswal/json-craft.git
   cd json-craft/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the frontend directory:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Optional: Base URL for production
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (home)/
│   │   └── page.tsx                 # Landing page
│   ├── editor/
│   │   └── page.tsx                 # Main editor interface
│   ├── s/[slug]/
│   │   └── page.tsx                 # Shared conversion viewer
│   ├── api/
│   │   ├── save/
│   │   │   └── route.ts             # POST - Save conversion
│   │   └── shared/[slug]/
│   │       └── route.ts             # GET - Fetch conversion
│   ├── layout.tsx                   # Root layout with providers
│   └── globals.css                  # Global styles & Tailwind
│
├── components/
│   ├── editor/
│   │   ├── code-editor.tsx          # Monaco Editor wrapper
│   │   ├── json-input-panel.tsx     # JSON input with controls
│   │   ├── output-tabs.tsx          # TS/Zod/Prisma tabs
│   │   ├── editor-toolbar.tsx       # Convert & Share toolbar
│   │   └── share-dialog.tsx         # Share modal
│   ├── landing/
│   │   ├── hero-section.tsx         # Hero with CTA
│   │   ├── features-section.tsx     # 6 feature cards
│   │   ├── how-it-works.tsx         # 3-step process
│   │   ├── examples-preview.tsx     # Code examples
│   │   └── footer.tsx               # Footer with links
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── tabs.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   └── theme-toggle.tsx
│   └── providers/
│       └── theme-provider.tsx       # next-themes wrapper
│
├── lib/
│   ├── converters/
│   │   ├── json-to-typescript.ts    # TypeScript generator
│   │   ├── json-to-zod.ts           # Zod schema generator
│   │   └── json-to-prisma.ts        # Prisma model generator
│   ├── stores/
│   │   └── editor-store.ts          # Zustand state management
│   ├── api/
│   │   └── conversions.ts           # TanStack Query hooks
│   ├── utils/
│   │   ├── json-validator.ts        # JSON validation
│   │   ├── slug-generator.ts        # Unique slug generation
│   │   ├── keyboard-shortcuts.ts    # Keyboard shortcuts hook
│   │   └── utils.ts                 # Utility functions
│   ├── supabase/
│   │   ├── client.ts                # Browser Supabase client
│   │   └── server.ts                # Server Supabase client
│   └── query-provider.tsx           # TanStack Query provider
│
├── types/
│   └── conversion.ts                # TypeScript type definitions
│
├── hooks/
│   └── use-toast.ts                 # Toast notification hook
│
├── public/                          # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js               # Custom theme configuration
└── next.config.js
```

---

## 🏗️ How It Works

### Conversion Pipeline

```
User pastes JSON
    ↓
Validate JSON syntax
    ↓
Parse and analyze structure
    ↓
Generate TypeScript interfaces
    ↓
Generate Zod validation schemas
    ↓
Generate Prisma database models
    ↓
Display in Monaco Editor tabs
    ↓
User can copy, download, or share
```

### Sharing Flow

```
User clicks "Share"
    ↓
Generate unique 8-character slug (nanoid)
    ↓
Save JSON + outputs to Supabase
    ↓
Create shareable URL: /s/[slug]
    ↓
Display link with copy button
    ↓
Anyone can view via public URL
```

### Type Inference Logic

- **Strings**: Regular strings, date strings (`DateTime` for ISO dates)
- **Numbers**: `Int` for integers, `Float` for decimals
- **Booleans**: `boolean` type
- **Null values**: Marked as nullable/optional
- **Objects**: Nested interfaces with proper naming
- **Arrays**: Typed arrays with element type inference

---

## 🔧 Environment Setup

### 1. Supabase Configuration

1. Create a new project at [Supabase](https://supabase.com)
2. Go to **Project Settings → API**
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run the SQL migration provided in the Quick Start section
5. Your database is ready!

### 2. Optional: Production URL

For production deployments (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

This ensures share links use your production domain.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Convert JSON to schemas |
| `Ctrl + B` | Format JSON (beautify) |
| `Ctrl + /` | Toggle comments (in editor) |

---

## 🎨 Design System

### Brand Colors

```css
Primary: #6366F1 (Indigo)
Accent: #22C55E (Green)
Dark Background: #0F1117
Neutral: #E5E7EB
```

### Typography

- **Sans-serif**: Inter, system-ui
- **Monospace**: Consolas, Monaco (code editor)

### Components

- **Border Radius**: 0.5rem (8px)
- **Shadows**: Subtle shadows for depth
- **Transitions**: Smooth 200ms transitions

---

## 📊 Database Schema

### `conversions` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (auto-generated) |
| `slug` | text | Unique 8-character identifier |
| `json_input` | text | Original JSON input |
| `ts_output` | text | Generated TypeScript code |
| `zod_output` | text | Generated Zod schema |
| `prisma_output` | text | Generated Prisma model |
| `created_at` | timestamptz | Timestamp of creation |

### Row Level Security (RLS)

- ✅ Public **read** access (view shared conversions)
- ✅ Public **insert** access (create conversions)
- ❌ No **update** or **delete** (permanent records)

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Akshad Jaiswal**

- GitHub: [@akshadjaiswal](https://github.com/akshadjaiswal)
- Twitter: [@akshad_999](https://twitter.com/akshad_999)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code's powerful editor
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management

---

## 📞 Support

Need help? Have questions?

- Open an [Issue](https://github.com/akshadjaiswal/json-craft/issues)
- Start a [Discussion](https://github.com/akshadjaiswal/json-craft/discussions)
- Follow updates on [Twitter](https://twitter.com/akshad_999)

---

<div align="center">

**Made with ❤️ for developers who love clean code**

[⭐ Star this repo](https://github.com/akshadjaiswal/json-craft/) | [🐛 Report Bug](https://github.com/akshadjaiswal/json-craft/issues) | [✨ Request Feature](https://github.com/akshadjaiswal/json-craft/issues)

</div>