import { useState } from 'react';
import Header from './components/Header.jsx';
import { Banner, ProfileCard, WorkPackages, NeedsYou, AllTasks, Milestones, Feed, Badges, Missions, Leaderboard, Motivation } from './components/Widgets.jsx';
import { TasksPage, MilestonesPage } from './components/Pages.jsx';

export default function App() {
  // 'dashboard' | 'tasks' | 'milestones'
  const [view, setView] = useState('dashboard');
  const back = () => setView('dashboard');

  if (view === 'tasks') {
    return (
      <div className="app">
        <Header />
        <TasksPage onBack={back} />
      </div>
    );
  }

  if (view === 'milestones') {
    return (
      <div className="app">
        <Header />
        <MilestonesPage onBack={back} />
      </div>
    );
  }

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
          <NeedsYou onOpen={setView} />
          <AllTasks />
          <Milestones onOpen={setView} />
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
