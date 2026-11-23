(() => {
  const $ = (s) => document.querySelector(s);
  const NS = "http://www.w3.org/2000/svg";
  const PX = 44;                       // pixels per year on the ruler
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let year = NOW;                      // fractional year under the needle
  let shownYear = null;
  let seenEvents = new Set();

  // ---------- helpers ----------
  const lerp = (pts, y) => {
    if (y <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) {
      const [x1, v1] = pts[i];
      if (y <= x1) { const [x0, v0] = pts[i - 1]; return v0 + (v1 - v0) * (y - x0) / (x1 - x0); }
    }
    return pts[pts.length - 1][1];
  };
  const STRIPES = ["#08306b","#08519c","#2171b5","#4292c6","#6baed6","#9ecae1","#c6dbef","#deebf7","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"];
  const stripe = (a) => STRIPES[Math.max(0, Math.min(15, Math.floor((a + 1.04) / 2.08 * 16)))];
  const svgEl = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  // ---------- fan walls: fixed positions, each with the year it is built ----------
  const fans = $("#fans");
  const FAN_ZONES = [
    { poly: [[372,322],[520,330],[540,420],[500,428],[470,418],[400,428],[360,400]], from: 2033, to: 2052, n: 70 },
    { poly: [[300,420],[380,430],[392,470],[380,540],[330,560],[282,520]], from: 2044, to: 2058, n: 40 },
  ];
  const inside = (p, poly) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const fanList = [];
  FAN_ZONES.forEach((z) => {
    const xs = z.poly.map((p) => p[0]), ys = z.poly.map((p) => p[1]);
    let placed = 0, tries = 0;
    while (placed < z.n && tries < 4000) {
      tries++;
      const p = [Math.min(...xs) + rand() * (Math.max(...xs) - Math.min(...xs)), Math.min(...ys) + rand() * (Math.max(...ys) - Math.min(...ys))];
      if (!inside(p, z.poly)) continue;
      if (Math.hypot(p[0] - 452, p[1] - 486) < 66) continue;           // keep off Suswa's cone
      if (fanList.some((f) => Math.abs(f.x - p[0]) < 13 && Math.abs(f.y - p[1]) < 7)) continue;
      const built = z.from + Math.pow(rand(), 0.8) * (z.to - z.from);
      const g = svgEl("g", { class: "fan off" }, fans);
      for (let k = 0; k < 3; k++) svgEl("rect", { x: p[0] + k * 3.6, y: p[1], width: 3, height: 4.5, rx: 0.6 }, g);
      fanList.push({ x: p[0], y: p[1], built, el: g });
      placed++;
    }
  });

  // ---------- pins ----------
  const pinLayer = $("#pins");
  DOCS.filter((d) => d.at).forEach((d) => {
    const lead = PEOPLE[d.writers[d.writers.length > 1 ? 1 : 0]];
    const g = svgEl("g", { class: "pin", transform: `translate(${d.at[0]} ${d.at[1] - 8})`, tabindex: 0, role: "button", "aria-label": `Story ${d.id}: ${d.title}` }, pinLayer);
    const bob = svgEl("g", { class: "bob" }, g);
    svgEl("path", { class: "stem", d: "M0,0 L-6,-14 A16,16 0 1 1 6,-14 Z" }, bob);
    const face = svgEl("circle", { class: "face", cx: 0, cy: -27, r: 13 }, bob);
    face.style.fill = lead.color;
    const num = svgEl("text", { class: "num", x: 0, y: -26.5 }, bob);
    num.textContent = String(d.id).padStart(2, "0");
    const cap = svgEl("text", { class: "cap", x: 0, y: 14 }, g);
    cap.textContent = d.cap || d.title;
    if (d.sub) { const sub = svgEl("text", { class: "cap sub", x: 0, y: 27 }, g); sub.textContent = d.sub; }
    d.pin = g;
    const open = () => openDoc(d.id);
    g.addEventListener("click", open);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });

  // ---------- ruler ----------
  const ruler = $("#ruler"), track = $("#track");
  const evYears = new Map(EVENTS.map((e) => [e.y, e]));
  for (let y = START; y <= END; y++) {
    const col = document.createElement("div");
    col.className = "yr-col" + (y % 5 === 0 ? " decade" : "");
    col.style.left = (y - START) * PX + "px";
    const s = document.createElement("div");
    s.className = "stripe" + (ANOMALY[y] === undefined ? " future" : "");
    if (ANOMALY[y] !== undefined) s.style.background = stripe(ANOMALY[y]);
    col.appendChild(s);
    const t = document.createElement("div"); t.className = "tick"; col.appendChild(t);
    if (y % 5 === 0 || y === END) { const l = document.createElement("div"); l.className = "lbl"; l.textContent = y; col.appendChild(l); }
    const ev = evYears.get(y);
    if (ev) { const d = document.createElement("div"); d.className = "ev" + (ev.real ? "" : " imagined") + (ev.doc ? " doc" : ""); col.appendChild(d); }
    track.appendChild(col);
  }
  const nowLine = document.createElement("div");
  nowLine.className = "now-line";
  nowLine.style.left = (NOW - START) * PX + "px";
  nowLine.innerHTML = "<span>TODAY</span>";
  track.appendChild(nowLine);
  track.style.width = (END - START + 1) * PX + "px";

  // the needle sits in the middle of each year's column
  const offsetFor = (y) => ruler.clientWidth / 2 - (y - START) * PX - PX / 2;
  const yearFor = (off) => START + (ruler.clientWidth / 2 - PX / 2 - off) / PX;
  const clamp = (y) => Math.max(START, Math.min(END, y));

  function setYear(y, fromDrag) {
    year = clamp(y);
    track.style.transform = `translateX(${offsetFor(year)}px)`;
    render(year, fromDrag);
  }

  // drag with momentum, then settle on a whole year
  let drag = null, raf = 0;
  ruler.addEventListener("pointerdown", (e) => {
    cancelAnimationFrame(raf); stopPlay(); pending = null;
    drag = { x: e.clientX, y: year, t: performance.now(), v: 0, lastX: e.clientX };
    ruler.setPointerCapture(e.pointerId);
    ruler.classList.add("dragging");
  });
  ruler.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const now = performance.now(), dt = Math.max(1, now - drag.t);
    drag.v = 0.8 * drag.v + 0.2 * ((e.clientX - drag.lastX) / dt);
    drag.lastX = e.clientX; drag.t = now;
    setYear(drag.y - (e.clientX - drag.x) / PX, true);
  });
  const release = () => {
    if (!drag) return;
    let v = -drag.v / PX * 16;          // years per frame
    drag = null;
    ruler.classList.remove("dragging");
    if (reduce) return settle();
    const step = () => {
      if (Math.abs(v) < 0.01) return settle();
      setYear(year + v, true);
      v *= 0.92;
      if (year <= START || year >= END) return settle();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  ruler.addEventListener("pointerup", release);
  ruler.addEventListener("pointercancel", release);
  ruler.addEventListener("wheel", (e) => {
    e.preventDefault(); stopPlay(); cancelAnimationFrame(raf); pending = null;
    setYear(year + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) / PX, true);
    clearTimeout(ruler._w); ruler._w = setTimeout(settle, 140);
  }, { passive: false });
  ruler.addEventListener("keydown", (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1, PageUp: 5, PageDown: -5 }[e.key];
    if (e.key === "Home") return goTo(START);
    if (e.key === "End") return goTo(END);
    if (d) { e.preventDefault(); goTo((pending ?? Math.round(year)) + d); }
  });
  let pending = null;
  function settle() { goTo(Math.round(year)); }
  function goTo(target, ms = 320) {
    cancelAnimationFrame(raf);
    target = clamp(target);
    if (reduce) return setYear(target);
    pending = target;
    const from = year, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      setYear(from + (target - from) * e, k < 1);
      if (k < 1) raf = requestAnimationFrame(step); else pending = null;
    };
    raf = requestAnimationFrame(step);
  }

  // play through time
  // one year at a time; wait on events so they can be read, and stop on every new story
  let playing = false, playTimer = 0;
  const playBtn = $("#play");
  function stopPlay() { playing = false; clearTimeout(playTimer); playBtn.textContent = "▶"; playBtn.setAttribute("aria-label", "Play through the years"); }
  function playStep() {
    if (!playing) return;
    if (Math.round(year) >= END) return stopPlay();
    goTo(Math.round(year) + 1, 450);
    playTimer = setTimeout(() => {
      if (!playing) return;
      const ev = evYears.get(Math.round(year));
      if (ev && ev.doc) return stopPlay();
      playTimer = setTimeout(playStep, ev ? 4200 : 350);
    }, 500);
  }
  function startPlay() {
    if (Math.round(year) >= END) setYear(START);
    playing = true;
    playBtn.textContent = "❚❚"; playBtn.setAttribute("aria-label", "Pause");
    // read the current year's event first, if it has one
    const ev = evYears.get(Math.round(year));
    if (ev && !ev.doc) { showDialog(ev); playTimer = setTimeout(playStep, 4200); }
    else playStep();
  }
  playBtn.addEventListener("click", () => (playing ? stopPlay() : startPlay()));

  // ---------- render the world for a year ----------
  const fmt = (n, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  function render(y, fromDrag) {
    const Y = Math.round(y);
    fanList.forEach((f) => f.el.classList.toggle("off", y < f.built));
    $("#lease1").classList.toggle("on", y >= 2033);
    $("#lease2").classList.toggle("on", y >= 2044);
    $("#dcs").classList.toggle("on", y >= 2044);
    $("#routes").style.opacity = String(Math.max(0.12, 1 - Math.max(0, y - 2033) / 14));

    DOCS.forEach((d) => {
      const locked = Y < d.unlock;
      if (d.pin) d.pin.classList.toggle("locked", locked);
    });

    if (Y === shownYear) return;
    shownYear = Y;
    ruler.setAttribute("aria-valuenow", Y);
    $("#yearBig").textContent = Y;
    const imagined = Y > NOW;
    const era = $("#era");
    const yrs = (n) => `${n} year${n === 1 ? "" : "s"}`;
    era.textContent = Y < NOW ? `${yrs(NOW - Y)} ago` : Y === NOW ? "today" : `${yrs(Y - NOW)} from now`;
    era.classList.toggle("imagined", imagined);

    const removed = lerp(REMOVED_MT, Y);
    const emitted = Y <= NOW ? 37.4 : lerp(EMITTED_GT, Y);
    // plain words: both numbers in billions of tonnes, plus "x of every 1,000 tonnes"
    const removedB = removed / 1000;
    $("#mEmitted").textContent = fmt(emitted);
    $("#mRemoved").textContent = removed === 0 ? "0" : removedB < 0.05 ? "almost 0" : fmt(removedB, 1);
    const share = removed / (emitted * 1000);
    $("#mBar").style.width = removed === 0 ? "0" : `max(3px, ${share * 100}%)`;
    const per1000 = Math.round(share * 1000);
    let line = removed === 0 ? "The valley isn’t cleaning up anything yet."
      : per1000 < 1 ? "The machines clean up less than 1 of every 1,000 tonnes."
      : `The machines clean up about ${per1000} of every 1,000 tonnes.`;
    if (Y >= 2058) line += " But nobody knows if that number is true.";
    $("#mRatio").textContent = line;
    const tag = $("#mTag");
    tag.textContent = imagined ? "Made up · future" : "Real";
    tag.classList.toggle("imagined", imagined);

    const ev = evYears.get(Y);
    if (ev && !(fromDrag && drag) && $("#tour").hidden) showDialog(ev);
    else if (!ev) hideDialog();
    if (ev && ev.doc) {
      const d = DOCS.find((x) => x.id === ev.doc);
      if (d.pin && !seenEvents.has(Y)) { d.pin.classList.add("new"); setTimeout(() => d.pin.classList.remove("new"), 3000); }
    }
    if (ev) seenEvents.add(Y);
  }

  // ---------- dialogue box (typed out like a handheld RPG) ----------
  const dialog = $("#dialog"), dText = $("#dText");
  let typing = 0;
  function showDialog(ev) {
    clearInterval(typing);
    dialog.hidden = false;
    const tag = $("#dTag");
    tag.textContent = ev.real ? `real · ${ev.y}` : `imagined · ${ev.y}`;
    tag.classList.toggle("imagined", !ev.real);
    $("#dSrc").textContent = ev.src ? `Source: ${ev.src}` : "";
    const ids = ev.docs || (ev.doc ? [ev.doc] : []);
    const acts = $("#dActions");
    acts.innerHTML = ids.map((id) => `<button class="read" data-read="${id}">Read Story ${id} ▸</button>`).join("")
      + (ids.length && ev.y < END ? `<button class="keep" data-keep>Keep playing</button>` : "");
    acts.querySelectorAll("[data-read]").forEach((b) => b.addEventListener("click", () => openDoc(+b.dataset.read)));
    acts.querySelectorAll("[data-keep]").forEach((b) => b.addEventListener("click", () => { hideDialog(); startPlay(); }));
    if (reduce) { dText.textContent = ev.text; return; }
    let i = 0;
    dText.textContent = "";
    typing = setInterval(() => { dText.textContent = ev.text.slice(0, ++i); if (i >= ev.text.length) clearInterval(typing); }, 16);
  }
  function hideDialog() { clearInterval(typing); dialog.hidden = true; }
  $("#dNext").addEventListener("click", hideDialog);

  // ---------- sheet ----------
  const sheet = $("#sheet"), body = $("#sheetBody");
  function openSheet(html, hash) {
    body.innerHTML = html;
    body.scrollTop = 0;
    sheet.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
    sheet.style.removeProperty("--drag");
    if (hash && location.hash !== "#" + hash) history.replaceState(null, "", "#" + hash);
    body.querySelectorAll("[data-doc]").forEach((b) => b.addEventListener("click", () => openDoc(+b.dataset.doc)));
    body.querySelectorAll("[data-jump]").forEach((b) => b.addEventListener("click", () => { closeSheet(); goTo(+b.dataset.jump, 900); }));
    body.querySelectorAll("[data-begin]").forEach((b) => b.addEventListener("click", () => {
      closeSheet(); goTo(START, 700);
      if (tourDone()) setTimeout(startPlay, 800); else setTimeout(() => startTour(startPlay), 800);
    }));
    body.querySelectorAll("[data-tour]").forEach((b) => b.addEventListener("click", () => { closeSheet(); setTimeout(() => startTour(), 400); }));
    $("#close").focus({ preventScroll: true });
  }
  function closeSheet() {
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }
  $("#close").addEventListener("click", closeSheet);
  addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!tour.hidden) endTour(); else closeSheet(); } });

  // swipe the sheet down to close on phones
  const grip = $("#grip");
  let gy = null;
  grip.addEventListener("pointerdown", (e) => { gy = e.clientY; grip.setPointerCapture(e.pointerId); sheet.style.transition = "none"; });
  grip.addEventListener("pointermove", (e) => { if (gy !== null) sheet.style.setProperty("--drag", Math.max(0, e.clientY - gy) + "px"); });
  grip.addEventListener("pointerup", (e) => {
    sheet.style.transition = "";
    if (gy !== null && e.clientY - gy > 120) closeSheet(); else sheet.style.removeProperty("--drag");
    gy = null;
  });

  const chip = (k) => `<span class="fact-chip" style="--c:${PEOPLE[k].color}"><i></i>${PEOPLE[k].name}</span>`;
  function docHTML(d) {
    const Y = Math.round(year);
    const head = `
      <p class="eyebrow">Story ${d.id} · ${d.form}</p>
      <h2>${d.title}</h2>
      <p class="lede">${d.lede}</p>
      <div class="facts-row">
        ${d.writers.map(chip).join("")}
        <span class="fact-chip">${d.place}, ${d.dates}</span>
        <span class="fact-chip">Inspired by&nbsp;<em>${d.style}</em></span>
        <span class="fact-chip">${d.course}</span>
      </div>`;
    if (Y < d.unlock) {
      return head + `<div class="slot"><span class="stamp">LOCKED UNTIL ${d.unlock}</span><p>This story hasn’t happened yet in ${Y}. Move the timeline forward to reach it.</p><button class="begin" data-jump="${d.unlock}">Go to ${d.unlock}</button></div>`;
    }
    let html = head + (d.body || "");
    if (d.pending) {
      const p = PEOPLE[d.pending.who];
      html += `<div class="slot" style="--c:${p.color}">
        <span class="stamp">COMING SOON</span>
        <div class="who"><i></i>Hints for ${p.name}</div><p>Make up your own story. These are just ideas to help.</p>
        <ul>${d.pending.items.map((i) => `<li>${i}</li>`).join("")}</ul>
        <p>About 500–800 words. Send to Daniel by Thursday, Dec. 3.</p>
      </div>`;
    }
    return html;
  }
  function openDoc(id) { const d = DOCS.find((x) => x.id === id); if (d) openSheet(docHTML(d), "doc-" + id); }

  const SHEETS = {
    story: () => STORY,
    research: () => RESEARCH,
    docs: () => {
      const Y = Math.round(year);
      return `<p class="eyebrow">The stories</p><h2>Five stories</h2><p class="lede">Each one is told a different way, by a different person in our group.</p>
        <ul class="doc-list">${DOCS.map((d) => {
          const c = PEOPLE[d.writers[d.writers.length > 1 ? 1 : 0]].color;
          const right = Y < d.unlock ? `<span class="lock">${d.unlock}</span>` : "";
          return `<li><button data-doc="${d.id}"><span class="n" style="--c:${c}">${String(d.id).padStart(2, "0")}</span><span><b>${d.title}</b><small>${d.form} · ${d.writers.map((w) => PEOPLE[w].name).join(" & ")}</small></span>${right}</button></li>`;
        }).join("")}</ul>`;
    },
    team: () => {
      const rows = [
        ["daniel", "The website, research, and the first letters in Story 1", "done"],
        ["breanna", "Story 1 · Letters from Grandma", ""],
        ["isabelle", "Story 2 · Texts Home", ""],
        ["tooba", "Story 3 · The Counting Machine", ""],
        ["viena", "Story 4 · Notes from the Ice", ""],
        ["hannah", "Story 5 · The Court Case", ""],
      ];
      const done = (k) => k === "daniel" || DOCS.some((d) => d.writers.includes(k) && d.body && !(d.pending && d.pending.who === k));
      return `<p class="eyebrow">Module 3 · Group 1</p><h2>Who made this</h2>
        <div class="team">${rows.map(([k, role]) => `<div style="--c:${PEOPLE[k].color}"><i></i><span><b>${PEOPLE[k].name}</b><br><small>${role}</small></span><small>${done(k) ? "Done" : "Writing"}</small></div>`).join("")}</div>
        <p class="foot">Anthro 2288A · Climate, Science, and the Changing World · Western University · Fall 2026. A work of speculative fiction: everything after 2026 is imagined.</p>`;
    },
  };
  document.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => openSheet(SHEETS[b.dataset.open](), b.dataset.open)));

  // ---------- light / dark ----------
  const themeBtn = $("#theme"), root = document.documentElement;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  function paintThemeBtn() {
    const dark = isDark();
    themeBtn.textContent = dark ? "☀" : "☾";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  try { const saved = localStorage.getItem("cv-theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("cv-theme", root.dataset.theme); } catch (e) {}
    paintThemeBtn();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintThemeBtn);
  paintThemeBtn();

  // ---------- guided tour: a spotlight and a tip for each part of the screen ----------
  const tour = $("#tour"), spot = $("#tourSpot"), tip = $("#tourTip");
  const STEPS = [
    { el: () => $("#ruler"), text: "This is the timeline. Drag it left or right to travel through time, or press ▶ to play." },
    { el: () => DOCS[0].pin, text: "Each pin on the map is a story. Grey pins unlock when you reach their year. Tap a pin to read it." },
    { el: () => $(".meter"), text: "This box compares the pollution going into the sky with how much the machines clean up." },
    { el: () => $(".menu"), text: "Open the list of stories, the research behind them, or who made this. The round button switches dark mode." },
  ];
  let stepAt = 0, afterTour = null;
  const tourDone = () => { try { return localStorage.getItem("cv-tour") === "done"; } catch (e) { return false; } };
  function startTour(then) {
    afterTour = then || null;
    stepAt = 0;
    hideDialog(); stopPlay();
    tour.hidden = false;
    showStep();
  }
  function showStep() {
    const s = STEPS[stepAt], r = s.el().getBoundingClientRect(), pad = 8;
    Object.assign(spot.style, { left: r.left - pad + "px", top: r.top - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
    $("#tourStep").textContent = `${stepAt + 1} of ${STEPS.length}`;
    $("#tourText").textContent = s.text;
    $("#tourNext").textContent = stepAt === STEPS.length - 1 ? "Start" : "Next";
    const w = Math.min(340, innerWidth - 32);
    tip.style.width = w + "px";
    tip.style.left = Math.max(16, Math.min(innerWidth - w - 16, r.left + r.width / 2 - w / 2)) + "px";
    if (r.top + r.height / 2 > innerHeight / 2) { tip.style.top = ""; tip.style.bottom = innerHeight - r.top + pad + 14 + "px"; }
    else { tip.style.bottom = ""; tip.style.top = r.bottom + pad + 14 + "px"; }
    $("#tourNext").focus({ preventScroll: true });
  }
  function endTour() {
    tour.hidden = true;
    try { localStorage.setItem("cv-tour", "done"); } catch (e) {}
    const then = afterTour; afterTour = null;
    if (then) then();
  }
  $("#tourNext").addEventListener("click", () => { if (++stepAt >= STEPS.length) endTour(); else showStep(); });
  $("#tourSkip").addEventListener("click", endTour);
  addEventListener("resize", () => { if (!tour.hidden) showStep(); });

  // ---------- boot ----------
  function route() {
    const h = location.hash.slice(1);
    if (h.startsWith("doc-")) openDoc(+h.slice(4));
    else if (SHEETS[h]) openSheet(SHEETS[h](), h);
  }
  // frame the valley to the screen: same height of map on every device, width follows the screen
  const map = $("#map");
  function fitMap() {
    const h = innerWidth < 760 ? 640 : 620, y0 = innerWidth < 760 ? 30 : 50;
    const w = h * innerWidth / innerHeight, cx = innerWidth < 760 ? 445 : 500;
    map.setAttribute("viewBox", `${cx - w / 2} ${y0} ${w} ${h}`);
  }
  fitMap();
  addEventListener("resize", () => { fitMap(); setYear(year); });
  addEventListener("hashchange", route);
  setYear(NOW);
  if (location.hash) route(); else openSheet(STORY, "");
})();
