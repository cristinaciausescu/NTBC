import { useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Banner, ProfileCard, WorkPackages, NeedsYou, AllTasks, Milestones, Feed, Badges, Missions, Leaderboard, Motivation } from './components/Widgets.jsx';
import { TasksPage, MilestonesPage } from './components/Pages.jsx';

export default function App() {
  // 'dashboard' | 'tasks' | 'milestones'
  const [view, setView] = useState('dashboard');
  const [selected, setSelected] = useState(null); // selected node id from the index
  const back = () => setView('dashboard');

  let content;
  if (view === 'tasks') {
    content = <TasksPage onBack={back} />;
  } else if (view === 'milestones') {
    content = <MilestonesPage onBack={back} />;
  } else {
    content = (
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
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar selected={selected} onSelect={setSelected} />
        <div className="layout-content">{content}</div>
      </div>
    </div>
  );
}
