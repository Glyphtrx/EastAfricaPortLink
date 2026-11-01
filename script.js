/* ---------- Cargo tracking ---------- */

const shipments = {
    "EAPL1234567": { status: "In Transit", location: "Nairobi, Kenya" },
    "EAPL9876543": { status: "Awaiting Inspection", location: "Port of Mombasa, Kenya" },
    "EAPL1122334": { status: "Delivered", location: "Dar es Salaam, Tanzania" }
};

const form = document.getElementById("trackingform");
const input = document.getElementById("containerId");
const result = document.getElementById("trackingResult");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const id = input.value.trim().toUpperCase();
    const shipment = shipments[id];

    if (shipment) {
        result.innerHTML = `
            <div class="shipment-card">
                <p class="result-label">Container ID:</p>
                <h3 id="containerIdResult"></h3>
                <p class="result-label">Status:</p>
                <p id="statusResult"></p>
                <p class="result-label">Location:</p>
                <p id="locationResult"></p>
            </div>`;

        document.getElementById("containerIdResult").textContent = id;
        document.getElementById("statusResult").textContent = shipment.status;
        document.getElementById("locationResult").textContent = shipment.location;
        const card = result.querySelector(".shipment-card");
        const histLabel = document.createElement("p");
        histLabel.className = "result-label";
        histLabel.textContent = "Inspection history:";
        const histList = document.createElement("ul");
        histList.className = "track-insp";

        const records = inspections
        .filter(r => r.container === id)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

        if (records.length) {
            records.forEach(function(r) {
                const li = document.createElement("li");
                li.textContent = formatDate(r.date) + " . " + r.status + r.location;
                histList.appendChild(li);
            });

            card.append(histLabel, histlist);
        }
    } else {
        result.innerHTML = '<div id="trackingError"></div>';
        document.getElementById("trackingError").textContent =
            "No shipment found for " + id + ". This demo only knows: " +
            Object.keys(shipments).join(", ") + ".";
    }
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* ---------- Inspection records (browser memory only) ---------- */

const inspections = [
    { container: "EAPL1234567", location: "Port of Mombasa", date: "2026-10-13T09:40",
      status: "Passed", condition: "Good", quantity: "480 bags, grade A",
      officer: "John Doe", notes: "No issues found during inspection." },
    { container: "EAPL9876543", location: "Port of Mombasa", date: "2026-10-14T11:20",
      status: "Failed", condition: "Damaged", quantity: "500 bags, grade B",
      officer: "Jane Smith", notes: "Some bags were damaged during transit." },
    { container: "EAPL7654321", location: "Port of Mombasa", date: "2026-10-15T10:15",
      status: "Held for further checks", condition: "Good", quantity: "320 cartons",
      officer: "James Olatunji", notes: "Documents under review." }
];

const inspForm = document.getElementById("inspForm");
const timeline = document.getElementById("iTimeline");
const success = document.getElementById("iSuccess");

const rules = {
    iContainer: { ok: v => /^[A-Za-z0-9-]{6,15}$/.test(v), msg: "Enter 6 to 15 letters or numbers." },
    iLocation:  { ok: v => v !== "", msg: "Choose a location." },
    iDate:      { ok: v => v !== "", msg: "Enter the date and time." },
    iStatus:    { ok: v => v !== "", msg: "Choose a status." },
    iCondition: { ok: v => v !== "", msg: "Choose the cargo condition." },
    iQuantity:  { ok: v => v !== "", msg: "Enter the quantity and quality." },
    iOfficer:   { ok: v => v !== "", msg: "Enter the officer or agency." }
};

function formatDate(value) {
    const d = new Date(value);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
        ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function renderTimeline() {
    timeline.innerHTML = "";
    inspections
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .forEach(function (r) {
            const li = document.createElement("li");
            const when = document.createElement("span");
            when.className = "when";
            when.textContent = formatDate(r.date) + " · " + r.container;
            const title = document.createElement("strong");
            title.textContent = r.status + " · " + r.location;
            const detail = document.createElement("small");
            detail.textContent = "Condition: " + r.condition + " · " + r.quantity +
                " · By " + r.officer + (r.notes ? " · " + r.notes : "");
            li.append(when, title, detail);
            timeline.appendChild(li);
        });
}

inspForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstBad = null;

    Object.keys(rules).forEach(function (id) {
        const field_input = document.getElementById(id);
        const field = field_input.closest(".field");
        const ok = rules[id].ok(field_input.value.trim());
        field.classList.toggle("bad", !ok);
        field.querySelector(".err").textContent = ok ? "" : rules[id].msg;
        if (!ok && !firstBad) firstBad = field_input;
    });

    if (firstBad) { firstBad.focus(); return; }

    const record = {
        container: document.getElementById("iContainer").value.trim().toUpperCase(),
        location: document.getElementById("iLocation").value,
        date: document.getElementById("iDate").value,
        status: document.getElementById("iStatus").value,
        condition: document.getElementById("iCondition").value,
        quantity: document.getElementById("iQuantity").value.trim(),
        officer: document.getElementById("iOfficer").value.trim(),
        notes: document.getElementById("iNotes").value.trim()
    };

    inspections.push(record);
    renderTimeline();
    inspForm.reset();
    success.textContent = "Record saved for " + record.container + ". It is kept only in this browser tab.";
    success.hidden = false;
});

renderTimeline();
