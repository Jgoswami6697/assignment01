import React, { useState } from "react";

function MainPage({ addToFavorites }) {
  const [subreddit, setSubreddit] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch posts from Reddit API
  const fetchPosts = async () => {
    if (!subreddit) {
      setError("Please enter a subreddit name.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
      if (!response.ok) throw new Error("Subreddit not found!");

      const data = await response.json();
      if (data.data.children.length === 0) {
        throw new Error("No posts found in this subreddit.");
      }

      setPosts(data.data.children.map((post) => post.data));
    } catch (error) {
      setError(error.message);
      setPosts([]);
    }

    setIsLoading(false);
  };

  return (
    <div className="page-container">
      <h2>Search Subreddit</h2>
      <input
        type="text"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        placeholder="Enter subreddit"
        className="search-input"
      />
      <button onClick={fetchPosts} className="search-btn">Search</button>

      {error && <p className="error-message">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}

      <div className="list-container"> {/* ✅ Scrollable container */}
        <ul className="post-list">
          {posts.map((post, index) => (
            <li key={`${post.id}-${index}`} className="post-item">
              <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
              <p>Score: {post.score}</p>
              <button onClick={() => addToFavorites(post)} className="fav-btn">Add to Favorites</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
