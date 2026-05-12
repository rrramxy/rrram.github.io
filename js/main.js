/**
 * 现代知识库 - 主逻辑
 * 包含导航、交互、Markdown 渲染等功能
 */

// ==================== 全局状态 ====================
const state = {
  currentPage: 'home',
  currentCategory: 'all',
  navbarScrolled: false
};

// ==================== 工具函数 ====================

// 获取 URL 参数
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 格式化日期
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('zh-CN', options);
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== 导航栏 ====================

// 初始化导航栏
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // 滚动时改变导航栏样式
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      state.navbarScrolled = true;
    } else {
      navbar.classList.remove('scrolled');
      state.navbarScrolled = false;
    }
  }, 10));

  // 移动端汉堡菜单
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // 点击菜单项后关闭菜单
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ==================== 文章卡片渲染 ====================

// 创建文章卡片
function createArticleCard(article) {
  const card = document.createElement('article');
  card.className = 'article-card page-enter';
  card.setAttribute('role', 'article');
  
  const categoryInfo = getCategoryInfo(article.category);
  
  card.innerHTML = `
    <div class="article-card-cover">
      <img src="${article.cover}" alt="${article.title}" loading="lazy" />
      <span class="category-badge" data-cat="${article.category}">${categoryInfo.name}</span>
    </div>
    <div class="article-card-body">
      <div class="article-card-date">${formatDate(article.date)}</div>
      <h3 class="article-card-title">${article.title}</h3>
      <p class="article-card-excerpt">${article.excerpt}</p>
    </div>
  `;

  // 点击跳转到详情页
  card.addEventListener('click', () => {
    window.location.href = `article.html?id=${article.id}`;
  });

  // 键盘访问
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = `article.html?id=${article.id}`;
    }
  });

  return card;
}

// 渲染文章网格
function renderArticleGrid(containerId, articles) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
        <p>暂无相关内容</p>
      </div>
    `;
    return;
  }

  articles.forEach((article, index) => {
    const card = createArticleCard(article);
    card.style.animationDelay = `${index * 0.1}s`;
    container.appendChild(card);
  });
}

// ==================== 首页逻辑 ====================

function initHomePage() {
  // 渲染精选文章
  const featuredArticles = getFeaturedArticles(6);
  renderArticleGrid('featured-grid', featuredArticles);
}

// ==================== 分类列表页逻辑 ====================

function initCategoryPage() {
  const category = getUrlParam('cat') || 'all';
  state.currentCategory = category;

  // 更新页面标题
  const categoryInfo = getCategoryInfo(category);
  const pageTitle = document.querySelector('.page-header h1');
  const pageDesc = document.querySelector('.page-header p');

  if (pageTitle) pageTitle.textContent = categoryInfo.name;
  if (pageDesc) pageDesc.textContent = categoryInfo.description;
  document.title = `${categoryInfo.name} - 现代知识库`;

  // 初始化筛选按钮
  initFilterButtons(category);

  // 渲染文章列表
  const articles = getArticlesByCategory(category);
  renderArticleGrid('article-grid', articles);
}

// 初始化筛选按钮
function initFilterButtons(activeCategory) {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  // 创建筛选按钮
  Object.keys(CATEGORIES).forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${cat === activeCategory ? 'active' : ''}`;
    btn.textContent = CATEGORIES[cat].name;
    btn.setAttribute('data-category', cat);
    filterBar.appendChild(btn);
  });

  // 点击筛选
  filterBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      const cat = e.target.getAttribute('data-category');
      
      // 更新 URL
      const newUrl = cat === 'all' ? 'category.html' : `category.html?cat=${cat}`;
      window.history.pushState({ category: cat }, '', newUrl);

      // 更新按钮状态
      filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');

      // 更新内容
      const categoryInfo = getCategoryInfo(cat);
      document.querySelector('.page-header h1').textContent = categoryInfo.name;
      document.querySelector('.page-header p').textContent = categoryInfo.description;
      document.title = `${categoryInfo.name} - 现代知识库`;

      const articles = getArticlesByCategory(cat);
      renderArticleGrid('article-grid', articles);
    }
  });
}

// ==================== 文章详情页逻辑 ====================

function initArticlePage() {
  const articleId = getUrlParam('id');
  if (!articleId) {
    showError('文章未找到');
    return;
  }

  const article = getArticleById(articleId);
  if (!article) {
    showError('文章未找到');
    return;
  }

  // 更新页面标题
  document.title = `${article.title} - 现代知识库`;

  // 渲染文章信息
  renderArticleDetail(article);

  // 加载 Markdown 内容
  loadMarkdownContent(article.content);
}

// 渲染文章详情
function renderArticleDetail(article) {
  const categoryInfo = getCategoryInfo(article.category);

  // 渲染头部
  const headerContainer = document.getElementById('article-header');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="article-detail-meta">
        <span class="category-badge" data-cat="${article.category}">${categoryInfo.name}</span>
        <span class="article-detail-date">${formatDate(article.date)}</span>
      </div>
      <h1 class="article-detail-title">${article.title}</h1>
      <p class="article-detail-excerpt" style="color: var(--text-secondary); font-size: 1.125rem; line-height: 1.7;">${article.excerpt}</p>
    `;
  }

  // 渲染封面图
  const coverContainer = document.getElementById('article-cover');
  if (coverContainer && article.cover) {
    coverContainer.innerHTML = `
      <img src="${article.cover}" alt="${article.title}" loading="eager" />
    `;
  }
}

// 加载 Markdown 内容
async function loadMarkdownContent(filepath) {
  const contentContainer = document.getElementById('article-content');
  if (!contentContainer) return;

  try {
    // 显示加载状态
    contentContainer.innerHTML = `
      <div class="loading-text" style="text-align: center; color: var(--text-muted); padding: 2rem;">
        正在加载内容
      </div>
    `;

    // 加载 Markdown 文件
    const response = await fetch(filepath);
    if (!response.ok) throw new Error('文件未找到');

    const markdown = await response.text();

    // 渲染 Markdown（使用 marked.js CDN）
    if (typeof marked !== 'undefined') {
      const html = marked.parse(markdown);
      contentContainer.innerHTML = html;
      
      // 初始化图片 Lightbox
      initLightbox(contentContainer);
    } else {
      // 如果 marked.js 未加载，显示原始 Markdown
      contentContainer.innerHTML = `<pre style="white-space: pre-wrap;">${markdown}</pre>`;
    }
  } catch (error) {
    console.error('加载文章内容失败:', error);
    contentContainer.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>内容加载失败，请稍后重试</p>
      </div>
    `;
  }
}

// ==================== Lightbox ====================

function initLightbox(container) {
  const images = container.querySelectorAll('img');
  
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      openLightbox(img.src);
    });
  });
}

function openLightbox(src) {
  // 创建 Lightbox DOM
  let lightbox = document.getElementById('lightbox-overlay');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-overlay';
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <img src="${src}" alt="放大图片" />
      <button class="lightbox-close" aria-label="关闭">×</button>
    `;
    document.body.appendChild(lightbox);

    // 点击关闭
    lightbox.addEventListener('click', () => {
      closeLightbox();
    });

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  } else {
    lightbox.querySelector('img').src = src;
  }

  // 显示
  requestAnimationFrame(() => {
    lightbox.classList.add('active');
  });
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox-overlay');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==================== 返回顶部 ====================

function initScrollTop() {
  // 创建按钮
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', '返回顶部');
  scrollTopBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `;
  document.body.appendChild(scrollTopBtn);

  // 滚动显示/隐藏
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, 100));

  // 点击返回顶部
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== 错误处理 ====================

function showError(message) {
  const main = document.querySelector('main') || document.body;
  main.innerHTML = `
    <div class="empty-state" style="min-height: 60vh; display: flex; flex-direction: column; justify-content: center; padding-top: calc(var(--navbar-height) + 2rem);">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p>${message}</p>
      <a href="index.html" style="margin-top: 1rem; color: var(--primary);">返回首页</a>
    </div>
  `;
}

// ==================== 页面过渡动画 ====================

function initPageTransitions() {
  // 页面加载完成后添加入场动画
  document.body.classList.add('page-enter');
  
  // 页面卸载时的淡出效果（可选）
  window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
  });
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', () => {
  // 初始化导航栏
  initNavbar();

  // 初始化返回顶部
  initScrollTop();

  // 根据当前页面初始化
  const page = document.body.getAttribute('data-page');
  
  switch (page) {
    case 'home':
      initHomePage();
      break;
    case 'category':
      initCategoryPage();
      break;
    case 'article':
      initArticlePage();
      break;
  }

  // 初始化页面过渡
  initPageTransitions();
});
