# Vidyawadi School Design Specification

This document outlines the design system, layout principles, and aesthetic guidelines for the Vidyawadi School web platform. The goal is to maintain a consistent, premium, and "Apple-style" user experience across all institutional pages and sub-sites.

## 1. Visual Identity & Aesthetics

### Core Philosophy
- **Minimalist & Premium**: Clean layouts with plenty of whitespace.
- **Institutional Excellence**: A blend of traditional values and modern technology.
- **Visual Depth**: Use of glassmorphism (backdrop-blur), subtle gradients, and high-quality shadows.
- **Consistency**: "Different pages, same soul." Every sub-institution should feel part of the larger Vidyawadi brand.

### Color Palette
Defined in `src/app/globals.css`:
- **Oxford Blue (`#0C2C55`)**: Primary brand color for headings, navigation, and deep backgrounds.
- **Sandstone (`#E2C792`)**: Accent color used for highlights, icons, and call-to-action elements.
- **Teal Blue (`#296374`)**: Secondary accent for gradients and interactive elements.
- **Sandstone Light (`#F0DDB8`)**: Background tint for sections and cards.
- **White (`#FFFFFF`)**: Primary background for clean content areas.

### Typography
- **Primary Font**: `Montserrat` (Sans-serif) - Used for all English text to provide a modern, professional look.
- **Regional Font**: `Noto Devanagari` - Used for Hindi/Sanskrit content to maintain cultural integrity.
- **Hierarchies**:
  - **H1**: Black (900) weight, 5xl-7xl size, tight tracking.
  - **H2**: Bold/ExtraBold, 3xl-4xl size, uppercase tracking for section headers.
  - **Body**: Regular/Medium weight, 16px-18px, generous line-height (1.6+).

---

## 2. Institutional Variations

While the core brand remains consistent, different institutions within the Vidyawadi umbrella (e.g., Leela Devi English Medium, Marudhar Balika Vidyapeeth) can have subtle variations:

- **Theme Shifting**: Use the same layout patterns but swap the primary accent colors (e.g., changing Sandstone to a different shade if specific branding exists).
- **Hero Imagery**: Each institution should have unique hero photos that reflect its specific campus and student life.
- **Messaging**: The "Tone of Voice" should remain consistent—academic, supportive, and empowering—but the content should be tailored to the specific age group or curriculum of the institution.
- **Consistent Components**: Always use the global `Navbar`, `Footer`, and `Card` components to ensure a unified feel across the entire domain.

---

## 3. Layout & Layout Patterns

### Page Structure
1.  **Navbar**: Sticky, transparent-to-solid on scroll, using `backdrop-blur`.
2.  **Hero Section**: Full-width or large centered layout with `hero-bg` (gradient + SVG pattern).
3.  **Breadcrumbs/Back Button**: Clean "Back to..." links with hover animations.
4.  **Content Sections**: Balanced mix of text and media, often using a 2 or 3 column grid.
5.  **Gallery/Media**: Masonry or defined grid with large border-radius.
6.  **Footer**: Deep Oxford Blue background, organized link columns, and social icons.

### Component Design Rules
- **Border Radius**: Consistent use of large rounded corners (`rounded-[2.5rem]`) for cards, images, and buttons.
- **Shadows**: Soft, multi-layered shadows for depth (`shadow-xl`, `shadow-2xl`).
- **Borders**: Thin, subtle borders using brand colors with low opacity (`border-sandstone/10`).
- **Spacing**: Use `max-w-7xl` for main containers with responsive padding (`px-6`, `md:px-12`).

---

## 3. Interactive Elements & Animations

### Framer Motion Standards
- **Entry Animations**: Use `initial={{ opacity: 0, y: 20 }}` and `animate={{ opacity: 1, y: 0 }}` for subtle upward fades.
- **Hover Effects**: 
  - Cards should scale slightly (`hover:scale-[1.02]`) or brighten.
  - Buttons should have color shifts or icon translations (e.g., arrow moves right).
- **Transitions**: Smooth, spring-based transitions for a "fluid" feel.

### Custom CSS Keyframes
- **Shimmer**: Used for loading states or premium highlight effects.
- **Ticker**: Continuous horizontal scroll for news or announcements.
- **Scroll-Up**: Continuous vertical scroll for notices/events.

---

## 4. AI Design Prompt Template
*Use this prompt to generate new pages or components that fit this style.*

> **Prompt:** "Design a modern [Section/Page Name] for a premium school website. The design should follow an Apple-style aesthetic with minimalist layouts, high-quality typography (Montserrat), and a color palette of Oxford Blue (#0C2C55), Sandstone (#E2C792), and Teal Blue (#296374). Use large rounded corners (40px/2.5rem), subtle glassmorphism effects (backdrop-blur), and smooth Framer Motion entry animations. Ensure the layout is fully responsive and uses a clean grid system. Include high-resolution imagery and clear call-to-action buttons with subtle hover states."

---

## 5. Implementation Checklist
- [ ] Responsive testing (Mobile, Tablet, 4K).
- [ ] Accessibility (Contrast ratios, ARIA labels).
- [ ] Image Optimization (Next/Image with priority where needed).
- [ ] Consistent Iconography (Lucide-React).
- [ ] Dynamic Metadata for SEO.
