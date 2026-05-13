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
  },
  sports: {
    name: '体育',
    description: '体育竞技与健康生活',
    color: '#06b6d4'
  },
  news: {
    name: '新闻',
    description: '科技资讯与行业动态',
    color: '#f59e0b'
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
    cover: '/content/images/tech-1.png',
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
  },
  {
    id: 'ai-2026开源大模型',
    title: '2026 年最值得关注的 5 个开源大模型：谁在重塑 AI 格局？',
    category: 'ai',
    date: '2026-05-13',
    excerpt: '2026 年开源大模型已经不再是闭源模型的山寨版，它们正在多个赛道上超越商业模型。本文盘点 5 个最值得关注的开源大模型。',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: 'content/articles/ai-2026开源大模型.md'
  },
  {
    id: 'ai-提示词工程入门',
    title: '提示词工程入门：让 AI 听懂人话的艺术',
    category: 'ai',
    date: '2026-05-13',
    excerpt: '从零入门提示词工程，用类比和实战案例讲清楚什么是好的提示词，以及如何写出让 AI 听懂你的指令。',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: 'content/articles/ai-提示词工程入门.md'
  },
  {
    id: 'game-2026独立游戏盘点',
    title: '2026年独立游戏盘点：这5款小众神作你不能错过',
    category: 'game',
    date: '2026-05-13',
    excerpt: '2026年独立游戏百花齐放，从像素风到意识流叙事，这5款低调但惊艳的作品值得你立刻加入愿望单。',
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    content: 'content/articles/game-2026独立游戏盘点.md'
  },
  {
    id: 'game-黑神话悟空技术解析',
    title: '黑神话悟空技术解析：国产3A的工业新标杆',
    category: 'game',
    date: '2025-08-25',
    excerpt: '从虚幻5引擎到影视级动作捕捉，黑神话悟空用实机表现证明了国产游戏工业化能力的飞跃式突破。',
    cover: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    content: 'content/articles/game-黑神话悟空技术解析.md'
  },
  {
    id: 'music-2026春季歌单',
    title: '2026年Spring歌单：15首让你重新爱上生活的独立音乐',
    category: 'music',
    date: '2026-05-13',
    excerpt: '春天不只是季节，更是一种重新开始的勇气。15首精心挑选的独立音乐，陪你走过2026年的每一个春日清晨与黄昏。',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    content: 'content/articles/music-2026春季歌单.md'
  },
  {
    id: 'music-CityPop复兴',
    title: 'City Pop 复兴：为什么年轻人疯狂爱上80年代的日本声音',
    category: 'music',
    date: '2026-05-13',
    excerpt: '一种诞生于泡沫经济日本的流行音乐，正在TikTok上被Z世代重新发现。它不是简单的怀旧，而是年轻人对更松弛声音的本能回应。',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    content: 'content/articles/music-CityPop复兴.md'
  },
  {
    id: 'news-2026Q1独角兽盘点',
    title: '2026 年 Q1 全球独角兽盘点：这些公司正在 redefine 行业规则',
    category: 'news',
    date: '2026-05-13',
    excerpt: '2026 年第一季度，全球独角兽版图再度洗牌，AI 基础设施、具身智能、太空经济三大赛道集中爆发，新增独角兽数量同比翻倍。',
    cover: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    content: 'content/articles/news-2026Q1独角兽盘点.md'
  },
  {
    id: 'news-欧盟AIAct生效',
    title: '欧盟AI Act正式生效：中国科技企业的合规挑战与战略机遇',
    category: 'news',
    date: '2026-05-13',
    excerpt: '欧盟《人工智能法案》已正式生效，这部全球首部全面AI监管法律将如何影响中国科技企业？',
    cover: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
    content: 'content/articles/news-欧盟AIAct生效.md'
  },
  {
    id: 'sports-2026世界杯前瞻',
    title: '2026 世界杯前瞻：这 5 支黑马球队可能颠覆你的预测',
    category: 'sports',
    date: '2026-05-13',
    excerpt: '2026 美加墨世界杯扩军至 48 支球队，赛制革新让冷门空间前所未有地放大。这 5 支球队，极有可能让你的竞猜落空。',
    cover: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    content: 'content/articles/sports-2026世界杯前瞻.md'
  },
  {
    id: 'sports-足坛权力更迭',
    title: '从C罗到姆巴佩：足坛权力更迭背后的商业逻辑',
    category: 'sports',
    date: '2026-05-13',
    excerpt: '当梅西C罗的时代渐近尾声，姆巴佩们正以全新商业模型接管足坛。权力更迭不只是球场上的交接棒，更是资本逻辑的重构。',
    cover: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    content: 'content/articles/sports-足坛权力更迭.md'
  },
  {
    id: 'tech-Docker容器化Nodejs',
    title: 'Docker 容器化 Node.js 应用：从零到生产级部署',
    category: 'tech',
    date: '2026-05-13',
    excerpt: '手把手带你把第一个 Node.js 应用装进 Docker 容器，涵盖 Dockerfile 写法、多阶段构建、生产环境优化，以及新手最容易踩的 5 个坑。',
    cover: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
    content: 'content/articles/tech-Docker容器化Nodejs.md'
  },
  {
    id: 'tech-前端性能优化',
    title: '前端性能优化：从 0 到 1 的完整实践',
    category: 'tech',
    date: '2026-05-13',
    excerpt: '从加载、渲染、交互三个维度，系统梳理前端性能优化的核心知识点与实战技巧，帮助你从零构建完整的性能优化知识体系。',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    content: 'content/articles/tech-前端性能优化.md'
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

// 获取精选文章（按日期降序排序后取最新的 N 篇）
function getFeaturedArticles(limit = 6) {
  const sorted = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));
  return sorted.slice(0, limit);
}

// 获取分类信息
function getCategoryInfo(category) {
  return CATEGORIES[category] || CATEGORIES.all;
}

// 搜索文章（优化版：支持标题、摘要和分类名称搜索）
function searchArticles(query) {
  const lowerQuery = query.toLowerCase();
  return ARTICLES.filter(article => {
    const categoryInfo = getCategoryInfo(article.category);
    return article.title.toLowerCase().includes(lowerQuery) ||
           article.excerpt.toLowerCase().includes(lowerQuery) ||
           categoryInfo.name.toLowerCase().includes(lowerQuery);
  });
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