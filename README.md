# NTBC · WorkHub

Dashboard UI for the NTBC workflow companion: work packages, "Needs you" tasks, milestones, feed, badges, weekly missions and leaderboard.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Structure

- `src/data.js`: mock data shaped like the dashboard. Swap for API/state later.
- `src/components/Widgets.jsx`: dashboard cards.
- `src/components/Header.jsx`: top bar with search, notifications and user.
- `src/styles.css`: all styling (CSS variables at the top).
