import React, { useState, useEffect } from "react";

function FavoritesPage({ favorites, removeFavorite }) {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      let favoriteIds = [...new Set(favorites)];

      if (favoriteIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        let posts = await Promise.all(
          favoriteIds.map(async (id) => {
            const response = await fetch(`https://www.reddit.com/comments/${id}.json`);
            const data = await response.json();
            return data[0].data.children[0].data;
          })
        );
        setFavoritePosts(posts);
      } catch (error) {
        console.error("Error fetching favorite posts:", error);
      }

      setIsLoading(false);
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="page-container">
      <h2>Your Favorite Posts</h2>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : favoritePosts.length === 0 ? (
        <p className="empty-message">No favorite posts yet.</p>
      ) : (
        <div className="list-container"> {/* ✅ Scrollable container */}
          <ul className="post-list">
            {favoritePosts.map((post, index) => (
              <li key={`${post.id}-${index}`} className="post-item">
                <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
                <p>Score: {post.score}</p>
                <button onClick={() => removeFavorite(post.id)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
