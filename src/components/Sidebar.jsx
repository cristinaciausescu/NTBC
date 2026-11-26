import { useState } from 'react';
import { navTree } from '../navTree.js';
import '../sidebar.css';

function Node({ node, depth, selected, onSelect }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const [open, setOpen] = useState(depth < 1);
  const isSelected = selected === node.id;

  return (
    <li className="nav-node">
      <div
        className={`nav-row ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: 12 + depth * 14 }}
      >
        {hasChildren ? (
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="nav-dot" aria-hidden="true" />
        )}
        <button className="nav-label" onClick={() => onSelect(node.id)}>
          {node.label}
        </button>
      </div>
      {hasChildren && open && (
        <ul className="nav-children">
          {node.children.map((child) => (
            <Node key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ selected, onSelect }) {
  return (
    <nav className="sidebar" aria-label="Project index">
      <div className="sidebar-title">Index</div>
      <ul className="nav-tree">
        {navTree.map((node) => (
          <Node key={node.id} node={node} depth={0} selected={selected} onSelect={onSelect} />
        ))}
      </ul>
    </nav>
  );
}
