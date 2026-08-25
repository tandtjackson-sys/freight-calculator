/*
=========================================================
CALCULATOR ENGINE (UPDATED FOR CARRIER RULES & NMFC CLASSES)
=========================================================
*/

let packageCount = 0;
let lastCalculatedResults = null;

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    populateCarriers();
    addPackageRow();
    renderCarrierStatus();
    
    const carrierSelect = document.getElementById("carrier-select");
    const serviceSelect = document.getElementById("service-select");
    const unitSelect = document.getElementById("unit-select");

    if (carrierSelect) carrierSelect.addEventListener("change", onCarrierChange);
    if (serviceSelect) serviceSelect.addEventListener("change", updateRuleInfo);
    if (unitSelect) unitSelect.addEventListener("change", updateRuleInfo);
}

function populateCarriers() {
    const carrierSelect = document.getElementById("carrier-select");
    if (!carrierSelect) return;

    carrierSelect.innerHTML = "";
    Object.keys(CARRIER_RULES).forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = CARRIER_RULES[key].name;
        carrierSelect.appendChild(option);
    });

    onCarrierChange();
}

function onCarrierChange() {
    const carrierSelect = document.getElementById("carrier-select");
    const serviceSelect = document.getElementById("service-select");
    if (!carrierSelect || !serviceSelect) return;

    const carrierKey = carrierSelect.value;
    const carrierData = CARRIER_RULES[carrierKey];
    const services = carrierData.services;

    serviceSelect.innerHTML = "";
    Object.keys(services).forEach(sKey => {
        const option = document.createElement("option");
        option.value = sKey;
        option.textContent = services[sKey].name;
        serviceSelect.appendChild(option);
    });

    // Update dynamic footer link banner automatically
    const dynamicFooter = document.getElementById("dynamic-carrier-footer");
    if (dynamicFooter) {
        const pageMap = {
            'ups': 'ups-dim-calculator.html',
            'fedex': 'fedex-dim-calculator.html',
            'usps': 'usps-dim-calculator.html',
            'dhl': 'dhl-dim-calculator.html'
        };
        const pageUrl = pageMap[carrierKey] || 'index.html';
        dynamicFooter.innerHTML = `Currently calculating rules for <strong>${carrierData.name}</strong>. Learn more on our dedicated <a href="${pageUrl}" style="color: #2b6cb0; text-decoration: underline;">${carrierData.name} DIM Guide & Page</a>.`;
    }

    updateRuleInfo();
}

function updateRuleInfo() {
    const carrierKey = document.getElementById("carrier-select").value;
    const serviceKey = document.getElementById("service-select").value;
    const unit = document.getElementById("unit-select").value;
    const infoBox = document.getElementById("rule-info");

    const rule = CARRIER_RULES[carrierKey].services[serviceKey];
    const divisor = unit === "imperial" ? rule.imperialDivisor : rule.metricDivisor;
    const unitLabel = unit === "imperial" ? "cu in / lb" : "cu cm / kg";

    infoBox.innerHTML = `
        <strong>${CARRIER_RULES[carrierKey].name} &mdash; ${rule.name}</strong><br>
        <span style="font-size: 0.85rem; color: #4a5568;">${rule.notes}</span><br>
        <span style="font-size: 0.8rem; color: #718096;">DIM factor: ${divisor} ${unitLabel} | Effective: ${rule.effectiveFrom} | Verified: ${rule.lastVerified}</span>
    `;
}

function addPackageRow(presetData = null) {
    packageCount++;
    const container = document.getElementById("package-rows");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "package-row";
    row.id = `package-row-${packageCount}`;

    row.innerHTML = `
        <div class="package-row-header">
            <strong>Package ${packageCount}</strong>
            ${packageCount > 1 ? `<button type="button" class="remove-package" onclick="removePackageRow(${packageCount})">&times; Remove</button>` : ''}
        </div>
        <div class="form-grid-5">
            <div class="form-group">
                <label>Qty</label>
                <input type="number" id="qty-${packageCount}" value="${presetData ? presetData.qty : 1}" min="1" onfocus="this.select()">
            </div>
            <div class="form-group">
                <label>Length</label>
                <input type="number" id="l-${packageCount}" value="${presetData ? presetData.l : 0}" step="0.1" min="0" onfocus="this.select()">
            </div>
            <div class="form-group">
                <label>Width</label>
                <input type="number" id="w-${packageCount}" value="${presetData ? presetData.w : 0}" step="0.1" min="0" onfocus="this.select()">
            </div>
            <div class="form-group">
                <label>Height</label>
                <input type="number" id="h-${packageCount}" value="${presetData ? presetData.h : 0}" step="0.1" min="0" onfocus="this.select()">
            </div>
            <div class="form-group">
                <label>Actual weight</label>
                <input type="number" id="wt-${packageCount}" value="${presetData ? presetData.wt : 0}" step="0.1" min="0" onfocus="this.select()">
            </div>
        </div>
    `;

    container.appendChild(row);
}

function removePackageRow(id) {
    const row = document.getElementById(`package-row-${id}`);
    if (row) row.remove();
}

function calculate() {
    const carrierKey = document.getElementById("carrier-select").value;
    const serviceKey = document.getElementById("service-select").value;
    const unit = document.getElementById("unit-select").value;
    const roundingRule = document.getElementById("rounding-select").value;

    const rule = CARRIER_RULES[carrierKey].services[serviceKey];
    const divisor = unit === "imperial" ? rule.imperialDivisor : rule.metricDivisor;

    let totalActualWeight = 0;
    let totalDimWeight = 0;
    let packageResults = [];

    const rows = document.querySelectorAll(".package-row");
    
    rows.forEach((row, index) => {
        const id = row.id.split("-")[2];
        const qty = parseFloat(document.getElementById(`qty-${id}`).value) || 0;
        let l = parseFloat(document.getElementById(`l-${id}`).value) || 0;
        let w = parseFloat(document.getElementById(`w-${id}`).value) || 0;
        let h = parseFloat(document.getElementById(`h-${id}`).value) || 0;
        const wt = parseFloat(document.getElementById(`wt-${id}`).value) || 0;

        if (roundingRule === "up" || (roundingRule === "carrier" && rule.dimensionRounding === "up")) {
            l = Math.ceil(l);
            w = Math.ceil(w);
            h = Math.ceil(h);
        } else if (roundingRule === "carrier" && rule.dimensionRounding === "nearest") {
            l = Math.round(l);
            w = Math.round(w);
            h = Math.round(h);
        }

        const volume = l * w * h;
        let singleDimWeight = 0;

        if (carrierKey === "usps" && unit === "imperial") {
            if (volume > 1728) {
                singleDimWeight = volume / divisor;
            } else {
                singleDimWeight = 0;
            }
        } else {
            singleDimWeight = volume / divisor;
        }

        const lineActualWt = wt * qty;
        const lineDimWt = singleDimWeight * qty;

        totalActualWeight += lineActualWt;
        totalDimWeight += lineDimWt;

        let density = 0;
        let freightClass = "N/A";
        if (volume > 0) {
            const cubicFeet = (volume / 1728);
            density = wt / cubicFeet;
            freightClass = getFreightClass(density);
        }

        packageResults.push({
            num: index + 1,
            qty,
            dims: `${l} x ${w} x ${h}`,
            volume: volume.toFixed(1),
            actualWt: lineActualWt.toFixed(1),
            dimWt: lineDimWt.toFixed(2),
            density: density > 0 ? density.toFixed(2) : "N/A",
            freightClass
        });
    });

    const billableWeight = Math.ceil(Math.max(totalActualWeight, totalDimWeight));
    lastCalculatedResults = { packageResults, totalActualWeight, totalDimWeight, billableWeight, rule };

    displayResults();
}

function getFreightClass(density) {
    if (density <= 0 || isNaN(density)) return "N/A";
    
    if (density < 1)    return "500";
    if (density < 2)    return "400";
    if (density < 3)    return "300";
    if (density < 4)    return "250";
    if (density < 5)    return "200";
    if (density < 6)    return "175";
    if (density < 7)    return "150";
    if (density < 8)    return "125";
    if (density < 9)    return "110";
    if (density < 10.5) return "100";
    if (density < 12)   return "92.5";
    if (density < 15)   return "85";
    if (density < 22.5) return "70";
    if (density < 30)   return "65";
    if (density < 35)   return "60";
    if (density < 50)   return "55";
    return "50";
}

function displayResults() {
    const resultsCard = document.getElementById("results-card");
    const summaryBanner = document.getElementById("summary-banner");
    const tbody = document.querySelector("#results-table tbody");

    resultsCard.style.display = "block";
    tbody.innerHTML = "";

    const { totalActualWeight, totalDimWeight, billableWeight, packageResults } = lastCalculatedResults;

    const isDimBilled = totalDimWeight > totalActualWeight;
    summaryBanner.className = `summary-banner ${isDimBilled ? "warning" : "success"}`;
    summaryBanner.innerHTML = `
        <h3>Billable Weight: <strong>${Math.ceil(billableWeight)} lbs</strong></h3>
        <p>${isDimBilled ? "Dimensional weight exceeds actual weight. You will be billed on DIM weight." : "Actual weight exceeds dimensional weight. You will be billed on actual weight."}</p>
    `;

    packageResults.forEach(res => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${res.num}</td>
            <td>${res.qty}</td>
            <td>${res.dims}</td>
            <td>${res.volume}</td>
            <td>${res.actualWt}</td>
            <td>${res.dimWt}</td>
            <td>${res.density}</td>
            <td>${res.freightClass}</td>
        `;
        tbody.appendChild(tr);
    });

    resultsCard.scrollIntoView({ behavior: "smooth" });
}

function compareServices() {
    calculate();
    const compSection = document.getElementById("comparison-section");
    const compTbody = document.querySelector("#comparison-table tbody");
    const unit = document.getElementById("unit-select").value;

    compSection.style.display = "block";
    compTbody.innerHTML = "";

    const rows = document.querySelectorAll(".package-row");
    let totalVol = 0;
    let totalActual = 0;

    rows.forEach(row => {
        const id = row.id.split("-")[2];
        const qty = parseFloat(document.getElementById(`qty-${id}`).value) || 0;
        let l = parseFloat(document.getElementById(`l-${id}`).value) || 0;
        let w = parseFloat(document.getElementById(`w-${id}`).value) || 0;
        let h = parseFloat(document.getElementById(`h-${id}`).value) || 0;
        const wt = parseFloat(document.getElementById(`wt-${id}`).value) || 0;

        l = Math.ceil(l);
        w = Math.ceil(w);
        h = Math.ceil(h);

        totalVol += (l * w * h) * qty;
        totalActual += wt * qty;
    });

    Object.keys(CARRIER_RULES).forEach(cKey => {
        const carrier = CARRIER_RULES[cKey];
        Object.keys(carrier.services).forEach(sKey => {
            const service = carrier.services[sKey];
            const divisor = unit === "imperial" ? service.imperialDivisor : service.metricDivisor;
            
            let dimWt = totalVol / divisor;
            if (cKey === "usps" && unit === "imperial" && totalVol <= 1728) {
                dimWt = 0;
            }

            const billable = Math.max(totalActual, dimWt);

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${carrier.name}</strong> - ${service.name}</td>
                <td>${divisor}</td>
                <td>${totalActual.toFixed(1)}</td>
                <td>${dimWt.toFixed(1)}</td>
                <td><strong>${Math.ceil(billable)}</strong></td>
            `;
            compTbody.appendChild(tr);
        });
    });
}

function renderCarrierStatus() {
    const statusList = document.getElementById("status-list");
    if (!statusList) return;

    statusList.innerHTML = "";
    Object.keys(CARRIER_RULES).forEach(key => {
        const carrier = CARRIER_RULES[key];
        const activeCount = Object.keys(carrier.services).length;
        
        const card = document.createElement("div");
        card.className = "status-item";
        card.innerHTML = `
            <strong>${carrier.name}</strong>
            <div style="font-size:0.8rem; color: #28a745;">&bull; ${activeCount} active ${activeCount === 1 ? 'rule' : 'rules'}</div>
            <div style="font-size:0.75rem; color: #6c757d;">Last verified: 2026-08-24</div>
        `;
        statusList.appendChild(card);
    });
}

function savePreset() {
    const rows = document.querySelectorAll(".package-row");
    const data = [];
    rows.forEach(row => {
        const id = row.id.split("-")[2];
        data.push({
            qty: document.getElementById(`qty-${id}`).value,
            l: document.getElementById(`l-${id}`).value,
            w: document.getElementById(`w-${id}`).value,
            h: document.getElementById(`h-${id}`).value,
            wt: document.getElementById(`wt-${id}`).value
        });
    });
    localStorage.setItem("dim_calculator_preset", JSON.stringify(data));
    alert("Preset saved to browser memory!");
}

function loadPreset() {
    const saved = localStorage.getItem("dim_calculator_preset");
    if (!saved) {
        alert("No saved preset found.");
        return;
    }
    const data = JSON.parse(saved);
    document.getElementById("package-rows").innerHTML = "";
    packageCount = 0;
    data.forEach(item => addPackageRow(item));
}

function exportCSV() {
    if (!lastCalculatedResults) return;
    let csv = "Package,Qty,Dimensions,Volume,Actual Weight,DIM Weight,Density,Freight Class\n";
    lastCalculatedResults.packageResults.forEach(r => {
        csv += `${r.num},${r.qty},"${r.dims}",${r.volume},${r.actualWt},${r.dimWt},${r.density},${r.freightClass}\n`;
    });
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `freight_calculation_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
}

function exportPDF() {
    window.print();
}
