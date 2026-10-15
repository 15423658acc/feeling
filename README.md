<div align="center">

# 🌿 心声记录

**随时随地，记录当下的心情、天气与想法。**

一个零服务器、零成本、可离线使用的个人心情记录本 PWA。

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![IndexedDB](https://img.shields.io/badge/IndexedDB-Dexie-003E54)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ 项目简介

「心声记录」是一款**纯前端 PWA 应用**，让你可以随心所欲、随时随地记录下此刻的心情、天气和一段文字。数据全部存储在你的设备本地（IndexedDB），不上传任何服务器，保护隐私，零成本长期使用。

没有社交、没有推送、没有广告 —— 只属于你自己的一方记录空间。未来某天翻出来，也许还能回忆起那个当下。

## 🌟 核心特性

| 特性 | 说明 |
|------|------|
| 📝 随心记录 | 心情 / 天气 / 一段文字，组合记录每一刻 |
| 🏷️ 标签分组 | 预置「工作/生活/家人/朋友」，支持自定义标签与颜色 |
| 📅 时间线回顾 | 按插入时间倒序排列，不改顺序，就是你的真实记录流 |
| 💾 本地存储 | IndexedDB 存储，数据只在你设备上，隐私安全 |
| 📲 PWA 可安装 | 加到手机主屏幕，像 App 一样全屏使用 |
| 📴 离线可用 | Service Worker 缓存，无网络也能记录和查看 |
| 🛡️ 数据备份 | 一键导出 / 导入 JSON，换设备不丢失 |
| 🎨 深色界面 | 护眼配色，专注记录 |

## 🛠️ 技术栈

- **React 18** + **TypeScript** — 前端框架与类型安全
- **Vite 5** — 极速构建工具
- **Dexie.js** — IndexedDB 封装，优雅操作浏览器数据库
- **vite-plugin-pwa** — PWA 能力（离线缓存、安装到桌面、自动更新）
- **纯 CSS** — 无 UI 框架依赖，轻量可定制

> 为什么不用后端？为了「零成本长期使用」。纯前端部署到 GitHub Pages 即可永久免费运行，无需维护服务器。

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/15423658acc/feeling.git
cd feeling

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173` 即可体验。

### 构建生产版本

```bash
npm run build      # 产物在 dist/ 目录
npm run preview    # 本地预览构建产物（含 PWA 离线能力）
```

## 📱 部署与使用

### 一键部署到 GitHub Pages（免费）

仓库已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），推送代码后自动构建并部署到 Pages：

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**
3. 等待 Actions 运行完成，访问 `https://15423658acc.github.io/feeling/`

### 在手机上安装为 App

1. 手机浏览器（推荐 Chrome / Safari）打开上面的网址
2. **Chrome**：右上角菜单 →「添加到主屏幕」
3. **Safari**：底部分享按钮 →「添加到主屏幕」
4. 桌面会出现「心声」图标，点击即可全屏使用，支持离线记录

## 💾 数据备份

由于数据仅存于本机，建议定期备份：

- **导出**：点击页面右上角「导出备份」，下载 JSON 文件保存到网盘/手机
- **导入**：点击「导入备份」，选择之前导出的 JSON 文件恢复

> ⚠️ 清理浏览器数据或卸载 PWA 会丢失记录，请务必定期导出备份。

## 📁 项目结构

```
feeling/
├── index.html
├── vite.config.ts              # Vite + PWA 配置
├── package.json
├── public/
│   ├── favicon.svg
│   ├── pwa-192.png             # PWA 图标
│   └── pwa-512.png
└── src/
    ├── main.tsx                # 应用入口
    ├── App.tsx                 # 三标签页框架
    ├── types/index.ts          # Entry / Tag 类型定义
    ├── db/database.ts          # Dexie 数据库 + 预置标签
    ├── components/
    │   ├── RecordForm.tsx      # 记录表单（心情/天气/文字/标签）
    │   ├── RecordList.tsx      # 时间线列表
    │   ├── TagManager.tsx      # 标签管理（自定义颜色）
    │   └── BackupBar.tsx       # 导出/导入备份
    └── styles/main.css         # 全局样式
```

## 🗺️ 未来计划

- [ ] 图片附件记录
- [ ] 按标签 / 心情筛选回顾
- [ ] 关键词搜索
- [ ] 心情统计图表
- [ ] 多端同步（可选后端方案）

## 📄 License

MIT License — 自由使用、修改、分发。

---

<div align="center">

如果这个项目对你有帮助，欢迎点个 ⭐ Star 支持一下～

</div>
