/* ============================================================
 *  渲染与交互
 *  内容都在 data.js 里，这个文件一般不用改
 * ============================================================ */

(function () {
  "use strict";

  var data = window.siteData;
  if (!data) {
    console.error("[site] 没有找到 data.js 里的 siteData");
    return;
  }

  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  var esc = function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };

  var storage = (function () {
    try {
      var k = "__lm_test__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return window.localStorage;
    } catch (e) {
      var memory = {};
      return {
        getItem: function (key) {
          return key in memory ? memory[key] : null;
        },
        setItem: function (key, val) {
          memory[key] = String(val);
        },
        removeItem: function (key) {
          delete memory[key];
        },
      };
    }
  })();

  var root = document.documentElement;
  var header = $("#siteHeader");
  var navLinks = $("#navLinks");
  var menuToggle = $("#menuToggle");
  var themeToggle = $("#themeToggle");
  var backTop = $("#backTop");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var THEME_KEY = "lm-theme";
  var ui = data.ui || {};

  /* ---------- meta ---------- */

  function applyMeta() {
    var meta = data.meta || {};
    document.title = meta.title || "个人主页";
    if (meta.lang) root.lang = meta.lang;

    var desc = meta.description || "";
    var descEl = $('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", desc);

    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);

    var ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", desc);
  }

  /* ---------- 顶栏 ---------- */

  function renderNav() {
    var brand = $("#brand");
    if (brand) brand.textContent = (data.profile && data.profile.name) || "";

    if (navLinks) {
      navLinks.innerHTML = (data.nav || [])
        .map(function (item) {
          return '<li><a href="' + esc(item.href) + '">' + esc(item.label) + "</a></li>";
        })
        .join("");
    }
  }

  /* ---------- 首屏 ---------- */

  function renderHero() {
    var p = data.profile || {};

    var eyebrow = $("#heroEyebrow");
    if (eyebrow) eyebrow.textContent = p.eyebrow || "";

    var nameEl = $("#heroName");
    if (nameEl) nameEl.textContent = p.name || "";

    var latinEl = $("#heroLatin");
    if (latinEl) latinEl.textContent = p.latin || "";

    var taglineEl = $("#heroTagline");
    if (taglineEl) {
      taglineEl.textContent = p.tagline || "";
      taglineEl.hidden = !p.tagline;
    }

    var actionsEl = $("#heroActions");
    if (actionsEl) {
      actionsEl.innerHTML = (p.actions || [])
        .map(function (btn) {
          var cls = btn.style === "ghost" ? "btn btn-ghost" : "btn btn-primary";
          return '<a class="' + cls + '" href="' + esc(btn.href) + '">' + esc(btn.label) + "</a>";
        })
        .join("");
    }

    renderBadge();
  }

  function renderBadge() {
    var p = data.profile || {};
    var b = p.badge || {};

    var set = function (sel, text) {
      var el = $(sel);
      if (el) el.textContent = text || "";
    };

    set("#badgeLabel", b.label);
    set("#badgeCode", b.code);
    set("#badgeRole", b.role);
    set("#badgeName", p.name);
    set("#badgeLatin", p.latin);
    set("#badgeSchool", p.school);
    set("#badgeGrade", p.grade);
    set("#badgePortrait", b.initial || (p.name || "").slice(0, 1));
  }

  /* ---------- 区块标题 ---------- */

  function fillHead(id, block) {
    var section = document.getElementById(id);
    if (!section) return;

    if (!block) {
      section.hidden = true;
      return;
    }
    section.hidden = false;

    var eyebrow = $("[data-eyebrow]", section);
    if (eyebrow) {
      eyebrow.textContent = block.eyebrow || "";
      eyebrow.hidden = !block.eyebrow;
    }

    var title = $("[data-title]", section);
    if (title) {
      title.textContent = block.title || "";
      title.hidden = !block.title;
    }

    var sub = $("[data-subtitle]", section);
    if (sub) {
      sub.textContent = block.subtitle || "";
      sub.hidden = !block.subtitle;
    }
  }

  function paragraphs(list) {
    return (list || [])
      .map(function (p) {
        return "<p>" + esc(p) + "</p>";
      })
      .join("");
  }

  /* ---------- 关于 ---------- */

  function renderAbout() {
    var about = data.about || {};
    fillHead("about", data.about);

    var textEl = $("#aboutText");
    if (textEl) textEl.innerHTML = paragraphs(about.paragraphs);

    var factsEl = $("#aboutFacts");
    if (factsEl) {
      factsEl.innerHTML = (about.facts || [])
        .map(function (f) {
          return (
            '<div class="fact"><dt>' +
            esc(f.k) +
            "</dt><dd>" +
            esc(f.v) +
            "</dd></div>"
          );
        })
        .join("");
    }
  }

  /* ---------- 模拟联合国 ---------- */

  function renderMun() {
    var mun = data.mun || {};
    fillHead("mun", data.mun);

    var textEl = $("#munText");
    if (textEl) textEl.innerHTML = paragraphs(mun.paragraphs);

    var tagsEl = $("#munTags");
    if (tagsEl) {
      tagsEl.innerHTML = (mun.tags || [])
        .map(function (t) {
          return "<li>" + esc(t) + "</li>";
        })
        .join("");
    }
  }

  /* ---------- 辩论 ---------- */

  function renderDebate() {
    var debate = data.debate || {};
    fillHead("debate", data.debate);

    var img = $("#debateImg");
    if (img) {
      img.src = debate.image || "";
      img.alt = debate.alt || "";
    }

    var cap = $("#debateCaption");
    if (cap) {
      cap.textContent = debate.caption || "";
      cap.hidden = !debate.caption;
    }
  }

  /* ---------- 技能 ---------- */

  function renderSkills() {
    var skills = data.skills || {};
    fillHead("skills", data.skills);

    var wrap = $("#skillGroups");
    if (!wrap) return;

    wrap.innerHTML = (skills.groups || [])
      .map(function (g) {
        var items = (g.items || [])
          .map(function (t) {
            return "<li>" + esc(t) + "</li>";
          })
          .join("");
        return (
          '<div class="skill-group">' +
          '<p class="skill-label">' +
          esc(g.label) +
          "</p>" +
          '<ul class="skill-items">' +
          items +
          "</ul></div>"
        );
      })
      .join("");
  }

  /* ---------- 联系 ---------- */

  function renderContact() {
    var contact = data.contact || {};
    fillHead("contact", data.contact);

    var textEl = $("#contactText");
    if (textEl) textEl.textContent = contact.text || "";

    var phoneEl = $("#contactPhone");
    if (phoneEl) {
      if (contact.phone) {
        phoneEl.textContent = contact.phone;
        phoneEl.href = "tel:" + contact.phone.replace(/\s+/g, "");
        phoneEl.hidden = false;
      } else {
        phoneEl.hidden = true;
      }
    }
  }

  /* ---------- 页脚 ---------- */

  function renderFooter() {
    var nameEl = $("#footerName");
    if (nameEl) {
      nameEl.textContent =
        "© " + new Date().getFullYear() + " " + ((data.profile && data.profile.name) || "");
    }

    var noteEl = $("#footerText");
    if (noteEl) noteEl.textContent = (data.footer && data.footer.text) || "";
  }

  /* ---------- 无障碍标签 ---------- */

  function applyLabels() {
    var skip = $(".skip-link");
    if (skip && ui.skip) skip.textContent = ui.skip;

    if (navLinks && ui.navLabel) navLinks.setAttribute("aria-label", ui.navLabel);
    if (themeToggle && ui.themeToggle) themeToggle.setAttribute("aria-label", ui.themeToggle);
    if (backTop && ui.backTop) backTop.setAttribute("aria-label", ui.backTop);

    if (menuToggle) {
      var open = navLinks && navLinks.classList.contains("open");
      menuToggle.setAttribute(
        "aria-label",
        open ? ui.closeMenu || "关闭菜单" : ui.openMenu || "打开菜单"
      );
    }
  }

  /* ---------- 滚动渐显 ---------- */

  var revealObserver = null;

  function observeReveal() {
    var targets = $$("[data-reveal]").filter(function (el) {
      return !el.classList.contains("in");
    });

    if (!targets.length) return;

    if (revealObserver) revealObserver.disconnect();

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("in");
      });
      return;
    }

    revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- 主题 ---------- */

  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  var themeMeta = $('meta[name="theme-color"]');

  function setTheme(theme, persist) {
    root.dataset.theme = theme;
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#0b1424" : "#f7f4ec");
    }
    if (persist) storage.setItem(THEME_KEY, theme);
  }

  function initialTheme() {
    var saved = storage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
    var pref = data.theme && data.theme.default;
    if (pref === "light" || pref === "dark") return pref;
    return prefersDark.matches ? "dark" : "light";
  }

  /* ---------- 导航 ---------- */

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (backTop) backTop.classList.toggle("show", y > 400);
  }

  function closeMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", ui.openMenu || "打开菜单");
  }

  function initNav() {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || !navLinks) return;
            var id = "#" + entry.target.id;
            $$("a", navLinks).forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );

      $$("main section[id]").forEach(function (s) {
        spy.observe(s);
      });
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        var open = navLinks.classList.toggle("open");
        menuToggle.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute(
          "aria-label",
          open ? ui.closeMenu || "关闭菜单" : ui.openMenu || "打开菜单"
        );
      });
    }

    if (navLinks) {
      navLinks.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeMenu();
      });
    }

    document.addEventListener("click", function (e) {
      if (!navLinks || !navLinks.classList.contains("open")) return;
      if (header && !header.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* ---------- 启动 ---------- */

  applyMeta();
  renderNav();
  renderHero();
  renderAbout();
  renderMun();
  renderDebate();
  renderSkills();
  renderContact();
  renderFooter();
  applyLabels();
  observeReveal();

  setTheme(initialTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  function onSchemeChange(e) {
    if (!storage.getItem(THEME_KEY)) setTheme(e.matches ? "dark" : "light", false);
  }
  if (typeof prefersDark.addEventListener === "function") {
    prefersDark.addEventListener("change", onSchemeChange);
  } else if (typeof prefersDark.addListener === "function") {
    prefersDark.addListener(onSchemeChange);
  }

  initNav();

  window.addEventListener("load", function () {
    $$("[data-reveal]").forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add("in");
    });
  });
})();
