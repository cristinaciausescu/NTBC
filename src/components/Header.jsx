import { user } from '../data.js';

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-icon" aria-hidden="true">🏆</span>
        <div>
          <div className="brand-name">WorkHub</div>
          <div className="brand-tag">Turn progress into possibilities</div>
        </div>
      </div>

      <label className="search">
        <span aria-hidden="true">🔍</span>
        <input type="search" placeholder="Search people, posts, work packages..." />
      </label>

      <div className="topbar-right">
        <button className="bell" aria-label="Notifications">
          🔔<span className="badge-count">3</span>
        </button>
        <div className="avatar-small" aria-hidden="true">{user.name.charAt(0)}</div>
        <span className="user-name">{user.name}</span>
      </div>
    </header>
  );
}
