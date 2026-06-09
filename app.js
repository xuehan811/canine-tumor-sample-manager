const STORAGE_KEY = "canis-oncotrack-samples-v3-real-docx";
const API_BASE = window.CANIS_API_BASE || "/api";

const seedSamples = [
  {
    sampleId: "TArgos0181-T",
    limsId: "GS2606030181G001",
    runBatch: "260608_T7-1_E250199089_A",
    platform: "MGI T7",
    currentTask: "report_review",
    dogName: "雪球",
    breed: "金毛寻回犬",
    age: "9岁",
    sex: "雌性",
    owner: "南京瑞宠动物医院",
    tumorType: "肥大细胞瘤",
    site: "皮肤肿物",
    panel: "犬肿瘤154基因Panel",
    receivedDate: "2026-06-03",
    status: "报告审核",
    qc: "通过",
    report: "待审核",
    variants: ["KIT p.D816V", "TP53 p.R273H"],
    notes: "病理提示高分级肥大细胞瘤，建议重点复核 KIT 变异。",
    clinical: {
      diagnosis: "高级别肥大细胞瘤",
      complaint: "右侧躯干部皮肤肿块逐渐增大，触诊质韧。",
      exams: [
        { type: "体格检查", date: "2026-05-29", result: "右侧躯干部约 3.2 cm 皮下肿物，边界欠清。" },
        { type: "病理检查", date: "2026-06-01", result: "肥大细胞瘤，高分级，建议分子检测评估 KIT 相关风险。" },
        { type: "影像检查", date: "2026-06-02", result: "胸腹部未见明确远处转移征象。" }
      ],
      treatments: [
        { date: "2026-06-04", plan: "肿物扩大切除术后送检，术后抗炎镇痛。" },
        { date: "2026-06-08", plan: "等待分子结果，评估是否需要靶向治疗建议。" }
      ],
      prognosis: "存在复发风险，若 KIT 激活变异确认，建议结合病理分级和切缘状态制定随访计划。",
      followUp: [{ date: "2026-07-01", note: "建议复查局部切缘和区域淋巴结。" }]
    }
  },
  {
    sampleId: "TArgos0182-T",
    limsId: "GS2606050182G001",
    runBatch: "260608_T7-1_E250199089_A",
    platform: "MGI T7",
    currentTask: "bioinfo_qc",
    dogName: "黑豆",
    breed: "拉布拉多",
    age: "7岁",
    sex: "雄性",
    owner: "苏州伴侣动物医院",
    tumorType: "骨肉瘤",
    site: "左前肢骨组织",
    panel: "犬肿瘤154基因Panel",
    receivedDate: "2026-06-05",
    status: "生信分析",
    qc: "待复核",
    report: "未生成",
    variants: ["TP53 p.R175H", "PTEN loss"],
    notes: "肿瘤含量偏低，需结合测序深度复核 CNV。",
    clinical: {
      diagnosis: "骨肉瘤",
      complaint: "左前肢跛行 2 周，疼痛明显。",
      exams: [
        { type: "影像检查", date: "2026-06-03", result: "左前肢长骨骨质破坏伴骨膜反应。" },
        { type: "细胞学", date: "2026-06-04", result: "可见异型间叶源性细胞，考虑恶性骨肿瘤。" }
      ],
      treatments: [
        { date: "2026-06-05", plan: "镇痛治疗，建议转诊评估截肢或保肢方案。" }
      ],
      prognosis: "预后谨慎，需结合分期检查和分子结果评估复发与转移风险。",
      followUp: [{ date: "2026-06-20", note: "建议胸部影像复查转移情况。" }]
    }
  },
  {
    sampleId: "TArgos0183-T",
    limsId: "GS2606060183G001",
    runBatch: "260607_T7-2_E250188102_B",
    platform: "MGI T7",
    currentTask: "sequencing",
    dogName: "奶茶",
    breed: "柯基",
    age: "6岁",
    sex: "雌性",
    owner: "杭州宠康中心",
    tumorType: "乳腺癌",
    site: "乳腺肿物",
    panel: "犬实体瘤热点Panel",
    receivedDate: "2026-06-06",
    status: "测序中",
    qc: "通过",
    report: "未生成",
    variants: ["PIK3CA p.H1047R"],
    notes: "已完成建库，等待测序下机。",
    clinical: {
      diagnosis: "乳腺癌",
      complaint: "腹侧乳腺链多发结节。",
      exams: [
        { type: "体格检查", date: "2026-06-01", result: "左侧第三乳腺区结节约 1.8 cm。" },
        { type: "病理检查", date: "2026-06-05", result: "乳腺腺癌，建议分子检测辅助风险评估。" }
      ],
      treatments: [
        { date: "2026-06-06", plan: "乳腺肿物切除，术后等待检测结果。" }
      ],
      prognosis: "需结合组织学分级、淋巴结状态和分子结果综合判断。",
      followUp: []
    }
  },
  {
    sampleId: "TArgos0184-T",
    limsId: "GS2606010184G001",
    runBatch: "260604_NS-1_AH7L2WDSX7",
    platform: "Illumina NovaSeq",
    currentTask: "done",
    dogName: "团团",
    breed: "边境牧羊犬",
    age: "10岁",
    sex: "雄性",
    owner: "上海星原动物医院",
    tumorType: "淋巴瘤",
    site: "淋巴结穿刺",
    panel: "犬肿瘤154基因Panel",
    receivedDate: "2026-06-01",
    status: "已发布",
    qc: "通过",
    report: "已发布",
    variants: ["BRAF p.V588E", "CDKN2A loss"],
    notes: "报告已发布，建议进入随访队列。",
    clinical: {
      diagnosis: "淋巴瘤",
      complaint: "外周淋巴结多发肿大，精神下降。",
      exams: [
        { type: "细胞学", date: "2026-05-28", result: "大量异型淋巴样细胞，符合淋巴瘤表现。" },
        { type: "血液检查", date: "2026-05-29", result: "轻度贫血，炎症指标升高。" }
      ],
      treatments: [
        { date: "2026-06-02", plan: "启动 CHOP 类化疗方案前评估。" }
      ],
      prognosis: "需结合免疫分型、分期和治疗反应；建议密切随访。",
      followUp: [{ date: "2026-06-18", note: "复查淋巴结大小和血常规。" }]
    }
  },
  {
    sampleId: "TArgos0185-T",
    limsId: "GS2606080185G001",
    runBatch: "pending",
    platform: "MGI T7",
    currentTask: "sample_received",
    dogName: "阿福",
    breed: "中华田园犬",
    age: "8岁",
    sex: "雄性",
    owner: "成都安安动物医院",
    tumorType: "黑色素瘤",
    site: "口腔肿物",
    panel: "全外显子辅助分析",
    receivedDate: "2026-06-08",
    status: "收样",
    qc: "通过",
    report: "未生成",
    variants: ["NRAS p.Q61R"],
    notes: "样本已登记，待 DNA 提取。",
    clinical: {
      diagnosis: "口腔黑色素瘤",
      complaint: "口腔肿物伴进食困难。",
      exams: [
        { type: "体格检查", date: "2026-06-07", result: "口腔黏膜黑色肿物，伴轻度出血。" },
        { type: "影像检查", date: "2026-06-08", result: "局部浸润待进一步评估。" }
      ],
      treatments: [
        { date: "2026-06-08", plan: "计划局部切除并送检分子检测。" }
      ],
      prognosis: "口腔黑色素瘤侵袭性较强，建议结合分期和切缘状态制定治疗方案。",
      followUp: []
    }
  }
];

const state = {
  samples: loadLocalSamples(),
  query: "",
  status: "all",
  tumor: "all",
  apiOnline: false
};

const statusOrder = ["收样", "测序中", "生信分析", "报告审核", "已发布"];
const reportLanes = ["未生成", "待解读", "待审核", "已发布", "已同步LIMS"];

function loadLocalSamples() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedSamples;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedSamples;
  } catch {
    return seedSamples;
  }
}

function saveLocalSamples() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.samples));
}

async function loadFromApi() {
  try {
    const response = await fetch(`${API_BASE}/samples/`, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload.results;
    if (!Array.isArray(rows)) throw new Error("Unexpected API payload");
    state.samples = rows.map(fromApiSample);
    state.apiOnline = true;
    saveLocalSamples();
    renderAll();
  } catch {
    state.apiOnline = false;
    renderAll();
  }
}

async function createSampleOnApi(sample) {
  if (!state.apiOnline) return;
  try {
    const response = await fetch(`${API_BASE}/samples/`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toApiSample(sample))
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const created = fromApiSample(await response.json());
    state.samples = [created, ...state.samples.filter((item) => item.sampleId !== created.sampleId)];
    saveLocalSamples();
    renderAll();
  } catch {
    state.apiOnline = false;
  }
}

function fromApiSample(row) {
  return {
    sampleId: row.sample_id,
    limsId: row.lims_id || "",
    runBatch: row.lims_payload?.run_batch || row.lims_payload?.batch_no || "",
    platform: row.lims_payload?.platform || "",
    currentTask: row.lims_payload?.current_task || "",
    dogName: row.patient?.name || "",
    breed: row.patient?.breed || "",
    age: row.patient?.age || "",
    sex: row.patient?.sex || "",
    owner: row.patient?.owner_or_hospital || "",
    tumorType: row.tumor_type || "",
    site: row.anatomical_site || "",
    panel: row.panel || "",
    receivedDate: row.received_date || "",
    status: row.status || "收样",
    qc: row.qc_status || "通过",
    report: row.report_status || "未生成",
    variants: (row.variants || []).map((variant) => `${variant.gene} ${variant.alteration}`.trim()),
    notes: row.notes || "",
    clinical: fromApiClinical(row.clinical_info)
  };
}

function fromApiClinical(clinical) {
  if (!clinical) return emptyClinical();
  return {
    diagnosis: clinical.clinical_diagnosis || "",
    complaint: clinical.chief_complaint || "",
    exams: [
      ...(clinical.physical_exam || []).map((item) => ({ ...item, type: item.type || "体格检查" })),
      ...(clinical.imaging || []).map((item) => ({ ...item, type: item.type || "影像检查" })),
      ...(clinical.pathology || []).map((item) => ({ ...item, type: item.type || "病理检查" })),
      ...(clinical.laboratory_tests || []).map((item) => ({ ...item, type: item.type || "实验室检查" }))
    ],
    treatments: clinical.treatments || [],
    prognosis: clinical.prognosis || "",
    followUp: clinical.follow_up || [],
    source: clinical.source || "",
    importedAt: clinical.imported_at || ""
  };
}

function emptyClinical() {
  return { diagnosis: "", complaint: "", exams: [], treatments: [], prognosis: "", followUp: [] };
}

function toApiSample(sample) {
  return {
    sample_id: sample.sampleId,
    patient: {
      name: sample.dogName,
      breed: sample.breed,
      sex: sample.sex,
      age: sample.age,
      owner_or_hospital: sample.owner
    },
    tumor_type: sample.tumorType,
    anatomical_site: sample.site,
    specimen_type: "",
    panel: sample.panel,
    received_date: sample.receivedDate,
    status: sample.status,
    qc_status: sample.qc,
    report_status: sample.report,
    notes: sample.notes,
    variants: sample.variants.map(parseVariant)
  };
}

function parseVariant(text) {
  const [gene, ...rest] = text.trim().split(/\s+/);
  const alteration = rest.join(" ") || "未填写";
  const variantType = /loss|gain|amplification|del/i.test(text) ? "CNV" : "SNV";
  return { gene: gene || "NA", alteration, variant_type: variantType };
}

function byId(id) {
  return document.getElementById(id);
}

function inputValue(id) {
  return (byId(id)?.value || "").trim();
}

function filteredSamples() {
  const q = (state.query || inputValue("filter-monitor-query")).trim().toLowerCase();
  const sampleId = inputValue("filter-sample-id").toLowerCase();
  const limsId = inputValue("filter-lims-id").toLowerCase();
  const platform = inputValue("filter-platform");
  const batch = inputValue("filter-batch").toLowerCase();
  const date = inputValue("filter-date");
  const product = inputValue("tumor-filter");
  const analysisStatus = inputValue("filter-analysis-status");
  const batchQuery = inputValue("filter-batch-query").toLowerCase();
  return state.samples.filter((sample) => {
    const searchable = [
      sample.sampleId,
      sample.dogName,
      sample.owner,
      sample.tumorType,
      sample.limsId,
      sample.runBatch,
      sample.platform,
      sample.currentTask,
      sample.site,
      sample.panel,
      sample.variants.join(" ")
    ].join(" ").toLowerCase();
    return (!q || searchable.includes(q))
      && (!sampleId || sample.sampleId.toLowerCase().includes(sampleId))
      && (!limsId || String(sample.limsId || "").toLowerCase().includes(limsId))
      && (platform === "all" || !platform || sample.platform === platform)
      && (!batch || String(sample.runBatch || "").toLowerCase().includes(batch))
      && (!date || sample.receivedDate === date)
      && (product === "all" || !product || sample.panel === product)
      && (analysisStatus === "all" || !analysisStatus || sample.status === analysisStatus)
      && (!batchQuery || searchable.includes(batchQuery))
      && (state.status === "all" || sample.status === state.status)
      && (state.tumor === "all" || sample.panel === state.tumor);
  });
}

function badgeClass(value) {
  if (["通过", "已发布"].includes(value)) return "good";
  if (["待复核", "待审核", "报告审核"].includes(value)) return "warn";
  if (["失败"].includes(value)) return "bad";
  return "";
}

function renderMetrics() {
  const now = new Date("2026-06-09T12:00:00");
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  byId("metric-total").textContent = state.samples.length;
  byId("metric-week").textContent = state.samples.filter((s) => new Date(s.receivedDate) >= weekAgo).length;
  byId("metric-pending").textContent = state.samples.filter((s) => ["收样", "测序中", "生信分析"].includes(s.status)).length;
  byId("metric-review").textContent = state.samples.filter((s) => s.qc !== "通过" || s.report === "待审核").length;
}

function renderTumorFilter() {
  const select = byId("tumor-filter");
  const panels = [...new Set(state.samples.map((s) => s.panel))].sort();
  select.innerHTML = `<option value="all">全部产品</option>${panels.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}`;
  select.value = state.tumor === "all" ? "all" : state.tumor;
}

function renderPipeline() {
  byId("pipeline").innerHTML = statusOrder.map((status) => {
    const items = state.samples.filter((s) => s.status === status);
    return `
      <div class="stage">
        <strong>${status}<span>${items.length}</span></strong>
        ${items.slice(0, 3).map((s) => `
          <div class="stage-item">
            <b>${escapeHtml(s.sampleId)}</b>
            <small>${escapeHtml(s.dogName)} · ${escapeHtml(s.tumorType)}</small>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

function riskScore(sample) {
  let score = 0;
  if (sample.qc !== "通过") score += 4;
  if (sample.report === "待审核") score += 3;
  if (sample.status === "报告审核") score += 2;
  if (sample.variants.some((v) => /KIT|BRAF|TP53|PTEN|PIK3CA/i.test(v))) score += 1;
  return score;
}

function renderPriorityList() {
  const items = [...state.samples].sort((a, b) => riskScore(b) - riskScore(a)).slice(0, 5);
  byId("priority-list").innerHTML = items.map((sample) => `
    <button class="priority-item" data-detail="${escapeHtml(sample.sampleId)}">
      <span>
        <b>${escapeHtml(sample.sampleId)} · ${escapeHtml(sample.dogName)}</b>
        <small>${escapeHtml(sample.tumorType)} / ${escapeHtml(sample.status)} / ${escapeHtml(sample.qc)}</small>
      </span>
      <span class="badge ${badgeClass(sample.qc)}">${escapeHtml(sample.qc)}</span>
    </button>
  `).join("");
}

function renderTable() {
  const rows = filteredSamples();
  byId("sample-table").innerHTML = rows.map((sample) => `
    <tr>
      <td><input type="checkbox" aria-label="选择 ${escapeHtml(sample.sampleId)}" /></td>
      <td><span class="sample-id">${escapeHtml(sample.sampleId)}</span><br><span class="muted">${escapeHtml(sample.dogName)} · ${escapeHtml(sample.tumorType)}</span></td>
      <td>${escapeHtml(sample.limsId || "-")}</td>
      <td><span class="mono">${escapeHtml(sample.runBatch || "-")}</span></td>
      <td><span class="badge ${badgeClass(sample.status)}">${escapeHtml(sample.status)}</span></td>
      <td><span class="platform-badge">${escapeHtml(sample.platform || "-")}</span></td>
      <td>${escapeHtml(sample.currentTask || "-")}</td>
      <td><span class="product-tag">${escapeHtml(sample.panel)}</span></td>
      <td>${escapeHtml(sample.receivedDate)}</td>
      <td><span class="badge ${badgeClass(sample.qc)}">${escapeHtml(sample.qc)}</span></td>
      <td>${sample.variants.length ? `<span class="badge good">${sample.variants.length} 项</span>` : `<span class="badge">无</span>`}</td>
      <td><span class="badge ${badgeClass(sample.report)}">${escapeHtml(sample.report)}</span></td>
      <td class="row-actions">
        <button class="action-link" data-detail="${escapeHtml(sample.sampleId)}">查看</button>
        <button class="action-link danger">删除</button>
        <button class="action-link" data-clinical="${escapeHtml(sample.sampleId)}">临床</button>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="13" class="muted">没有匹配的样本</td></tr>`;
}

function renderVariants() {
  byId("variant-grid").innerHTML = state.samples.map((sample) => `
    <article class="variant-card">
      <strong>${escapeHtml(sample.sampleId)} · ${escapeHtml(sample.tumorType)}</strong>
      <small>${escapeHtml(sample.dogName)} / ${escapeHtml(sample.panel)}</small>
      <div class="gene-row">
        ${sample.variants.map((variant) => `<span class="gene-chip">${escapeHtml(variant)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderClinicalModule(selectedId = state.samples[0]?.sampleId) {
  const selected = state.samples.find((sample) => sample.sampleId === selectedId) || state.samples[0];
  byId("clinical-sample-list").innerHTML = state.samples.map((sample) => {
    const clinical = sample.clinical || emptyClinical();
    const examCount = clinical.exams?.length || 0;
    const treatmentCount = clinical.treatments?.length || 0;
    return `
      <button class="clinical-sample ${sample.sampleId === selected?.sampleId ? "active" : ""}" data-clinical="${escapeHtml(sample.sampleId)}">
        <b>${escapeHtml(sample.sampleId)}</b>
        <span>${escapeHtml(sample.dogName)} · ${escapeHtml(sample.tumorType)}</span>
        <small>${examCount} 项检查 / ${treatmentCount} 条治疗</small>
      </button>
    `;
  }).join("");

  if (!selected) {
    byId("clinical-detail-title").textContent = "临床信息";
    byId("clinical-detail-source").textContent = "暂无样本";
    byId("clinical-detail-content").innerHTML = `<div class="empty-note">暂无临床信息</div>`;
    return;
  }

  const clinical = selected.clinical || emptyClinical();
  byId("clinical-detail-title").textContent = `${selected.sampleId} · ${selected.dogName}`;
  byId("clinical-detail-source").textContent = clinical.importedAt ? `后台导入 ${clinical.importedAt}` : "后台导入/待同步";
  byId("clinical-detail-content").innerHTML = `
    <div class="clinical-summary">
      <div><span>临床诊断</span><strong>${escapeHtml(clinical.diagnosis || selected.tumorType || "未填写")}</strong></div>
      <div><span>主诉</span><p>${escapeHtml(clinical.complaint || "未导入")}</p></div>
      <div><span>预后评估</span><p>${escapeHtml(clinical.prognosis || "未导入")}</p></div>
    </div>
    ${renderClinicalTimeline("检查记录", clinical.exams || [])}
    ${renderClinicalTimeline("治疗记录", clinical.treatments || [], "plan")}
    ${renderClinicalTimeline("随访/预后记录", clinical.followUp || [], "note")}
  `;
}

function renderClinicalTimeline(title, items, valueKey = "result") {
  return `
    <section class="clinical-section">
      <h3>${escapeHtml(title)}<span>${items.length}</span></h3>
      <div class="clinical-timeline">
        ${items.map((item) => `
          <article>
            <time>${escapeHtml(item.date || "未注明日期")}</time>
            <b>${escapeHtml(item.type || item.category || title)}</b>
            <p>${escapeHtml(item[valueKey] || item.result || item.plan || item.note || "")}</p>
          </article>
        `).join("") || `<div class="empty-note">暂无${escapeHtml(title)}</div>`}
      </div>
    </section>
  `;
}

function renderReports() {
  byId("report-lanes").innerHTML = reportLanes.map((lane) => {
    const items = state.samples.filter((s) => s.report === lane || (lane === "待审核" && s.status === "报告审核"));
    return `
      <div class="lane">
        <h3>${lane} · ${items.length}</h3>
        ${items.map((sample) => `
          <button class="report-card" data-report-review="${escapeHtml(sample.sampleId)}">
            <b>${escapeHtml(sample.sampleId)}</b>
            <small>${escapeHtml(sample.dogName)} · ${escapeHtml(sample.tumorType)}</small>
            <span>${escapeHtml(reportActionText(lane))}</span>
          </button>
        `).join("")}
      </div>
    `;
  }).join("");
}

function reportActionText(status) {
  const actions = {
    "未生成": "生成报告草稿",
    "待解读": "补充分子解读",
    "待审核": "审核并发布",
    "已发布": "同步回 LIMS",
    "已同步LIMS": "闭环完成"
  };
  return actions[status] || "查看报告";
}

function buildReportDraft(sample) {
  const clinical = sample.clinical || {};
  const keyVariants = sample.variants.length ? sample.variants : ["未检出明确可报告关键变异"];
  const actionable = sample.variants.filter((variant) => !/VUS|uncertain/i.test(variant));
  const conclusion = actionable.length
    ? `检出 ${actionable.length} 项具有潜在临床意义的肿瘤相关变异，建议结合病理诊断、分期、治疗史和随访计划综合解读。`
    : "本次检测未检出明确可报告的关键肿瘤相关变异，建议结合临床表现和病理结果持续随访。";
  const template = "新版报告模板-TArgos";

  return {
    template,
    workflow: "TArgos 肿瘤基因解读流程 2026.06",
    templateVersion: "2026.06",
    templateFile: "backend/samples/report_templates/新版报告模板-TArgos.docx",
    wordFile: `${sample.sampleId}_TArgos_report_draft.docx`,
    library: "肿瘤基因解读库（后台维护）",
    conclusion: sample.qc === "通过" ? conclusion : `样本质控状态为${sample.qc}，正式发布前需完成复核。${conclusion}`,
    clinicalSummary: [
      clinical.diagnosis && `临床诊断：${clinical.diagnosis}`,
      clinical.complaint && `主诉：${clinical.complaint}`,
      clinical.prognosis && `预后/随访：${clinical.prognosis}`
    ].filter(Boolean).join("；") || "暂无后台导入的临床摘要。",
    variants: keyVariants.map((variant) => ({
      name: variant,
      interpretation: `${variant} 已进入肿瘤基因解读库匹配流程，报告草稿将结合癌种、证据等级、犬种适用性和临床背景生成解读。`
    }))
  };
}

function downloadEditableWordReport() {
  const sampleId = byId("report-dialog").dataset.sampleId;
  if (!sampleId) return;
  const link = document.createElement("a");
  link.href = "./assets/templates/新版报告模板-TArgos.docx";
  link.download = `${sampleId}_新版报告模板-TArgos.docx`;
  link.click();
}

function openReportReview(sampleId) {
  const sample = state.samples.find((item) => item.sampleId === sampleId);
  if (!sample) return;
  const draft = buildReportDraft(sample);
  byId("report-review-title").textContent = `${sample.sampleId} · ${sample.dogName}`;
  byId("report-review-status").innerHTML = `<span class="badge ${badgeClass(sample.report)}">${escapeHtml(sample.report)}</span>`;
  byId("report-dialog").dataset.sampleId = sample.sampleId;
  byId("report-review-content").innerHTML = `
    <section class="review-section">
      <h3>报告来源</h3>
      <div class="review-grid">
        ${kv("模板", draft.template)}
        ${kv("解读流程", draft.workflow)}
        ${kv("模板版本", draft.templateVersion)}
        ${kv("模板文件", draft.templateFile)}
        ${kv("Word 草稿", draft.wordFile)}
        ${kv("解读库", draft.library)}
        ${kv("LIMS ID", sample.limsId || "-")}
        ${kv("检测项目", sample.panel)}
        ${kv("样本/部位", sample.site)}
        ${kv("流程状态", sample.status)}
        ${kv("质控状态", sample.qc)}
        ${kv("报告状态", sample.report)}
      </div>
    </section>
    <section class="review-section">
      <h3>自动报告结论</h3>
      <p>${escapeHtml(draft.conclusion)}</p>
    </section>
    <section class="review-section">
      <h3>临床摘要</h3>
      <p>${escapeHtml(draft.clinicalSummary)}</p>
    </section>
    <section class="review-section">
      <h3>变异解读库匹配</h3>
      <div class="interpretation-list">
        ${draft.variants.map((variant) => `
          <article>
            <b>${escapeHtml(variant.name)}</b>
            <p>${escapeHtml(variant.interpretation)}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="review-section">
      <h3>真实 Word 模板</h3>
      <div class="template-download-card">
        <div>
          <b>新版报告模板-TArgos.docx</b>
          <p>网页静态版不再用 HTML 仿造报告。正式部署时，后端会用这份真实 Word 模板填充 LIMS、临床、QC、变异和解读库字段，生成可审核修改的 .docx 报告。</p>
        </div>
        <a class="btn secondary" href="./assets/templates/新版报告模板-TArgos.docx" download="${escapeHtml(sample.sampleId)}_新版报告模板-TArgos.docx">下载真实模板</a>
      </div>
    </section>
    <section class="review-section">
      <h3>审核清单</h3>
      <div class="review-checklist">
        <label><input type="checkbox" checked /> LIMS 样本信息已核对</label>
        <label><input type="checkbox" checked /> QC 可报告性已确认</label>
        <label><input type="checkbox" ${sample.variants.length ? "checked" : ""} /> 关键变异已完成解读库匹配</label>
        <label><input type="checkbox" /> 审核人已确认报告结论和限制说明</label>
      </div>
    </section>
  `;
  byId("report-dialog").showModal();
}

function countBy(items, getter) {
  return items.reduce((acc, item) => {
    const key = getter(item) || "未填写";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function renderBarList(targetId, counts, limit = 6) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
  const max = Math.max(1, ...entries.map((entry) => entry[1]));
  byId(targetId).innerHTML = entries.map(([label, value]) => `
    <div class="bar-row">
      <div class="bar-meta"><span>${escapeHtml(label)}</span><b>${value}</b></div>
      <div class="bar-track"><span style="width:${Math.round((value / max) * 100)}%"></span></div>
    </div>
  `).join("") || `<div class="empty-note">暂无数据</div>`;
}

function renderSampleTrend() {
  const counts = countBy(state.samples, (sample) => sample.receivedDate || "未填写");
  const entries = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])).slice(-10);
  const max = Math.max(1, ...entries.map((entry) => entry[1]));
  byId("sample-trend").innerHTML = entries.map(([date, value]) => `
    <div class="trend-col" title="${escapeHtml(date)}: ${value}">
      <div class="trend-bar" style="height:${Math.max(12, Math.round((value / max) * 128))}px"></div>
      <span>${escapeHtml(date.slice(5))}</span>
    </div>
  `).join("") || `<div class="empty-note">暂无收样趋势</div>`;
}

function renderLimsSyncCard() {
  const limsCount = state.samples.filter((sample) => sample.source === "LIMS" || !sample.source).length;
  const manualCount = state.samples.length - limsCount;
  const latestDate = state.samples
    .map((sample) => sample.limsSyncedAt || sample.receivedDate)
    .filter(Boolean)
    .sort()
    .at(-1) || "未同步";
  byId("lims-sync-card").innerHTML = `
    <div class="sync-main">
      <strong>${limsCount}</strong>
      <span>LIMS 样本</span>
    </div>
    <div class="sync-grid">
      <div><b>${manualCount}</b><span>手动补录</span></div>
      <div><b>${escapeHtml(latestDate)}</b><span>最近同步/收样</span></div>
    </div>
    <button class="mini-command" id="mock-lims-sync" type="button">查看同步接口</button>
  `;
}

function renderQcOverview() {
  const counts = countBy(state.samples, (sample) => sample.qc);
  const total = Math.max(1, state.samples.length);
  const pass = counts["通过"] || 0;
  const review = counts["待复核"] || 0;
  const fail = counts["失败"] || 0;
  const passRate = Math.round((pass / total) * 100);
  byId("qc-overview").innerHTML = `
    <div class="donut" style="--pct:${passRate}">
      <strong>${passRate}%</strong>
      <span>通过率</span>
    </div>
    <div class="qc-legend">
      <span><i class="good-dot"></i>通过 ${pass}</span>
      <span><i class="warn-dot"></i>待复核 ${review}</span>
      <span><i class="bad-dot"></i>失败 ${fail}</span>
    </div>
  `;
}

function renderReportSummary() {
  const counts = countBy(state.samples, (sample) => sample.report);
  byId("report-summary").innerHTML = reportLanes.map((lane) => `
    <div class="report-stat">
      <span>${lane}</span>
      <strong>${counts[lane] || 0}</strong>
    </div>
  `).join("");
}

function renderGeneFrequency() {
  const genes = {};
  state.samples.forEach((sample) => {
    sample.variants.forEach((variant) => {
      const gene = variant.trim().split(/\s+/)[0] || "NA";
      genes[gene] = (genes[gene] || 0) + 1;
    });
  });
  const entries = Object.entries(genes).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const max = Math.max(1, ...entries.map((entry) => entry[1]));
  byId("gene-frequency").innerHTML = entries.map(([gene, value]) => `
    <div class="gene-meter">
      <span>${escapeHtml(gene)}</span>
      <div><i style="width:${Math.round((value / max) * 100)}%"></i></div>
      <b>${value}</b>
    </div>
  `).join("") || `<div class="empty-note">暂无变异数据</div>`;
}

function renderRiskList() {
  const items = [...state.samples]
    .filter((sample) => sample.qc !== "通过" || sample.report === "待审核" || sample.status === "报告审核")
    .sort((a, b) => riskScore(b) - riskScore(a));
  byId("risk-list").innerHTML = items.map((sample) => `
    <button class="risk-item" data-detail="${escapeHtml(sample.sampleId)}">
      <b>${escapeHtml(sample.sampleId)}</b>
      <span>${escapeHtml(sample.dogName)} · ${escapeHtml(sample.tumorType)}</span>
      <small>${escapeHtml(sample.status)} / ${escapeHtml(sample.qc)} / ${escapeHtml(sample.report)}</small>
    </button>
  `).join("") || `<div class="empty-note">当前没有高优先级异常</div>`;
}

function renderAnalysis() {
  renderSampleTrend();
  renderLimsSyncCard();
  renderBarList("tumor-distribution", countBy(state.samples, (sample) => sample.tumorType));
  renderBarList("panel-distribution", countBy(state.samples, (sample) => sample.panel));
  renderQcOverview();
  renderReportSummary();
  renderGeneFrequency();
  renderRiskList();
}

function renderAll() {
  renderMetrics();
  renderTumorFilter();
  renderPipeline();
  renderPriorityList();
  renderTable();
  renderVariants();
  renderClinicalModule();
  renderReports();
  renderAnalysis();
}

function openDetail(sampleId) {
  const sample = state.samples.find((item) => item.sampleId === sampleId);
  if (!sample) return;
  byId("detail-status").innerHTML = `<span class="badge ${badgeClass(sample.status)}">${escapeHtml(sample.status)}</span>`;
  byId("detail-title").textContent = `${sample.sampleId} · ${sample.dogName}`;
  byId("detail-content").innerHTML = `
    <section class="detail-section">
      <h3>犬只与送检</h3>
      ${kv("品种/年龄/性别", `${sample.breed} / ${sample.age} / ${sample.sex}`)}
      ${kv("主人/医院", sample.owner)}
      ${kv("收样日期", sample.receivedDate)}
    </section>
    <section class="detail-section">
      <h3>肿瘤与检测</h3>
      ${kv("癌种", sample.tumorType)}
      ${kv("取样部位", sample.site)}
      ${kv("检测项目", sample.panel)}
      ${kv("质控状态", sample.qc)}
    </section>
    <section class="detail-section">
      <h3>变异与报告</h3>
      ${kv("关键变异", sample.variants.join("; "))}
      ${kv("报告状态", sample.report)}
      ${kv("备注", sample.notes || "无")}
    </section>
  `;
  const panel = byId("detail-panel");
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
}

function kv(label, value) {
  return `<div class="kv"><span>${escapeHtml(label)}</span><span>${escapeHtml(value)}</span></div>`;
}

function setView(view) {
  document.querySelectorAll(".nav button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.querySelectorAll(".view").forEach((section) => section.classList.remove("active-view"));
  byId(`${view}-view`).classList.add("active-view");
  const titles = {
    dashboard: ["工作台", "追踪犬肿瘤基因检测从收样到报告发布的全过程。"],
    analysis: ["分析页", "汇总 LIMS 同步、样本构成、质控压力、报告队列和基因发现。"],
    samples: ["流程监控", "按样本、LIMS、批次、平台和分析状态监控质控、变异和报告流程。"],
    variants: ["变异结果", "快速查看每个样本的关键分子发现。"],
    clinical: ["临床信息", "展示后台导入的检查、治疗、预后和随访信息。"],
    reports: ["报告生成", "使用新版报告模板-TArgos.docx；LIMS 接入前可用 Excel 测试数据生成可编辑 Word 草稿。"]
  };
  byId("page-title").textContent = titles[view][0];
  byId("page-subtitle").textContent = titles[view][1];
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function bindEvents() {
  document.querySelector(".nav").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-view]");
    if (button) setView(button.dataset.view);
  });

  byId("global-search").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderTable();
  });

  [
    "filter-sample-id",
    "filter-lims-id",
    "filter-platform",
    "filter-batch",
    "filter-date",
    "filter-analysis-status",
    "filter-monitor-query",
    "filter-batch-query"
  ].forEach((id) => {
    const control = byId(id);
    if (control) control.addEventListener("input", renderTable);
    if (control) control.addEventListener("change", renderTable);
  });

  document.querySelector(".segmented").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-status]");
    if (!button) return;
    state.status = button.dataset.status;
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.toggle("active", item === button));
    renderTable();
  });

  byId("tumor-filter").addEventListener("change", (event) => {
    state.tumor = event.target.value;
    renderTable();
  });

  byId("run-monitor-search").addEventListener("click", renderTable);
  byId("reset-monitor-filter").addEventListener("click", () => {
    [
      "filter-sample-id",
      "filter-lims-id",
      "filter-platform",
      "filter-batch",
      "filter-date",
      "filter-analysis-status",
      "filter-monitor-query",
      "filter-batch-query",
      "tumor-filter"
    ].forEach((id) => {
      const control = byId(id);
      if (!control) return;
      control.value = control.tagName === "SELECT" ? "all" : "";
    });
    state.query = "";
    state.status = "all";
    state.tumor = "all";
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.toggle("active", item.dataset.status === "all"));
    renderTable();
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.closest("#mock-lims-sync")) {
      setView("analysis");
      alert("正式部署后可通过 POST /api/lims/sync/ 或 sync_lims_json 命令同步 LIMS 样本。");
      return;
    }
    const clinicalTarget = event.target.closest("[data-clinical]");
    if (clinicalTarget) {
      renderClinicalModule(clinicalTarget.dataset.clinical);
      return;
    }
    const reportTarget = event.target.closest("[data-report-review]");
    if (reportTarget) {
      openReportReview(reportTarget.dataset.reportReview);
      return;
    }
    const target = event.target.closest("[data-detail]");
    if (target) openDetail(target.dataset.detail);
  });

  byId("approve-report").addEventListener("click", () => {
    const sampleId = byId("report-dialog").dataset.sampleId;
    const sample = state.samples.find((item) => item.sampleId === sampleId);
    if (!sample) return;
    sample.report = "已发布";
    sample.status = "已发布";
    saveLocalSamples();
    byId("report-dialog").close();
    renderAll();
  });

  byId("return-report").addEventListener("click", () => {
    const sampleId = byId("report-dialog").dataset.sampleId;
    const sample = state.samples.find((item) => item.sampleId === sampleId);
    if (!sample) return;
    sample.report = "待解读";
    saveLocalSamples();
    byId("report-dialog").close();
    renderAll();
  });

  byId("download-word-report").addEventListener("click", downloadEditableWordReport);

  byId("close-detail").addEventListener("click", () => {
    const panel = byId("detail-panel");
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });

  byId("open-sample-form").addEventListener("click", () => {
    byId("sample-form").reset();
    byId("sample-form").receivedDate.valueAsDate = new Date();
    byId("sample-dialog").showModal();
  });

  byId("save-sample").addEventListener("click", (event) => {
    event.preventDefault();
    const form = byId("sample-form");
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const sample = {
      ...data,
      report: data.status === "已发布" ? "已发布" : data.status === "报告审核" ? "待审核" : "未生成",
      variants: data.variants.split(/[;；,，]/).map((item) => item.trim()).filter(Boolean)
    };
    state.samples = [sample, ...state.samples.filter((item) => item.sampleId !== sample.sampleId)];
    saveLocalSamples();
    byId("sample-dialog").close();
    renderAll();
    createSampleOnApi(sample);
  });

  byId("export-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state.samples, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `canis-oncotrack-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

bindEvents();
renderAll();
loadFromApi();
