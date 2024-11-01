import { useEffect, useState } from "react";
import Post from "../../components/common/PostCard";
import CreatePost from "../home/CreatePost";
import headerFactory from '../../utils/headerFactory';

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const headerApi = headerFactory;

  useEffect(() => {
    async function fetchData() {
      if (feedType) {
        const response = await fetch(
          "http://localhost:3000/api/feed?page=1&limit=10000", { method: "GET", headers: headerApi }
        );
        const data = await response.json()

        if (response.ok) {
          setTweets(data.tweets);
        }
        setLoading(false);
        return;
      }
    }
    fetchData();
  }, [feedType]);

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
        {loading ? (
          <div>Cargando...</div>
        ) : (
          tweets && !loading && tweets.map((tweet, index) => (<Post key={index} post={tweet} />))
        )}

        {!tweets?.length && !loading && (
          <div>No hay tweets por ver.</div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
