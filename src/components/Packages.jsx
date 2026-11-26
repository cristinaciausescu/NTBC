import { useState } from 'react';

// Shows what's picked in the index and lets you turn it into a working package.
export function SelectionPanel({ picked, onRemove, onCreate, onClear }) {
  const items = Object.values(picked);
  const [name, setName] = useState('');

  if (items.length === 0) return null;

  const create = () => {
    onCreate(name.trim());
    setName('');
  };

  return (
    <section className="card selection">
      <div className="card-head">
        <h2>New working package <span className="count">{items.length}</span></h2>
        <button className="link" onClick={onClear}>Clear</button>
      </div>
      <ul className="chips">
        {items.map((item) => (
          <li key={item.id} className={`chip ${item.kind}`}>
            <span className="chip-kind">{item.kind}</span>
            {item.label}
            <button className="chip-x" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.label}`}>×</button>
          </li>
        ))}
      </ul>
      <div className="create-row">
        <input
          className="name-input"
          placeholder="Package name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="cta inline" onClick={create}>Create working package</button>
      </div>
    </section>
  );
}

// Lists the working packages that have been created.
export function PackagesCard({ packages, onDelete }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Working packages <span className="count">{packages.length}</span></h2>
      </div>
      {packages.length === 0 ? (
        <p className="muted small">Pick tasks and milestones in the index, then create a package.</p>
      ) : (
        <ul className="pkg-list">
          {packages.map((pkg) => (
            <li key={pkg.id} className="pkg">
              <div className="pkg-head">
                <strong>{pkg.name}</strong>
                <button className="chip-x" onClick={() => onDelete(pkg.id)} aria-label={`Delete ${pkg.name}`}>×</button>
              </div>
              <div className="muted small">
                {pkg.items.filter((i) => i.kind === 'task').length} tasks · {pkg.items.filter((i) => i.kind === 'milestone').length} milestones
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
