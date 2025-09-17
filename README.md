# 构建一个流式 AI 响应界面（Vite + React + TypeScript）

## 功能概述

- 单页聊天界面：顶部标题、消息区、底部输入与发送按钮。
- 流式响应：模拟事件流，逐条渲染文本、代码块与图表。
- 动态组件：text、code_block（highlight.js）、chart（ECharts）。


## 运行步骤

Vite 版本要求 Node.js ≥ 20.19 或 ≥ 22.12。

1) 升级 Node（推荐 nvm）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
nvm use --lts
node -v
```

2) 安装与启动

```bash
npm install
npm run dev
```

3) 运行单元测试

```bash
npm run test
```


访问终端输出的本地地址预览。

## 使用提示

- 输入「斐波那契 / fibonacci」→ 生成代码块示例
- 输入「图表 / chart」→ 生成图表示例

## 技术栈
- 构建工具: Vite
    Vite本身非常轻量，配置简单，易于上手，Vite利用ES模块在开发阶段提供极快的启动和热重载，提升开发体验
- 前端框架: React + TypeScript
    React的组件化模式使得代码可复用性高，易于维护和测试，React拥有庞大的社区和丰富的第三方库，能够满足各种需求
    TypeScript提供了静态类型检查，可以在开发阶段捕获错误，提高代码质量，类型提示和自动补全功能使得开发更加高效，React和TypeScript的结合已经成为业界标准
- 样式方案: Tailwind
    Tailwind提供了大量的实用类，可以快速构建自定义设计，而无需编写大量的自定义CSS
- 代码高亮: highlight.js
    highlight.js支持多种编程语言的语法高亮，易于集成，能够自动检测代码块的语言并进行高亮，也可以手动指定，提供多种高亮主题，可以匹配项目风格
- 图表可视化: ECharts
    ECharts提供了丰富的图表类型和交互功能，能够满足复杂的图表需求，官方文档详细，示例丰富，易于学习和使用，拥有活跃的社区和持续的更新

## 状态管理

- `useState` 管理消息列表、输入框与思考状态；`useRef` 实现自动滚动。
  - messages: Message[] - 存储所有聊天消息
  - inputText: string - 当前输入框文本
  - isThinking: boolean - 标记是否正在生成响应，以防止在生成过程中重复发送
- `simulateEventStream` 返回事件数组，逐条延迟追加，实现流式效果。：


## 关键文件
- `src/App.tsx`：主入口组件
- `index.html`：引入 Tailwind、ECharts、highlight.js 的 CDN

## 花费时间
- 总时间：2h30min
- 根据项目目标生成原型图和项目设计（交互图、项目选型、项目架构、状态管理） 1h
- 根据原型图和项目设计生成代码(新建项目、安装依赖、代码生成) 15min
- 修改代码组织（组件拆分、接口数据处理、类型代码）15min
- 修改交互细节 15min
- 修复代码ts报错 15min
- 生成单测 15min
- 文档书写 15min


