# Hot-Site - 精品内容聚合站

一个现代、抽象、美观的静态内容站点，用于展示分类文章和图片内容。

## ✨ 特性

- 🎨 **现代抽象设计**：几何装饰、渐变背景、玻璃态卡片、微妙阴影
- 📱 **完全响应式**：移动端、平板、桌面三端适配
- ⚡ **零依赖构建**：纯 HTML + CSS + JavaScript，无需任何构建工具
- 📝 **Markdown 驱动**：文章以 Markdown 格式存储，前端实时渲染
- 🔍 **SEO 友好**：语义化 HTML、正确的 meta 标签、Open Graph 支持
- 🖼️ **图片 Lightbox**：点击放大查看，键盘 ESC 关闭
- ♿ **无障碍支持**：ARIA 标签、键盘导航、语义化结构
- 🚀 **GitHub Pages 就绪**：推送即部署，零配置

## 🎨 配色方案

| 分类 | 颜色 | 用途 |
|------|------|------|
| 技术 (tech) | Indigo (#6366f1) | 前端开发、编程技术 |
| AI | Emerald (#10b981) | 人工智能、机器学习 |
| 游戏 (game) | Rose (#f43f5e) | 游戏开发、设计 |
| 音乐 (music) | Violet (#8b5cf6) | 音乐创作、欣赏 |
| 艺术 (art) | Cyan (#06b6d4) | 创意表达、美学探索 |

## 📁 项目结构

```
/
├── index.html              # 首页
├── category.html           # 分类列表页
├── article.html            # 文章详情页
├── css/
│   └── style.css           # 全局样式
├── js/
│   ├── main.js             # 主逻辑（导航、交互、渲染）
│   └── data.js             # 内容数据（文章元信息、分类配置）
├── content/
│   ├── articles/           # 文章 Markdown 文件
│   │   ├── article-1.md
│   │   ├── article-2.md
│   │   └── ...
│   └── images/             # 图片资源
├── assets/
│   └── fonts/              # 字体文件（或使用 CDN）
└── README.md               # 项目说明
```

## 🚀 快速开始

### 本地预览

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/hot-site.git
cd hot-site
```

2. 使用任意 HTTP 服务器打开（推荐）：

```bash
# 使用 Python
python -m http.server 8080

# 使用 Node.js (npx)
npx serve .

# 使用 PHP
php -S localhost:8080
```

3. 浏览器访问 `http://localhost:8080`

> ⚠️ 直接双击 `index.html` 打开时，文章详情页的 Markdown 加载可能因浏览器安全策略而无法工作。建议使用 HTTP 服务器。

### GitHub Pages 部署

1. 将项目推送到 GitHub 仓库：

```bash
git init
git add .
git commit -m "feat: 初始化 Hot-Site"
git remote add origin https://github.com/yourusername/hot-site.git
git push -u origin main
```

2. 在 GitHub 仓库设置中启用 Pages：

   - 进入 **Settings** → **Pages**
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main**，目录选 **/ (root)**
   - 点击 **Save**

3. 等待部署完成，访问 `https://yourusername.github.io/hot-site/`

## 📝 添加新文章

1. 在 `content/articles/` 下创建新的 Markdown 文件，如 `article-9.md`

2. 在 `js/data.js` 的 `ARTICLES` 数组中添加文章元信息：

```javascript
{
  id: 'article-9',
  title: '你的文章标题',
  category: 'tech',  // tech | ai | game | music | art
  date: '2026-05-07',
  excerpt: '文章摘要，建议 50-100 字',
  cover: 'https://images.unsplash.com/photo-xxx?w=800&q=80',
  content: 'content/articles/article-9.md'
}
```

3. 提交并推送，GitHub Pages 会自动更新

## 🎯 自定义

### 修改配色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
  --primary: #6366f1;       /* 主色 */
  --secondary: #06b6d4;     /* 辅助色 */
}
```

### 修改字体

在 HTML 文件中替换 Google Fonts 链接，并更新 CSS 变量：

```css
body {
  font-family: '你的字体', sans-serif;
}
```

### 添加分类

1. 在 `js/data.js` 的 `CATEGORIES` 中添加新分类
2. 在 `css/style.css` 中添加对应的分类样式（`.category-xxx`）
3. 在导航栏中添加链接

## 🔧 技术细节

- **Markdown 渲染**：使用 [marked.js](https://marked.js.org/) CDN 版本
- **字体**：[Inter](https://rsms.me/inter/) + [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC)（中文支持）
- **图片**：使用 Unsplash 占位图，支持 `loading="lazy"` 懒加载
- **无障碍**：遵循 WCAG 2.1 AA 标准，支持键盘导航和屏幕阅读器

## 📄 许可

MIT License - 自由使用、修改和分发。