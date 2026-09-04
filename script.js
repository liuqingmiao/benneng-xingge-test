/* ============================================================
   人格观察档案馆 · 题库 / 计分 / 渲染逻辑
   ============================================================ */

// ---------- 12 道题目（源自《测一测你的本能心性模式》） ----------
const QUESTIONS = [
  {
    q: "当别人突然对你冷淡、态度转变，你的第一反应？",
    options: {
      A: "心里立刻感知对方情绪，直觉知道缘由，内心柔软不设防",
      B: "快速复盘前因后果、对方目的、利弊得失，预判后续走向",
      C: "无感，情绪不受影响，单纯观察这件事的发生",
      D: "第一时间自我反思：是不是我做错了什么，想要主动缓和"
    }
  },
  {
    q: "与人发生争执、矛盾冲突时，你的本能状态？",
    options: {
      A: "内心难受但不愿对抗，只想真诚沟通化解误会",
      B: "快速冷静布局，守住自己底线，不吃亏、不被动",
      C: "立刻抽离情绪，不想争吵，冷眼旁观整件闹剧",
      D: "害怕关系破裂，习惯性退让、妥协、主动服软"
    }
  },
  {
    q: "面对他人的假意客套、虚伪试探，你会？",
    options: {
      A: "一眼看穿，但选择包容，不愿拆穿他人",
      B: "精准识别套路，顺势应对，守住自身利益",
      C: "看破对方套路，但完全不想介入，只当作观察人性，不产生包容或者反感情绪",
      D: "假装相信，配合对方，避免尴尬和矛盾"
    }
  },
  {
    q: "一段关系让你内耗、不舒服，你的选择是？",
    options: {
      A: "舍不得情谊，心软纠结，反复拉扯内耗",
      B: "权衡利弊，无用关系及时止损，果断取舍",
      C: "默默疏远，悄无声息退出，不解释不纠缠",
      D: "先委屈自己迁就，实在撑不住才敢离开"
    }
  },
  {
    q: "别人对你好、偏爱你时，你的内心感受？",
    options: {
      A: "真诚感动，纯粹接纳，真心回馈善意",
      B: "下意识防备，思考对方的目的和所求",
      C: "平淡接受，不狂喜不感动，情绪稳定",
      D: "受宠若惊，害怕辜负对方，拼命回报"
    }
  },
  {
    q: "遇事突发变故、计划被打乱，你的本能？",
    options: {
      A: "慌乱片刻，跟着本心感受接纳一切变化",
      B: "立刻调整方案，预判风险，掌控局面",
      C: "坦然接受无常，顺其自然，不纠结失控",
      D: "焦虑不安，自我怀疑，害怕出现坏结果"
    }
  },
  {
    q: "和亲近的人产生误会，对方不解释、不沟通？",
    options: {
      A: "内心难过，期待彼此坦诚，不愿冷战",
      B: "看清对方态度，心里打分、记分寸、划边界",
      C: "无所谓，沉默就沉默，无需强行维系",
      D: "主动低头破冰，优先修复关系，委屈自己"
    }
  },
  {
    q: "面对他人的指责、误解、无端指责？",
    options: {
      A: "心里委屈，但不会恶意回击，保持本心",
      B: "清晰辩驳、守住立场，不让自己背锅吃亏",
      C: "懒得辩解，情绪隔离，不在意他人评价",
      D: "习惯性道歉、妥协，优先平息对方情绪"
    }
  },
  {
    q: "在人际交往中，你最核心的特质是？",
    options: {
      A: "纯粹通透，心思干净，共情力极强",
      B: "清醒通透，预判全局，自保意识极强",
      C: "理智清冷，置身事外，极少情绪内耗",
      D: "温柔隐忍，习惯性迁就，优先他人感受"
    }
  },
  {
    q: "发现别人利用你的善良、心软时？",
    options: {
      A: "难过失望，但不会因此变成恶人，但会拉开距离",
      B: "立刻清醒，收回善意，再也不迁就",
      C: "早已看透，早有预判，从不意外",
      D: "自我纠结，不敢撕破脸，继续隐忍"
    }
  },
  {
    q: "大事抉择、人生选择时，你依靠什么？",
    options: {
      A: "本心直觉、内心感受、心安即可",
      B: "利弊分析、得失权衡、长远预判",
      C: "顺其自然、随遇而安、不强求结果",
      D: "他人意见、顾及人情、害怕得罪人"
    }
  },
  {
    q: "被人伤害、辜负之后，你的状态？",
    options: {
      A: "会受伤、会难过，但依旧保留温柔底色",
      B: "快速复盘教训，升级心智，收紧边界",
      C: "快速释怀抽离，情绪清零，不恋过往",
      D: "反复内耗、自我内耗，难以走出阴影"
    }
  }
];

// ---------- 四种结果 ----------
const RESULTS = {
  A: {
    name: "本心直觉型",
    tagline: "心眼之上长一颗心",
    desc:
      "你以本心感受世界，直觉先行，心软而有底线。你能一眼看穿人事的真相，却不愿用套路去回应；别人对你好，你会纯粹地接纳并真心回馈。受伤时也会难过、会失望，但你始终不肯让自己的温柔变了质——不是不懂心眼子，而是心眼之上，还长着一颗心。",
    tags: ["纯粹", "共情力强", "直觉先行", "温柔底色"]
  },
  B: {
    name: "算计预判型",
    tagline: "心上长满心眼子",
    desc:
      "你清醒而敏锐，凡事预判先行。复盘前因后果、权衡利弊得失、提前布局应对，是你的本能反应。你的边界感极强，不做吃亏的事，被利用时会立刻收回善意。这不是冷漠，而是自保意识早已刻进骨子里——你只是比多数人更早看清了牌桌。",
    tags: ["清醒通透", "预判全局", "边界感强", "自保意识"]
  },
  C: {
    name: "理性抽离旁观者",
    tagline: "看透不说透，情绪不内耗",
    desc:
      "你情绪稳定，习惯置身事外观察一切。面对冲突与试探，你本能地抽离情绪，冷眼看清全局，不介入、不纠缠、不评价。早已看透的人性，不会让你意外，也激不起你的包容或反感。世界于你，更像一场值得安静观察的展览。",
    tags: ["理智清冷", "置身事外", "情绪稳定", "极少内耗"]
  },
  D: {
    name: "讨好回避型",
    tagline: "把别人的感受，放在自己前面",
    desc:
      "你把别人的情绪放在第一位，习惯性迁就、退让、道歉，用主动服软去平息一切冲突。你并非没有脾气，只是更害怕关系破裂；受了委屈也常常先自己消化，撑不住才敢离开。你需要的不是更多讨好，而是一次理直气壮的「先顾好自己」。",
    tags: ["温柔隐忍", "习惯迁就", "害怕失去", "回避冲突"]
  }
};

const LETTER_INFO = {
  A: "本心直觉",
  B: "算计预判",
  C: "理性抽离",
  D: "讨好回避"
};

// ---------- 状态 ----------
let currentIndex = 0;
const answers = new Array(QUESTIONS.length).fill(null);

// ---------- DOM ----------
const screens = {
  home: document.getElementById("screen-home"),
  test: document.getElementById("screen-test"),
  result: document.getElementById("screen-result")
};

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const progressBar = document.getElementById("progress-bar");
const progressNo = document.getElementById("test-progress-no");
const btnBack = document.getElementById("btn-back");

// ---------- 屏幕切换 ----------
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0 });
}

// ---------- 渲染当前题目 ----------
function renderQuestion() {
  const item = QUESTIONS[currentIndex];
  questionText.textContent = item.q;
  progressNo.textContent = `第 ${String(currentIndex + 1).padStart(2, "0")} / ${QUESTIONS.length} 题`;
  progressBar.style.width = `${((currentIndex + 1) / QUESTIONS.length) * 100}%`;
  btnBack.hidden = currentIndex === 0;

  optionsBox.innerHTML = "";
  Object.entries(item.options).forEach(([key, text]) => {
    const btn = document.createElement("button");
    btn.className = "option" + (answers[currentIndex] === key ? " selected" : "");
    btn.innerHTML = `<span class="option-key">${key}</span><span>${text}</span>`;
    btn.addEventListener("click", () => selectOption(key));
    optionsBox.appendChild(btn);
  });
}

// ---------- 选择答案 ----------
function selectOption(key) {
  answers[currentIndex] = key;
  [...optionsBox.children].forEach((btn, i) => {
    btn.classList.toggle("selected", Object.keys(QUESTIONS[currentIndex].options)[i] === key);
  });
  // 稍作停顿再进入下一题，给用户点击反馈
  setTimeout(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  }, 280);
}

// ---------- 计分 ----------
function score() {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(k => { if (k) counts[k]++; });
  let best = "A";
  (["A", "B", "C", "D"]).forEach(k => {
    if (counts[k] > counts[best]) best = k;
  });
  return { counts, best };
}

// ---------- 渲染结果 ----------
function showResult() {
  const { counts, best } = score();
  const result = RESULTS[best];

  document.getElementById("result-name").textContent = result.name;
  document.getElementById("result-tagline").textContent = `「${result.tagline}」`;
  document.getElementById("result-desc").textContent = result.desc;

  const tagsBox = document.getElementById("result-tags");
  tagsBox.innerHTML = "";
  result.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    tagsBox.appendChild(span);
  });

  // 心性构成条
  const barsBox = document.getElementById("composition-bars");
  barsBox.innerHTML = "";
  Object.keys(counts).forEach(k => {
    const row = document.createElement("div");
    row.className = "comp-row" + (k === best ? " is-top" : "");
    row.innerHTML = `
      <span class="comp-label">${k} · ${LETTER_INFO[k]}</span>
      <span class="comp-track"><span class="comp-fill" data-w="${(counts[k] / QUESTIONS.length) * 100}"></span></span>
      <span class="comp-count">${counts[k]}</span>`;
    barsBox.appendChild(row);
  });

  // 随机档案编号
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  document.getElementById("result-file-no").textContent = `档案编号 PQA-${ymd}-${rand} · 已归档`;

  showScreen("result");
  // 动画：条形图延迟填充
  setTimeout(() => {
    barsBox.querySelectorAll(".comp-fill").forEach(f => {
      f.style.width = f.dataset.w + "%";
    });
  }, 120);
}

// ---------- 重新测试 ----------
function restart() {
  currentIndex = 0;
  answers.fill(null);
  renderQuestion();
  showScreen("test");
}

// ---------- 事件绑定 ----------
document.getElementById("btn-start").addEventListener("click", restart);
document.getElementById("btn-restart").addEventListener("click", restart);
btnBack.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
});
