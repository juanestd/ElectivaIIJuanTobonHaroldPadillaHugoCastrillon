import { useCallback, useEffect, useRef, useState } from "react";
import Post from "../../components/common/PostCard";
import CreatePost from "../home/CreatePost";
import fetchWithAuth from "../../utils/fetchWithAuth";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();


  const fetchTweets = useCallback(async (pageNum) => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      const data = await fetchWithAuth(`http://localhost:3000/api/feed?page=${pageNum}&limit=10`, { method: "GET" });

      const sortedTweets = data.tweets.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      setTweets((prevTweets) => pageNum === 1 ? sortedTweets : [ ...prevTweets, ...sortedTweets]);
      setHasMore(pageNum < data.totalPages);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchTweets(page);
  }, [page]);

  const lasTweetRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    }, [loading, hasMore]
  );

  const handleDeletePost = (tweetId) => {
    setTweets((prevTweets) => prevTweets.filter((t) => t.id !== tweetId));
  }

  return (
    <div className="flex flex-1 min-h-screen">
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
        {/* Header */}
        <div className="flex w-full border-b border-gray-700">
          <div
            className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("forYou")}>
            For you
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
            )}
          </div>
          <div
            className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("following")}>
            Following
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
            )}
          </div>
        </div>

        {/* CREATE POST INPUT */}
        <CreatePost />

        {/* POSTS */}
        {tweets.map((tweet, index) => (
          <div ref={index === tweets.length - 1 ? lasTweetRef : null} key={tweet.id}>
            <Post post={tweet} onDelete={handleDeletePost} />
          </div>
        ))}
        {loading && (<div className="p-4">Loading...</div>)}
        {!tweets?.length && !loading && (<div className="p-4">No tweets available.</div>)}
      </div>
    </div>
  );
};
export default HomePage;
