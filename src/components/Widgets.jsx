import {
  user,
  workPackages,
  needsYou,
  milestones,
  feed,
  badges,
  missions,
  leaderboard,
} from '../data.js';

const xpPct = Math.round((user.xp / user.xpNext) * 100);

export function Banner() {
  return (
    <section className="card banner">
      <div>
        <h1>Small steps. Big impact.</h1>
        <p>Complete your tasks, earn points, unlock achievements!</p>
      </div>
      <p className="banner-quote">"Progress, not perfection."</p>
    </section>
  );
}

export function ProfileCard() {
  return (
    <section className="card profile">
      <div className="avatar-large" aria-hidden="true">{user.name.charAt(0)}</div>
      <div className="profile-info">
        <div className="profile-name">{user.name}</div>
        <div className="profile-level">Level {user.level} – {user.levelTitle}</div>
        <div className="xp-bar" role="progressbar" aria-valuenow={user.xp} aria-valuemax={user.xpNext}>
          <span style={{ width: `${xpPct}%` }} />
        </div>
        <div className="xp-text">{user.xp} / {user.xpNext} XP</div>
      </div>
      <div className="streak">
        <div className="streak-num">🔥 {user.streakDays}</div>
        <div className="streak-label">day streak</div>
        <div className="streak-sub">Keep it going!</div>
      </div>
    </section>
  );
}

export function WorkPackages() {
  return (
    <section className="card">
      <h2>Your Work Packages</h2>
      <p className="muted">Make progress. Earn rewards.</p>
      <ul className="wp-list">
        {workPackages.map((wp) => (
          <li key={wp.id} className="wp">
            <div className={`wp-icon ${wp.color}`} aria-hidden="true" />
            <div className="wp-body">
              <div className="wp-name">{wp.name}</div>
              <div className="bar">
                <span className={wp.color} style={{ width: `${wp.progress}%` }} />
              </div>
              <div className="wp-xp">+{wp.xp} XP</div>
            </div>
            <div className="wp-pct">{wp.progress}%</div>
          </li>
        ))}
      </ul>
      <div className="card-footer">
        <a href="#">View all →</a>
        <a href="#">+2 more</a>
      </div>
    </section>
  );
}

const EFFORT_ORDER = { easy: 0, medium: 1, hard: 2 };

// Full task list (all items, easiest first), shown below the top-5 row.
export function AllTasks({ completedIds = [] }) {
  const sorted = needsYou
    .filter((t) => !completedIds.includes(t.id))
    .sort(
    (a, b) => (EFFORT_ORDER[a.effort] ?? 1) - (EFFORT_ORDER[b.effort] ?? 1),
  );
  return (
    <section className="card">
      <div className="card-head">
        <h2>All tasks <span className="count">{sorted.length}</span></h2>
      </div>
      <ul className="task-list">
        {sorted.map((item) => (
          <li key={item.id} className="task-li">
            <span className={`pill ${item.type === 'Action' ? 'pill-action' : 'pill-mention'}`}>{item.type}</span>
            <div className="task-li-body">
              <strong>{item.title}</strong>
              <div className="muted small">{item.body}</div>
            </div>
            <span className={`effort effort-${item.effort}`}>{item.effort}</span>
            {item.daysLeft && <span className="due">⏱ {item.daysLeft}d</span>}
            <span className="task-li-xp">🏆 {item.xp} XP</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NeedsYou({ onOpen, completedIds = [], onComplete }) {
  // Open tasks only, newest first (by createdAt), top 5.
  // Completing a task removes it here and the next newest open task takes its place.
  const topFive = needsYou
    .filter((t) => !completedIds.includes(t.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <section className="card">
      <div className="card-head">
        <h2>Needs you <span className="count">{topFive.length}</span></h2>
        <button className="link" onClick={() => onOpen?.('tasks')}>View all →</button>
      </div>
      <p className="muted">Newest first. Complete these to earn points!</p>
      <div className="task-row" role="list">
        {topFive.map((item) => (
          <article key={item.id} className="task" role="listitem">
            <div className="task-meta">
              <span className={`pill ${item.type === 'Action' ? 'pill-action' : 'pill-mention'}`}>{item.type}</span>
              <span className={`effort effort-${item.effort}`}>{item.effort}</span>
              {item.daysLeft && <span className="due">⏱ {item.daysLeft} days left</span>}
            </div>
            <h3>{item.title}</h3>
            <p className="muted small">{item.body}</p>
            <div className="task-xp">🏆 {item.xp} XP</div>
            <button className="link" onClick={() => onComplete?.(item.id)}>Mark done ✓</button>
            <a
              href="#tasks"
              onClick={(e) => {
                e.preventDefault();
                onOpen?.('tasks');
              }}
            >
              Take me there →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Milestones({ onOpen }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Coming up</h2>
        <button className="link" onClick={() => onOpen?.('milestones')}>All milestones →</button>
      </div>
      <p className="muted">Turn tasks into achievements!</p>
      <ol className="timeline">
        {milestones.map((m) => (
          <li key={m.id} className={`stop ${m.tone}`}>
            <div className="dot">{m.count}</div>
            <div className="stop-label">{m.label}</div>
            <div className="stop-sub">{m.sub}</div>
            <div className="stop-xp">🏆 +{m.xp} XP</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Feed() {
  return (
    <section className="card">
      <h2>Feed</h2>
      <p className="muted">Latest updates from your team</p>
      {feed.map((post) => (
        <article key={post.id} className="post">
          <div className="post-avatar" aria-hidden="true" />
          <div className="post-body">
            <div className="post-head">
              <strong>{post.author}</strong>
              <span className="tag">{post.tag}</span>
              <span className="when">{post.when}</span>
            </div>
            <p>{post.text}</p>
            <div className="post-actions">
              <button>👍 Like</button>
              <button>💬 Reply</button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export function Badges() {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Your Badges</h2>
        <a href="#">View all →</a>
      </div>
      <div className="badge-row">
        {badges.map((b) => (
          <div key={b.id} className="badge">
            <div className={`shield ${b.color}`} aria-hidden="true">{iconFor(b.icon)}</div>
            <div className="badge-name">{b.name}</div>
            <div className="badge-desc muted small">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function iconFor(name) {
  return { check: '✓', bolt: '⚡', star: '★', people: '👥' }[name];
}

export function Missions() {
  return (
    <section className="card missions">
      <h2>This Week's Missions</h2>
      <p className="muted">Complete to earn bonus rewards!</p>
      <ul>
        {missions.map((m) => (
          <li key={m.id}>
            <input type="checkbox" aria-label={m.label} />
            <span className="mission-label">{m.label}</span>
            <span className="mission-xp">🏆 +{m.xp} XP</span>
            <span className="mission-count">{m.done}/{m.total}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Leaderboard() {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Leaderboard</h2>
        <div className="segmented">
          <button className="active">This Month</button>
          <button>All Time</button>
        </div>
      </div>
      <ol className="ranks">
        {leaderboard.map((r) => (
          <li key={r.rank} className={r.me ? 'me' : ''}>
            <span className="rank">{r.rank}</span>
            <span className="rank-avatar" aria-hidden="true" />
            <span className="rank-name">{r.name}</span>
            <span className="rank-xp">{r.xp} XP</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Motivation() {
  return (
    <section className="card motivation">
      <div className="trophy" aria-hidden="true">🏆</div>
      <h2>You're making a difference!</h2>
      <p className="muted">Every task completed brings the team closer to success.</p>
      <button className="cta">Keep going! →</button>
    </section>
  );
}
