import Header from './components/Header.jsx';
import { Banner, ProfileCard, WorkPackages, NeedsYou, Milestones, Feed, Badges, Missions, Leaderboard, Motivation } from './components/Widgets.jsx';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="grid">
        <div className="col col-left">
          <WorkPackages />
          <Motivation />
        </div>

        <div className="col col-center">
          <Banner />
          <NeedsYou />
          <Milestones />
          <Feed />
        </div>

        <div className="col col-right">
          <ProfileCard />
          <Badges />
          <Missions />
          <Leaderboard />
        </div>
      </main>
    </div>
  );
}
