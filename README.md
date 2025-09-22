# ChronoGauge - 时光计

一个基于 Serverless 架构的高精度网络时间同步校准网页。

[![Deploy to Cloudflare Pages](https://static.cloudflarebadges.com/deploy-with-cloudflare-pages-dark.svg)](https://deploy.workers.cloudflare.com/?url=https://github.com/33niang/chronogauge)
## ✨ 项目简介

ChronoGauge (时光计) 是一个部署在边缘网络的 Web 应用，用于精确计算并展示用户设备时间与标准原子时间的差值。它解决了网络延迟带来的误差问题，提供了一个美观、实时的时钟校准界面。

整个项目前后端一体化，可以一键部署到 [Cloudflare Pages](https://pages.cloudflare.com/) 等支持 Serverless Functions 的平台。

## 🚀 主要特性

- **高精度校准**：通过模拟 NTP 核心算法，补偿网络往返延迟 (RTT)，估算出精确的时间差。
- **智能采样**：自动进行多次测量，并选取网络延迟最低的样本，以获得最可靠的结果。
- **实时显示**：动态展示估算的标准时间、您的本地时间以及二者之间的毫秒级差距。
- **前后端一体化**：无需管理独立的后端服务，API 函数与前端页面在同一项目中，简化开发与部署。
- **轻松部署**：一行代码都不用改，直接将仓库连接到 Cloudflare Pages 即可完成部署。
- **美观界面**：简洁、现代化的 UI 设计，提供优秀的用户体验。

## 📁 项目结构

```
/
├── functions/api/
│   └── time.js       # 后端 API 函数，返回服务器时间戳
├── index.html        # 所有前端逻辑、样式和结构
└── README.md         # 本说明文件
```

- **`index.html`**: 项目的入口文件，包含了所有的 HTML, CSS, 和 JavaScript。
- **`functions/api/time.js`**: 一个 Serverless Function，作为我们的时间 API。Cloudflare Pages 会自动将对 `/api/time` 的请求路由到这个函数。

## 🛠️ 部署指南

部署此项目到 Cloudflare Pages 非常简单：

1.  **Fork/创建仓库**：将本项目 Fork 到您自己的 GitHub 账号，或者创建一个新仓库并将项目文件推送上去。
2.  **连接到 Cloudflare Pages**：
    - 登录 Cloudflare 仪表板。
    - 前往 **Workers & Pages** -> **创建应用程序** -> **Pages** -> **连接到 Git**。
    - 选择您刚刚创建的 GitHub 仓库。
3.  **配置构建**：
    - **项目名称**：自定义您的项目名称。
    - **生产分支**：选择 `main` 或您的主分支。
    - **构建设置**：**保留所有设置为默认值**。你不需要任何构建命令或输出目录的特殊配置。
4.  **部署**：
    - 点击 **保存并部署**。
    - 等待几分钟，Cloudflare 就会完成部署，并为您提供一个公开访问的网址 (例如 `https://your-project.pages.dev`)。

大功告成！现在您可以访问该网址，看到正在运行的时间校准仪。

## 🔬 工作原理

本应用通过客户端 JavaScript 估算并补偿网络延迟，其核心步骤如下：

1.  **客户端记录请求时间 (`t0`)**。
2.  **向后端 API (`/api/time`) 发起请求**。
3.  **API 函数返回其当前时间戳 (`t_server`)**。
4.  **客户端记录响应到达时间 (`t1`)**。
5.  **计算时间差 (Offset)**:
    - 往返延迟 `RTT = t1 - t0`
    - 最终差值 `Offset = t1 - (t_server + RTT / 2)`

这个差值即为您的本地时间与标准时间的偏差。
