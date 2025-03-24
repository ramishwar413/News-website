import { useState, useEffect } from "react";
import { getTopHeadlines, searchNews } from "./services/newsApi";
import { Article } from "./types/news";
import Header from "./components/Header";
import NewsCard from "./components/NewsCard";
import { Loader2 } from "lucide-react";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = searchQuery ? await searchNews(searchQuery) : await getTopHeadlines(category);
        setArticles(response.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchNews, 500);
    return () => clearTimeout(debounceTimer);
  }, [category, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={setSearchQuery} onCategoryChange={setCategory} />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={`${article.title}-${index}`} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
