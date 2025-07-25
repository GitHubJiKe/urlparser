# URLParser Chrome/Edge 插件

一个简洁清新的 URL 解析工具，支持 Chrome 和 Edge 浏览器。

## 功能特性

- 🎯 **一键解析**: 点击插件图标即可打开解析页面
- 🔍 **完整解析**: 解析 URL 的所有组成部分（协议、主机、路径、查询参数等）
- 🔓 **自动解码**: 自动对 query 参数进行 URL 解码
- 📱 **响应式设计**: 支持桌面和移动设备
- 🎨 **清新 UI**: 现代化的渐变背景和毛玻璃效果

## 使用方法

1. 点击浏览器工具栏中的 URLParser 插件图标
2. 在新打开的标签页中，将 URL 粘贴到左侧输入框
3. 点击中间的"解析 →"按钮
4. 右侧将显示解析后的 JSON 结果

## 解析结果包含

- `protocol`: 协议（如 https:）
- `host`: 主机名和端口
- `hostname`: 主机名
- `port`: 端口号（如果有）
- `pathname`: 路径
- `search`: 查询字符串
- `hash`: 锚点
- `origin`: 源
- `query`: 解析后的查询参数对象（已解码）

## 安装方法

### Chrome 浏览器

1. 打开 Chrome 扩展管理页面 (`chrome://extensions/`)
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择本插件文件夹

### Edge 浏览器

1. 打开 Edge 扩展管理页面 (`edge://extensions/`)
2. 开启"开发人员模式"
3. 点击"加载解压缩的扩展"
4. 选择本插件文件夹

## 快捷键

- `Ctrl + Enter`: 在输入框中按此组合键可快速触发解析

## 技术栈

- HTML5 + CSS3 + JavaScript
- Chrome Extension Manifest V3
- 原生 URL API
