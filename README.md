# Khaini Store

A modern, full-stack Next.js 14 application with TypeScript, Tailwind CSS, MongoDB (Mongoose), and a modular structure. Features CRUD for blog posts with a clean, customizable UI.

## Features
- Next.js 14 App Router
- TypeScript throughout
- Tailwind CSS for modern styling
- MongoDB with Mongoose (connection utility in `lib/mongoose.ts`)
- Modular structure: `components/ui`, `components/shared`, `models`, `lib`, `app/api`
- CRUD API for blog posts
- Responsive, modern UI (Navbar, Footer, Cards, Forms)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.local.template` to `.env.local` and add your MongoDB connection string.
   - Example:
     ```env
     MONGODB_URI=your_connection_string_here
     ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure
```
store/
├── app/
│   ├── api/posts/           # API routes for CRUD
│   ├── create-post/         # Create post page
│   ├── edit-post/[id]/      # Edit post page
│   ├── post/[id]/           # View single post
│   └── page.tsx             # Main page (all posts)
├── components/
│   ├── shared/              # Navbar, Footer, PostList
│   └── ui/                  # Button, Input
├── lib/
│   └── mongoose.ts          # MongoDB connection utility
├── models/
│   └── postModel.ts         # Mongoose schema for Post
├── public/
├── .env.local.template      # Environment variable template
├── package.json
└── README.md
```

## Customization
- Add more models in `models/` and expand API routes in `app/api/`.
- Extend UI in `components/ui` and `components/shared`.
- Adjust Tailwind config and color palette as needed.

---

**Built with ❤️ using Next.js, TypeScript, Tailwind, and MongoDB.**
