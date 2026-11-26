import { useState } from 'react';
import { navTree } from '../navTree.js';
import '../sidebar.css';

function Node({ node, depth, picked, onPick }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const isPickable = Boolean(node.kind);
  const [open, setOpen] = useState(depth < 1);
  const isPicked = Boolean(picked[node.id]);

  return (
    <li className="nav-node">
      <div
        className={`nav-row ${isPicked ? 'selected' : ''}`}
        style={{ paddingLeft: 12 + depth * 14 }}
      >
        {hasChildren ? (
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? '▾' : '▸'}
          </button>
        ) : isPickable ? (
          <input
            type="checkbox"
            className="nav-check"
            checked={isPicked}
            onChange={() => onPick(node)}
            aria-label={`Select ${node.label}`}
          />
        ) : (
          <span className="nav-dot" aria-hidden="true" />
        )}
        {isPickable ? (
          <button className="nav-label" onClick={() => onPick(node)}>
            {node.label}
          </button>
        ) : (
          <span className="nav-label nav-group">{node.label}</span>
        )}
      </div>
      {hasChildren && open && (
        <ul className="nav-children">
          {node.children.map((child) => (
            <Node key={child.id} node={child} depth={depth + 1} picked={picked} onPick={onPick} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ picked, onPick }) {
  return (
    <nav className="sidebar" aria-label="Project index">
      <div className="sidebar-title">Index</div>
      <ul className="nav-tree">
        {navTree.map((node) => (
          <Node key={node.id} node={node} depth={0} picked={picked} onPick={onPick} />
        ))}
      </ul>
    </nav>
  );
}
