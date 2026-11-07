/* ============================================================
 *  网站内容配置
 *  改这个文件就能改整站内容，不用碰 HTML / CSS
 *  说明见 README.md
 * ============================================================ */

const siteData = {
  /* ---------- 1. 站点信息 ---------- */
  meta: {
    title: "刘牧洋 · 个人档案",
    description:
      "刘牧洋，重庆枫叶国际学校高一学生。参加过很多场模拟联合国，也打辩论。喜欢把话说清楚，也喜欢把想法做成能点开的东西。",
    lang: "zh-CN",
  },

  /* ---------- 2. 主题 ---------- */
  theme: {
    default: "light", // "auto" / "light" / "dark"
  },

  /* ---------- 3. 首屏 ---------- */
  profile: {
    name: "刘牧洋",
    latin: "Liu Muyang",
    eyebrow: "高一 · 重庆",
    school: "重庆枫叶国际学校",
    grade: "高一",
    tagline:
      "模拟联合国代表，也打辩论。喜欢把话说清楚，也喜欢把想法做成能点开的东西。",
    actions: [
      { label: "看看我在做什么", href: "#mun", style: "primary" },
      { label: "联系我", href: "#contact", style: "ghost" },
    ],
    badge: {
      label: "DELEGATE",
      code: "LMY · 2026",
      role: "MUN · DEBATE",
      initial: "刘",
    },
  },

  /* ---------- 4. 导航 ---------- */
  nav: [
    { label: "关于", href: "#about" },
    { label: "模联", href: "#mun" },
    { label: "辩论", href: "#debate" },
    { label: "技能", href: "#skills" },
    { label: "联系", href: "#contact" },
  ],

  /* ---------- 5. 关于 ---------- */
  about: {
    eyebrow: "ABOUT",
    title: "关于我",
    paragraphs: [
      "我是刘牧洋，重庆枫叶国际学校高一学生，16 岁，生日 11 月 21 日。",
      "课外时间大部分给了模拟联合国和辩论。这两件事训练的是同一种能力：在有限的时间里，把一件事说得让人信服。",
      "剩下的一点时间，我在学前端。喜欢把复杂的交互拆成清楚的组件，也喜欢一个按钮按下去的反馈刚好对。",
      "这个页面也是自己写的，排版和配色改了很多遍。",
    ],
    facts: [
      { k: "学校", v: "重庆枫叶国际学校" },
      { k: "年级", v: "高一" },
      { k: "城市", v: "重庆" },
      { k: "生日", v: "11 月 21 日" },
    ],
  },

  /* ---------- 6. 模拟联合国 ---------- */
  mun: {
    eyebrow: "MUN",
    title: "模拟联合国",
    subtitle: "参加过很多场。最花时间的不是台上那几分钟。",
    paragraphs: [
      "一场会下来，会前的背景文件和立场文件通常比会场更耗人。要把一个国家的立场读明白，再写成能站住脚的论证，最后压缩成几分钟的发言。",
      "会场上是另一回事。要在一群代表里找到能合作的，把分歧写成修正案，让决议草案走到投票那一步。语言要客气，立场要清楚。",
    ],
    tags: ["议题研究", "立场文件", "决议草案", "议事规则", "磋商与结盟"],
  },

  /* ---------- 7. 辩论 ---------- */
  debate: {
    eyebrow: "DEBATE",
    title: "辩论与表达",
    subtitle: "校辩论赛。站在台上和站在台下，是两种完全不同的准备。",
    image: "images/debate.jpg",
    alt: "刘牧洋参加校辩论赛的舞台合影",
    caption: "校辩论赛合影，右一是我。",
  },

  /* ---------- 8. 技能 ---------- */
  skills: {
    eyebrow: "TOOLS",
    title: "在做的东西",
    subtitle: "前端是自学的，模联和辩论是在场上练出来的。",
    groups: [
      { label: "前端", items: ["HTML / CSS", "JavaScript", "TypeScript", "React", "Vue", "Node.js"] },
      { label: "设计", items: ["Figma"] },
      { label: "场上", items: ["模拟联合国", "辩论与表达"] },
    ],
  },

  /* ---------- 9. 联系 ---------- */
  contact: {
    eyebrow: "CONTACT",
    title: "联系我",
    text: "想聊模联、辩论，或者一起做点东西，直接打这个号码。",
    phone: "13648363372",
  },

  /* ---------- 10. 页脚 ---------- */
  footer: {
    text: "用 HTML 和 CSS 手写，没有框架。",
  },

  /* ---------- 11. 界面文字 ---------- */
  ui: {
    navLabel: "主导航",
    skip: "跳到主要内容",
    themeToggle: "切换亮色 / 暗色",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    backTop: "回到顶部",
    call: "打电话",
  },
};

// 挂到 window 上，供 script.js 使用
window.siteData = siteData;
