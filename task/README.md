# 🧩 E-commerce Product Listing Page - Developer Task

## 🎯 Goal

Build a fully functional e-commerce product listing and details page by:

1. Recreating the design from the [Figma file](https://www.figma.com/design/GfqOo9qg1H6bBPnLAoxbsc/Developer-Test?node-id=0-1&t=4XP8lc1kPZX6mZqp-1) **pixel-perfect**
2. Integrating with the provided REST APIs (see Postman collection)
3. Implementing complete filtering, sorting, and navigation functionality

---

## 🛠 Tech Stack Requirements

- **Framework:** Next.js (v14+ / App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS only
- **State Management:** React hooks, Context API, Zustand, Redux, or any modern state management solution of your choice
- **Icons:** Any lightweight library (Lucide, Heroicons, React Icons)
- **HTTP Client:** Fetch API, Axios, or similar

---

## 🎨 Design Requirements

### Visual Accuracy

- Match the Figma design **exactly** (layout, spacing, colors, typography)
- Ensure full responsiveness for mobile, tablet, and desktop
- Use **Tailwind utility classes only** for styling
- Maintain consistent spacing and alignment across all breakpoints

### Key Design Elements

- Clean, modern UI with proper visual hierarchy
- Smooth transitions and hover states
- Loading states for API calls
- Empty states when no products match filters
- Error handling UI for failed API requests

---

## 📡 API Integration

> 📬 **API Reference:**  
> All endpoints, request/response examples, and environment variables are fully documented in the included Postman collection:  
> **`Frontend Task APIs.postman_collection.json`** (located in the project root).  
> Import it into Postman for rapid testing and copy-paste-ready snippets.

### Base URL

```
https://task.woosonicpwa.com/api
```

### Available Endpoints

#### 1. Get All Products (with filters)

```
GET /products
```

**Query Parameters:**

- `size` - Filter by size: XS, S, M, L, XL
- `brand` - Filter by brand: Nike, Adidas, Puma, Reebok
- `status` - Product status: active, inactive
- `min_price` - Minimum price filter
- `max_price` - Maximum price filter
- `min_rating` - Minimum rating filter (1-5)
- `sort_by` - Sort field: price, rating, created_at
- `sort_order` - Sort direction: asc, desc

**Headers:**

- `Accept-Language: en` (or `fr` for French)

**Example Request:**

```bash
GET /products?brand=Adidas&min_price=150&max_price=400&min_rating=3&sort_by=price&sort_order=asc
```

#### 2. Get Single Product

```
GET /products/{id}
```

**Headers:**

- `Accept-Language: en` (or `fr`)

**Example Request:**

```bash
GET /products/1
```

### API Integration Requirements

- Handle loading states during API calls
- Display appropriate error messages for failed requests
- Implement proper error boundaries
- Cache API responses where appropriate
- Handle language switching (EN/FR)

---

## ⚙️ Functional Requirements

### 1. Product Listing Page

#### Display

- Grid/list layout of products showing:
  - Product image
  - Product title
  - Price (formatted with currency)
  - Rating (visual star representation)
  - Brand name

#### Brand Filter Buttons (Top Bar)

- Quick filter buttons for: Nike, Adidas, Puma, Reebok, All
- Active state indication
- Clicking updates product list via API

#### Product Navigation

- Clicking a product navigates to Product Details Page
- Pass product ID in URL (e.g., `/products/1`)

### 2. Sort & Filter Modal/Panel

#### Sort Options

- Most Recommended (default)
- Price: Lowest First (`sort_by=price&sort_order=asc`)
- Price: Highest First (`sort_by=price&sort_order=desc`)
- Best Rating (`sort_by=rating&sort_order=desc`)

#### Filter Options

- **Price Range** (multiple selections allowed)
  - Under $50
  - $50 - $100
  - $100 - $200
  - $200 - $500
  - $500+
- **Size** (multiple selections)
  - XS, S, M, L, XL
- **Rating** (single selection)
  - 4+ stars
  - 3+ stars
  - 2+ stars
  - All ratings

#### Actions

- **Clear All** - Reset all filters and sorting to default
- **Apply** - Close modal and fetch filtered products from API
- Show count of active filters

### 3. Product Details Page

#### Product Information

- Large product image(s)
- Product title and brand
- Price display
- Star rating with review count
- Size selector (S, M, L, XL, XXL)
  - Visual indication of selected size
  - Disable unavailable sizes if data provided
- Product description
- Reviews section (display from API data)

#### Actions

- "Add to Cart" button (functional UI only, no cart persistence required)
- Back/breadcrumb navigation to listing page

### 4. Additional Features

#### Loading States

- Skeleton loaders or spinners during API calls
- Disable interactions while loading

#### Error Handling

- Network error messages
- Empty state when no products found
- Invalid product ID handling

#### Language Support

- Language toggle (EN/FR)
- Update API calls with `Accept-Language` header

---

## 📋 Evaluation Criteria

You will be evaluated on:

1. **Design Fidelity** (25%)

   - Pixel-perfect implementation
   - Responsive across devices
   - Proper use of Tailwind CSS

2. **Code Quality** (25%)

   - Clean, well-organized TypeScript
   - Reusable components
   - Proper typing and interfaces
   - Code comments where necessary

3. **Functionality** (25%)

   - All filters and sorting work correctly
   - Proper API integration
   - Correct state management
   - Navigation flows work smoothly

4. **User Experience** (15%)

   - Loading states
   - Error handling
   - Smooth transitions
   - Intuitive interactions

5. **Best Practices** (10%)
   - SEO considerations
   - Accessibility (ARIA labels, keyboard navigation)
   - Performance optimization
   - Git commit hygiene

---

## 📦 Deliverables

### Repository Structure

```
/src
  /app
    /products
      /[id]
        page.tsx
      page.tsx
    layout.tsx
    page.tsx
  /components
    /ui
    /products
    /filters
  /lib
    /api
    /types
  /hooks
/public
  /images
```

### Required Files

- `README.md` - Setup and running instructions
- `package.json` - Dependencies
- `.env.example` - Environment variables template
- TypeScript configuration
- ESLint/Prettier configs (optional but recommended)

### Documentation

Include in your README:

- Setup instructions
- How to run the project
- Environment variables needed
- API endpoints used
- Any assumptions made
- Known limitations
- Future improvements

---

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

---

## ⏱️ Timeline

- **Recommended Time:** 5 days
- **Submission:** Share GitHub/GitLab repository link

---

## 📎 Resources

- **Figma Design:** [View Design](https://www.figma.com/design/GfqOo9qg1H6bBPnLAoxbsc/Developer-Test?node-id=0-1&t=4XP8lc1kPZX6mZqp-1)
- **Postman Collection:** Included in repository (`Frontend Task APIs.postman_collection.json`)
- **API Base URL:** `https://task.woosonicpwa.com/api`

---

## 💡 Tips

- Start with the API integration to understand the data structure
- Build reusable components (ProductCard, FilterButton, etc.)
- Use TypeScript interfaces for API responses
- Test filters in Postman before implementing
- Commit frequently with clear messages
- Write clean, self-documenting code

---

## ❓ Questions?

If you have any questions about the requirements, please document them in your README along with the assumptions you made.

---

## 📤 Submission

Once completed:

1. Ensure your repository is public or accessible
2. Include a comprehensive README
3. Share the repository URL via email
4. Include any additional notes or comments

**Good luck! We're excited to see your solution! 🚀**
