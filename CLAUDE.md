# CLAUDE.md

此文件为 Claude Code（claude.ai/code）在此仓库中工作的指导手册。

## 📝 常用命令

- **构建**: `python -m http.server 8080` 或 `npx serve .` 用于本地开发服务器
- **代码检查**: `npm run lint`（需 ESLint + Prettier 支持）
- **运行测试**: `npm run test`（当前未实现）
- **生成文档**: `npm run docs`（未实现）
- **部署到 GitHub Pages**: `git push origin main` 后在仓库设置中启用 Pages

## 🗺️ 项目架构

网站围绕以下核心文件构建：

- **`index.html`**: 主页包含英雄区域和文章网格
- **`category.html`**: 分类页包含网格和筛选栏
- **`article.html`**: 文章详情页包含 Lightbox 和可复用组件
- **`css/style.css`**: 完整的样式系统，包含玻璃效果、动画和响应式设计
- **`js/data.js`**: 文章和分类的静态数据模型
- **`js/main.js`**: 导航、高亮和 Lightbox 的核心逻辑

## 📁 开发设置

1. 启动本地服务器：

   ```bash
   python -m http.server 8080
   ```

   - 浏览器访问 `http://localhost:8080`
   - 更大的项目可以使用 `npx serve .` 或 `npm install -g serve`（如需）

2. 部署到 GitHub Pages：

   - 提交更改到 main 分支
   - 仓库设置 → **Pages** 标签 → 选择 **main** 分支，源码为 **/ (root)**

## 🎨 自定义指南

- 样式系统使用 CSS 自定义属性，详见 `css/style.css`
- 每篇文章的分类定义在 `js/data.js`，与 CSS 变量中的颜色关联
- 新增分类时，需同时更新 `js/data.js` 和 `css/style.css`
- 修改网站设计时，请更新 CSS 变量并在 `css/style.css` 中覆盖（所有变量导出至 `:root`）
- 添加新文章时，请在 `content/articles/` 下创建新 Markdown 文件，并更新 `js/data.js` 的 `ARTICLES` 数组

## 🌐 语言偏好

所有 Claude 代理应使用中文进行交互和输出，以保证中文用户的使用体验。

## 💡 其他说明

- 页面默认显示所有月份的内容，可通过添加 `.category-xxx` 类到 HTML 元素筛选内容（如 `h3` 用于筛选新闻稿）
- 前端采用静态 HTML + CSS + JavaScript 技术栈，无需构建工具
- 部署成功后，可通过访问 `https://rrramxy.github.io/hot-site/` 查看网站
- 模块本身使用通用 HTML + CSS + JS 实现可运行的现代网站