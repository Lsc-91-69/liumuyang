# 刘牧洋 · 个人档案

一个纯静态的个人主页：不用构建、不用后端、不用框架，双击 `index.html` 就能打开。
**内容都集中在 `data.js` 里**，改文字不用碰 HTML / CSS。

线上地址：<https://lsc-91-69.github.io/liumuyang/>

---

## 文件结构

```
index.html   页面骨架
style.css    样式与配色令牌
data.js      ★ 内容都写在这里 ★
script.js    渲染与交互
images/      照片
_preview/    本地截图（不参与发布）
```

## 一、改内容

打开 `data.js`，改引号里的文字即可，保存后刷新浏览器。

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、英文名 | `profile.name` / `profile.latin` |
| 年级、城市（首屏小字） | `profile.eyebrow` |
| 首屏那句话 | `profile.tagline` |
| 首屏按钮 | `profile.actions` |
| 代表证上的文字 | `profile.badge` |
| 导航菜单 | `nav` 数组 |
| 关于我的段落 | `about.paragraphs` |
| 右侧信息表 | `about.facts` |
| 模拟联合国 | `mun.paragraphs` / `mun.tags` |
| 辩论照片与说明 | `debate.image` / `debate.caption` |
| 技能分组 | `skills.groups` |
| 联系方式 | `contact.phone` / `contact.text` |
| 浏览器标签页标题 | `meta.title` |

### 换照片

把照片放进 `images/`，然后改：

```js
debate: {
  image: "images/your-photo.jpg",
  alt: "照片说明（读屏软件会读）",
  caption: "显示在照片下方的说明",
},
```

> 网页用的照片建议压到 300KB 以内（长边 1600px 左右就够了），
> 太大在手机上打开会很慢。

### 加一段模拟联合国经历

现在 `mun` 只有两段概括文字。要加具体场次，可以在 `data.js` 里给 `mun` 加一个
`list` 数组，再在 `script.js` 的 `renderMun()` 里渲染出来。或者直接告诉我，我来加。

> 注意：文字里如果要用英文双引号 `"`，请写成 `\"` 或改用中文引号 `“”`，
> 否则会破坏 JS 语法。改完看不到内容时按 F12 看 Console。

## 二、本地预览

直接双击 `index.html`。想要更接近线上环境：

```powershell
python -m http.server 8000
```

然后打开 <http://localhost:8000>。

## 三、线上部署

已经部署在 GitHub Pages，仓库：`Lsc-91-69/liumuyang`。

改完内容后推送：

```powershell
git add .
git commit -m "更新内容"
git push
```

推送后一两分钟，<https://lsc-91-69.github.io/liumuyang/> 会自动更新。

## 四、一些说明

- 配色令牌在 `style.css` 顶部的 `:root`，暗色主题在 `[data-theme="dark"]`。
- 右上角可以切亮色 / 暗色，选择会记在浏览器里。
- 没有外部字体和 CDN，国内打开也快。
- 页面已适配手机，并遵循系统的「减少动态效果」设置。
