/**
 * Hot-Site - 数据配置
 * 包含文章元信息、分类配置等
 */

// 分类配置
const CATEGORIES = {
  all: {
    name: '全部',
    description: '浏览所有内容'
  },
  tech: {
    name: '技术',
    description: '前沿技术与开发实践',
    color: '#6366f1'
  },
  ai: {
    name: 'AI',
    description: '人工智能与机器学习',
    color: '#10b981'
  },
  game: {
    name: '游戏',
    description: '游戏开发与设计',
    color: '#f43f5e'
  },
  music: {
    name: '音乐',
    description: '音乐创作与欣赏',
    color: '#8b5cf6'
  },
  art: {
    name: '艺术',
    description: '创意表达与美学探索',
    color: '#06b6d4'
  }
};

// 文章元数据
const ARTICLES = [
  {
    id: 'article-1',
    title: '现代前端架构设计：从组件化到微前端',
    category: 'tech',
    date: '2026-05-01',
    excerpt: '探索现代前端架构的演进历程，从组件化开发到微前端架构的实践与思考。深入了解如何设计可扩展、可维护的大型前端应用。',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab5c?w=800&q=80',
    content: 'content/articles/article-1.md'
  },
  {
    id: 'article-2',
    title: '大语言模型：原理、架构与未来',
    category: 'ai',
    date: '2026-04-28',
    excerpt: '深入解析大语言模型的工作原理，从 Transformer 架构到 RLHF 训练，探讨 AI 的发展趋势与应用前景。',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: 'content/articles/article-2.md'
  },
  {
    id: 'article-3',
    title: '独立游戏开发：从想法到上线',
    category: 'game',
    date: '2026-04-25',
    excerpt: '分享独立游戏开发的完整流程，从概念设计到游戏发布，探讨如何在资源有限的情况下打造精品游戏。',
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    content: 'content/articles/article-3.md'
  },
  {
    id: 'article-4',
    title: '电子音乐制作：从采样到混音',
    category: 'music',
    date: '2026-04-22',
    excerpt: '探索电子音乐制作的完整流程，从节拍编排到母带处理，分享 DAW 使用技巧与创作心得。',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    content: 'content/articles/article-4.md'
  },
  {
    id: 'article-5',
    title: 'TypeScript 高级类型体操：从入门到实践',
    category: 'tech',
    date: '2026-04-18',
    excerpt: '深入 TypeScript 类型系统，掌握高级类型技巧。通过实际案例，学习如何写出更安全、更优雅的 TypeScript 代码。',
    cover: 'https://images.unsplash.com/photo-1516116216624-290e1efab6e3?w=800&q=80',
    content: 'content/articles/article-5.md'
  },
  {
    id: 'article-6',
    title: '提示词工程：与 AI 高效对话的艺术',
    category: 'ai',
    date: '2026-04-15',
    excerpt: '掌握提示词工程的核心理念，从基础技巧到高级策略，学习如何通过精准的提示词获得更好的 AI 输出。',
    cover: 'https://images.unsplash.com/photo-1684163761886-b2f3b5a6e8e1?w=800&q=80',
    content: 'content/articles/article-6.md'
  },
  {
    id: 'article-7',
    title: 'Unity vs Godot： indie 游戏引擎对比',
    category: 'game',
    date: '2026-04-12',
    excerpt: '全面对比 Unity 与 Godot 两大游戏引擎，从功能、性能、生态等方面分析各自的优势与适用场景。',
    cover: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    content: 'content/articles/article-7.md'
  },
  {
    id: 'article-8',
    title: '音乐理论入门：和弦进行与调式',
    category: 'music',
    date: '2026-04-08',
    excerpt: '从基础乐理开始，解析和弦进行中的色彩变化，探索不同调式带来的情感表达与音乐风格。',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80',
    content: 'content/articles/article-8.md'
  }
];

// 根据 ID 获取文章
function getArticleById(id) {
  return ARTICLES.find(article => article.id === id);
}

// 根据分类获取文章列表
function getArticlesByCategory(category) {
  if (category === 'all') {
    return ARTICLES;
  }
  return ARTICLES.filter(article => article.category === category);
}

// 获取精选文章（最新的 6 篇）
function getFeaturedArticles(limit = 6) {
  return ARTICLES.slice(0, limit);
}

// 获取分类信息
function getCategoryInfo(category) {
  return CATEGORIES[category] || CATEGORIES.all;
}

// 搜索文章
function searchArticles(query) {
  const lowerQuery = query.toLowerCase();
  return ARTICLES.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery)
  );
}

// 导出数据（兼容不同环境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CATEGORIES,
    ARTICLES,
    getArticleById,
    getArticlesByCategory,
    getFeaturedArticles,
    getCategoryInfo,
    searchArticles
  };
}