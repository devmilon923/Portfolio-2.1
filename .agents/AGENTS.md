# Workspace Agent Guidelines & Project Constraints

This document defines guidelines, architectural constraints, and styling rules for AI coding assistants working in this portfolio codebase.

---

## 1. UI Animation & Performance Constraints

### 🚫 Hover Transitions & Spatial Coordinate Shifts
- **DO NOT use spatial transforms (`hover:-translate-y-*`, `hover:scale-*`) on container components containing vector text.**
  - **Context & Rationale**: Moving or scaling text containers by fractional CSS pixel values forces browser rendering engines to temporarily flip font anti-aliasing from LCD Sub-Pixel Smoothing to Grayscale Texture Rendering. This causes visual font jitter, text shimmering, micro-blurring, and frame drops.
- **Use Standard Shadcn Hover Patterns**:
  - Apply hover elevation using **border color**, **background color**, and **shadow depth** transitions:
    ```tsx
    /* ✅ CORRECT: Clean border & shadow elevation */
    className="bg-paper-white border border-iron rounded-2xl p-6 hover:border-obsidian hover:shadow-md transition-all duration-200"
    ```
- **Avoid Unisolated `transition-all`**:
  - Prefer explicit property transitions (e.g., `transition-[border-color,box-shadow]`, `transition-colors`, `transition-opacity`) to avoid triggering main-thread layout reflows.

---

## 2. Design System & Editorial Aesthetics

### 🎨 Visual Theme (11x Platform Editorial)
- **Palette cadence**: Alternates between light white editorial spreads (`bg-paper-white`, `bg-bone`) and full-bleed dark narrative sections (`bg-deep-teal`, `bg-obsidian`).
- **Typography**: Roboto sans-serif body text paired with high-contrast serif headlines and Caveat handwritten accent labels.
- **Pill-shaped elements**: Primary buttons must use 999px border-radius (`rounded-full`).
- **Seamless Media Framing**:
  - B&W studio photography (such as `me.jpeg`) must preserve native portrait aspect ratio (`aspect-[896/1200]`).
  - Blend dark monochrome photos directly into dark studio containers (`bg-obsidian`) without harsh white borders or unnatural square cropping.

---

## 3. Engineering & Code Architecture

### ⚡ Performance & Build Integrity
- **Build Verification**: Every modification must be validated with `npm run build` to guarantee zero compilation or TypeScript errors.
- **Strict Control Flow Scoping**: Prop signatures, icon maps, and constant data structures must be verified against source schemas before dereferencing.

---

## 4. Custom Rules & Future Constraints
*(Add additional team or workspace rules below)*

- [ ] *Example: Custom backend API rules*
- [ ] *Example: Deployment & analytics constraints*
