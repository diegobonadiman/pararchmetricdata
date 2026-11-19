/* ParARCHmetric Data — renderização do site.
   Lê o modelo em #site-template (index.html), preenche com os dados de js/data.js
   e redesenha a página ao trocar de idioma (PT/EN). Sem dependências externas. */
(function () {
  'use strict';

  var MAIL = 'mailto:dxbarq@gmail.com?subject=';
  var STACK = ['Autodesk Revit', 'Dynamo', 'Python', 'Grasshopper', 'Power BI', 'SQL', 'pyRevit', 'Solibri', 'BIMCollab', 'MCP Server', 'Autodesk Forma','ISO 19650 / BEP'];
  var BTN_ON = 'min-width:52px;min-height:44px;border:0;cursor:pointer;font:600 14px Inter,sans-serif;background:#3d8fdc;color:#04101e';
  var BTN_OFF = 'min-width:52px;min-height:44px;border:0;cursor:pointer;font:600 14px Inter,sans-serif;background:transparent;color:#c3cddc';

  var PAGE = document.body.getAttribute('data-page') || 'home';   // 'home' ou 'portfolio'
  var LANG_KEY = 'pam-lang';
  function loadLang() { try { return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'pt'; } catch (e) { return 'pt'; } }
  function saveLang(l) { try { localStorage.setItem(LANG_KEY, l); } catch (e) {} }
  var state = { lang: loadLang() };
  var app = document.getElementById('app');
  var tpl = document.getElementById('site-template');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function context() {
    var lang = state.lang;
    var t = Object.assign({}, TXT[lang]);
    t.c1href = MAIL + encodeURIComponent(t.subj1);
    t.c2href = MAIL + encodeURIComponent(t.subj2);
    var projects = buildProjects(lang);
    return {
      t: t,
      h: PAGE === 'home' ? '' : 'index.html',          // prefixo dos links para âncoras da home
      navPf: PAGE === 'portfolio' ? 'page' : 'false',
      projects: projects,
      teaser: TEASER.map(function (id) { return projects.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean),
      stack: STACK,
      isPt: lang === 'pt',
      isEn: lang === 'en',
      ptStyle: lang === 'pt' ? BTN_ON : BTN_OFF,
      enStyle: lang === 'en' ? BTN_ON : BTN_OFF,
      setPt: function () { setLang('pt'); },
      setEn: function () { setLang('en'); }
    };
  }

  /* ---- mini-renderizador: <sc-for>, <sc-if> e {{caminho.do.valor}} ---- */
  var TOKEN = /\{\{\s*([^{}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;

  function get(path, ctx) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, ctx);
  }
  function interpolate(str, ctx) {
    return str.replace(TOKEN, function (_, p) {
      var v = get(p, ctx);
      return v == null ? '' : String(v);
    });
  }
  function attrValue(node, name, ctx) {
    var m = WHOLE.exec(node.getAttribute(name) || '');
    return m ? get(m[1], ctx) : undefined;
  }
  function renderChildren(parent, ctx, out) {
    Array.prototype.forEach.call(parent.childNodes, function (n) { renderNode(n, ctx, out); });
  }
  function renderNode(n, ctx, out) {
    if (n.nodeType === 3) { out.push(document.createTextNode(interpolate(n.nodeValue, ctx))); return; }
    if (n.nodeType !== 1) return;
    var tag = n.localName;

    if (tag === 'sc-for') {
      var list = attrValue(n, 'list', ctx) || [];
      var as = n.getAttribute('as');
      list.forEach(function (item) {
        var child = Object.create(ctx);
        child[as] = item;
        renderChildren(n, child, out);
      });
      return;
    }
    if (tag === 'sc-if') {
      if (attrValue(n, 'value', ctx)) renderChildren(n, ctx, out);
      return;
    }

    var el = document.createElementNS(n.namespaceURI, tag);
    Array.prototype.forEach.call(n.attributes, function (a) {
      if (/^on/i.test(a.name)) {
        var fn = attrValue(n, a.name, ctx);
        if (typeof fn === 'function') el.addEventListener(a.name.slice(2).toLowerCase(), fn);
      } else {
        el.setAttribute(a.name, interpolate(a.value, ctx));
      }
    });
    var kids = [];
    renderChildren(n, ctx, kids);
    kids.forEach(function (k) { el.appendChild(k); });
    out.push(el);
  }

  /* ---- desenho da página ---- */
  function prepareVideos() {
    Array.prototype.forEach.call(app.querySelectorAll('video'), function (v) {
      v.muted = true; v.defaultMuted = true; v.playsInline = true;
      if (reduceMotion) { v.removeAttribute('autoplay'); try { v.pause(); } catch (e) {} return; }
      try { var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    });
  }
  function draw() {
    var out = [];
    renderChildren(tpl.content, context(), out);
    app.replaceChildren.apply(app, out);
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
    if (PAGE === 'portfolio') document.title = TXT[state.lang].pfDocTitle;
    prepareVideos();
  }
  function setLang(lang) {
    if (state.lang === lang) return;
    var y = window.scrollY;
    state.lang = lang;
    saveLang(lang);
    draw();
    window.scrollTo(0, y);
    var pressed = app.querySelector('button[aria-pressed="true"]');
    if (pressed) pressed.focus({ preventScroll: true });
  }

  draw();
  // abre direto na seção se o endereço tiver #portfolio, #contato etc.
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
