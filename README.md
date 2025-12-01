# E-commerce Product Listing Page

This project implements a responsive product listing and product details experience powered by the public task API. It is built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**.

---

## 🧰 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd e-commerce_product_listing_page
   ```

2. **Install dependencies** (Node.js ≥ 18)
   ```bash
   npm install
   ```

3. **Configure environment variables** (see the section below) in a `.env.local` file at the project root.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app is available at [http://localhost:3000](http://localhost:3000).

5. *(Optional)* Run lint checks
   ```bash
   npm run lint
   ```

---

## ▶️ How to Run the Project

- **Development:** `npm run dev`
- **Production build:** `npm run build && npm run start`
- **Linting / formatting:** `npm run lint`

The App Router automatically handles hot reloading while developing.

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variable:

```env
NEXT_PUBLIC_API_URL=https://task.woosonicpwa.com/api
```

- `NEXT_PUBLIC_API_URL` – Base URL for the task API. This must be accessible on the client because filters and the mobile modal make client-side requests.

You can point this variable to staging or mock servers when testing.

---

## 🌐 API Endpoints Used

All requests include the `Accept-Language` header (`en` by default, `fr` optional).

| Endpoint | Method | Usage |
|----------|--------|-------|
| `/products` | `GET` | Fetch paginated product listings with filters (brand, size, price, rating, status, page, sort). |
| `/products/{id}` | `GET` | Fetch full product details, including available sizes and reviews. |

See `task/Frontend Task APIs.postman_collection.json` for detailed request/response examples.

---

## 📄 Pagination

- The `/products` API already returns pagination metadata (`current_page`, `total_pages`, `per_page`, etc.).  
- The Products page reads the `page` query parameter and forwards it when fetching data.  
- UI controls live in `components/ui/paginationControls.tsx` and preserve all active filters when switching pages.  
- Pagination is rendered on both desktop and mobile layouts directly beneath the product grid.

---

## ✅ Assumptions

- The API only supports `en` and `fr` locales; other languages fall back to English.
- Available sizes returned by `/products/{id}` are trustworthy—any sizes missing from `available_sizes` are treated as unavailable/disabled in the UI.
- All monetary values are provided in USD and can be formatted with a simple `$` prefix.
- Product images are single URLs; no gallery endpoints are provided, so a single hero image is displayed.
- Filtering and sorting are fully handled server-side; the UI reflects URL query parameters without additional client-side list manipulation.

---

## ⚠️ Known Limitations

- “Add to Cart” and language are UI-only (no cart persistence or API integration).
---

## 🚀 Future Improvements

- Implement real cart functionality (state management + checkout flow).
- Offer optional infinite scroll (in addition to the current pagination).
- Support multiple product images with thumbnails and zoom.
- Add automated tests (unit + integration) for filtering logic and data fetching.

