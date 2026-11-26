import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import { SelectionPanel, PackagesCard } from './components/Packages.jsx';
import Feed from './components/Feed.jsx';
import { Banner, ProfileCard, WorkPackages, NeedsYou, AllTasks, Milestones, Badges, Missions, Leaderboard, Motivation } from './components/Widgets.jsx';
import { TasksPage, MilestonesPage } from './components/Pages.jsx';

const STORAGE_KEY = 'ntbc-working-packages';

export default function App() {
  // 'dashboard' | 'tasks' | 'milestones'
  const [view, setView] = useState('dashboard');
  const back = () => setView('dashboard');

  // Items picked in the index: { [nodeId]: { id, label, kind, meta } }
  const [picked, setPicked] = useState({});

  // Task ids the user has completed. Completed tasks leave "Needs you".
  const [completedIds, setCompletedIds] = useState([]);
  const completeTask = (id) =>
    setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

  // Working packages, saved in this browser.
  const [packages, setPackages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
    } catch {
      /* storage unavailable: packages stay in memory only */
    }
  }, [packages]);

  const togglePick = (node) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (next[node.id]) delete next[node.id];
      else next[node.id] = { id: node.id, label: node.label, kind: node.kind, meta: node.meta };
      return next;
    });

  const removePick = (id) =>
    setPicked((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const createPackage = (name) => {
    const items = Object.values(picked);
    if (items.length === 0) return;
    const pkg = {
      id: Date.now(),
      name: name || `Working package ${packages.length + 1}`,
      items,
    };
    setPackages((prev) => [...prev, pkg]);
    setPicked({});
  };

  const deletePackage = (id) => setPackages((prev) => prev.filter((p) => p.id !== id));

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
          <PackagesCard packages={packages} onDelete={deletePackage} />
          <Motivation />
        </div>

        <div className="col col-center">
          <SelectionPanel
            picked={picked}
            onRemove={removePick}
            onCreate={createPackage}
            onClear={() => setPicked({})}
          />
          <Banner />
          <NeedsYou onOpen={setView} completedIds={completedIds} onComplete={completeTask} />
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
        <Sidebar picked={picked} onPick={togglePick} />
        <div className="layout-content">{content}</div>
      </div>
    </div>
  );
}
