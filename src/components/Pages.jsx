import { milestones } from '../data.js';
import { AllTasks } from './Widgets.jsx';

// Full-page view of all tasks, opened from "Needs you → View all".
export function TasksPage({ onBack, completedIds }) {
  return (
    <div className="page">
      <button className="back" onClick={onBack}>← Back to dashboard</button>
      <AllTasks completedIds={completedIds} />
    </div>
  );
}

// Full-page view of all milestones, opened from "Coming up → All milestones".
export function MilestonesPage({ onBack }) {
  return (
    <div className="page">
      <button className="back" onClick={onBack}>← Back to dashboard</button>
      <section className="card">
        <h2>All milestones</h2>
        <p className="muted">Turn tasks into achievements!</p>
        <ul className="task-list">
          {milestones.map((m) => (
            <li key={m.id} className={`task-li milestone-li ${m.tone}`}>
              <span className="dot small-dot">{m.count}</span>
              <div className="task-li-body">
                <strong>{m.label}</strong>
                <div className="muted small">{m.sub}</div>
              </div>
              <span className="task-li-xp">🏆 +{m.xp} XP</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
