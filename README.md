# 📍 Where Am I

A simple location-based app to detect and display the user’s current position (latitude, longitude, and address).
It uses the browser’s Geolocation API and reverse geocoding to resolve the address from coordinates.

---

## 🛠 Tech Stack

* React + Vite
* TypeScript
* A geocoding API (e.g. OpenStreetMap / Mapbox / Google Maps)
* TailwindCSS or CSS modules (if used)
* Axios or fetch for HTTP requests

---

## 📂 Project Structure (example)

```text
.
├── public/               # Static assets
├── src/
│   ├── components/       # UI components (e.g. map, location display)
│   ├── services/         # API / geocoding logic
│   ├── hooks/            # Custom hooks (useGeolocation etc.)
│   ├── App.tsx           # Main component
│   └── index.tsx
├── .env                  # Environment variables (e.g. API key)
├── package.json
└── vite.config.ts
```

---

## 📦 Installation & Running Locally

```bash
git clone https://github.com/marcus-koch-fs-dev/where_am_I.git
cd where_am_I
npm install          # or pnpm install
npm run dev
```

Open your browser to `http://localhost:5173`.

---

## ⚙️ Environment Variables

Create a `.env` file in the root with something like:

```env
VITE_GEOCODING_API_KEY=your_api_key_here
VITE_GEOCODING_API_URL=https://api.example.com/reverse
```

---

## ▶️ Features / Usage

* Request user’s current location (latitude & longitude)
* Call reverse geocoding API to get address
* Display address and coordinates
* Handle permission denied or errors gracefully

---

## 🔜 Next Steps

* Show location on a map (e.g. with Leaflet or Mapbox GL)
* Add ability to lookup addresses manually
* Cache recent lookups
* Offline support / fallback
* Improve styling & responsive layout

---

## 📄 License

MIT — free to use, modify, and distribute.
