import { useEffect, useState } from 'react';
import { feed } from '../data.js';
import './feed.css';

const STORAGE_KEY = 'ntbc-feed-activity';

// Read saved likes and replies from this browser, falling back to empty.
function loadActivity() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      liked: saved?.liked ?? {},
      replies: saved?.replies ?? {},
    };
  } catch {
    return { liked: {}, replies: {} };
  }
}

// Team feed with working Like and Reply buttons. Saved in this browser's localStorage.
export default function Feed() {
  const [{ liked, replies }, setActivity] = useState(loadActivity);
  const [openReply, setOpenReply] = useState(null); // postId whose reply box is open
  const [draft, setDraft] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ liked, replies }));
    } catch {
      /* storage unavailable: activity stays in memory only */
    }
  }, [liked, replies]);

  const toggleLike = (id) =>
    setActivity((prev) => ({
      ...prev,
      liked: { ...prev.liked, [id]: !prev.liked[id] },
    }));

  const toggleReply = (id) => {
    setDraft('');
    setOpenReply((current) => (current === id ? null : id));
  };

  const sendReply = (id) => {
    const text = draft.trim();
    if (!text) return;
    setActivity((prev) => ({
      ...prev,
      replies: {
        ...prev.replies,
        [id]: [...(prev.replies[id] ?? []), { id: Date.now(), text, when: 'Just now' }],
      },
    }));
    setDraft('');
    setOpenReply(null);
  };

  return (
    <section className="card">
      <h2>Feed</h2>
      <p className="muted">Latest updates from your team</p>
      {feed.map((post) => {
        const isLiked = Boolean(liked[post.id]);
        const postReplies = replies[post.id] ?? [];
        const isReplying = openReply === post.id;

        return (
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
                <button
                  className={`action ${isLiked ? 'active' : ''}`}
                  aria-pressed={isLiked}
                  onClick={() => toggleLike(post.id)}
                >
                  👍 {isLiked ? 'Liked' : 'Like'}
                </button>
                <button
                  className={`action ${isReplying ? 'active' : ''}`}
                  aria-expanded={isReplying}
                  onClick={() => toggleReply(post.id)}
                >
                  💬 Reply{postReplies.length > 0 ? ` (${postReplies.length})` : ''}
                </button>
              </div>

              {postReplies.length > 0 && (
                <ul className="replies">
                  {postReplies.map((r) => (
                    <li key={r.id}>
                      <strong>You</strong> <span className="when">{r.when}</span>
                      <p>{r.text}</p>
                    </li>
                  ))}
                </ul>
              )}

              {isReplying && (
                <div className="reply-box">
                  <textarea
                    rows={2}
                    placeholder={`Reply to ${post.author}…`}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    autoFocus
                  />
                  <div className="reply-actions">
                    <button className="action" onClick={() => toggleReply(post.id)}>Cancel</button>
                    <button className="cta inline" onClick={() => sendReply(post.id)} disabled={!draft.trim()}>
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
