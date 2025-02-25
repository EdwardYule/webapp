# Modern PWA Application

这是一个使用现代技术栈构建的 Progressive Web Application (PWA) 项目。

## 技术栈

- **前端框架**: Next.js 13+ (App Router)
- **类型系统**: TypeScript
- **样式方案**: Tailwind CSS + CSS Modules
- **PWA 支持**: next-pwa + Workbox
- **状态管理**: Zustand
- **数据库**: Prisma + PostgreSQL
- **开发工具**: ESLint + Prettier
- **测试框架**: Jest + React Testing Library

## 特性

- ✨ 完整的 PWA 支持
- 📱 响应式设计
- 🔄 离线功能
- 📲 可安装到设备
- 🔔 推送通知
- 🎯 性能优化
- 🌐 SEO 优化
- 🔒 安全性考虑

## 开发指南

### 环境要求

- Node.js 18+
- npm 或 yarn 或 pnpm
- Git

### 安装

```bash
# 克隆项目
git clone [your-repository-url]

# 安装依赖
npm install

# 开发环境运行
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start
```

### 项目结构

```
├── app/                # Next.js 13 App Router 目录
│   ├── api/           # API 路由
│   ├── components/    # React 组件
│   ├── hooks/         # 自定义 Hooks
│   ├── lib/           # 工具函数
│   └── styles/        # 全局样式
├── public/            # 静态资源
│   ├── icons/        # PWA 图标
│   └── manifest.json  # PWA manifest
├── prisma/           # 数据库模型
└── tests/            # 测试文件
```

## 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用函数式组件
- 使用 CSS Modules 和 Tailwind 组织样式
- 遵循 React Hooks 规范

## PWA 功能

- Service Worker 配置
- 离线缓存策略
- 推送通知实现
- 安装提示
- 后台同步

## 部署

项目支持多种部署方式：
- Vercel（推荐）
- Docker
- 传统服务器

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License