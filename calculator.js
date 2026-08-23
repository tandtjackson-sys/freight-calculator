/*

=========================================================

FREIGHT CALCULATOR ENGINE

=========================================================



This file contains calculation logic only.



Carrier-specific rules live in carrier-rules.js.



=========================================================

*/





let packageCounter = 0;





/* ======================================================

   DOM HELPERS

====================================================== */



const $ = id =>

    document.getElementById(id);





/* ======================================================

   INITIALIZATION

====================================================== */



document.addEventListener("DOMContentLoaded", () => {



    populateCarriers();



    addPackage();



    updateServices();



    buildVerificationStatus();



    bindEvents();



    updateRuleDisplay();



});





/* ======================================================

   EVENT BINDING

====================================================== */



function bindEvents() {



    $("carrier")

        .addEventListener("change", () => {



            updateServices();



            updateRuleDisplay();



        });





    $("service")

        .addEventListener("change", updateRuleDisplay);





    $("unit")

        .addEventListener("change", updateRuleDisplay);





    $("rounding")

        .addEventListener("change", updateRuleDisplay);





    $("add-package")

        .addEventListener("click", () => {



            addPackage();



        });





    $("calculate-button")

        .addEventListener("click", calculate);





    $("compare-button")

        .addEventListener("click", compareServices);



}





/* ======================================================

   CARRIER SELECTOR

====================================================== */



function populateCarriers() {



    const select = $("carrier");



    select.innerHTML = "";



    Object.keys(CARRIER_RULES)

        .forEach(key => {



            const option =

                document.createElement("option");



            option.value = key;



            option.textContent =

                CARRIER_RULES[key].name;



            select.appendChild(option);



        });



}





/* ======================================================

   SERVICE SELECTOR

====================================================== */



function updateServices() {



    const carrier =

        $("carrier").value;



    const select =

        $("service");



    select.innerHTML = "";



    const services =

        CARRIER_RULES[carrier].services;



    Object.entries(services)

        .forEach(([key, rule]) => {



            if (rule.status !== "active")

                return;



            const option =

                document.createElement("option");



            option.value = key;



            option.textContent =

                rule.name;



            select.appendChild(option);



        });



}





/* ======================================================

   CURRENT RULE

====================================================== */



function getCurrentRule() {



    const carrier =

        $("carrier").value;



    const service =

        $("service").value;



    const rule =

        CARRIER_RULES[carrier]

            ?.services[service];



    return {

        carrier,

        service,

        rule

    };



}





/* ======================================================

   RULE DISPLAY

====================================================== */



function updateRuleDisplay() {



    const current =

        getCurrentRule();



    if (!current.rule)

        return;



    const rule =

        current.rule;



    const unit =

        $("unit").value;



    const divisor =

        unit === "imp"

            ? rule.imperialDivisor

            : rule.metricDivisor;



    $("rule-name").textContent =

        `${CARRIER_RULES[current.carrier].name} — ${rule.name}`;



    $("rule-description").textContent =

        rule.notes || "";



    $("rule-factor").textContent =

        `DIM factor: ${divisor}`;



    $("rule-effective").textContent =

        `Effective: ${rule.effectiveFrom}`;



    $("rule-verified").textContent =

        `Verified: ${rule.lastVerified}`;



}





/* ======================================================

   PACKAGE MANAGEMENT

====================================================== */



function addPackage() {



    packageCounter++;



    const row =

        document.createElement("div");



    row.className =

        "package-row";



    row.dataset.packageId =

        packageCounter;



    row.innerHTML = `



        <div class="package-row-header">



            <div class="package-title">

                Package ${packageCounter}

            </div>



            ${

                packageCounter > 1

                    ? `

                    <button

                        type="button"

                        class="remove-package"

                        data-remove-package="${packageCounter}"

                    >

                        Remove

                    </button>

                    `

                    : ""

            }



        </div>





        <div class="package-grid">



            <div class="input-group">



                <label>

                    Qty

                </label>



                <input

                    type="number"

                    class="package-qty"

                    value="1"

                    min="1"

                    step="1"

                >



            </div>





            <div class="input-group">



                <label>

                    Length

                </label>



                <input

                    type="number"

                    class="package-length"

                    min="0"

                    step="any"

                    value="0"

                >



            </div>





            <div class="input-group">



                <label>

                    Width

                </label>



                <input

                    type="number"

                    class="package-width"

                    min="0"

                    step="any"

                    value="0"

                >



            </div>





            <div class="input-group">



                <label>

                    Height

                </label>



                <input

                    type="number"

                    class="package-height"

                    min="0"

                    step="any"

                    value="0"

                >



            </div>





            <div class="input-group">



                <label>

                    Actual weight

                </label>



                <input

                    type="number"

                    class="package-weight"

                    min="0"

                    step="any"

                    value="0"

                >



            </div>



        </div>



    `;



    $("package-list")

        .appendChild(row);





    const removeButton =

        row.querySelector(

            "[data-remove-package]"

        );



    if (removeButton) {



        removeButton.addEventListener(

            "click",

            () => {



                row.remove();



                renumberPackages();



                updatePackageCount();

clearResults();

            }

        );



    }



    updatePackageCount();



}
function clearResults() {
    $("results-container").hidden = true;
    $("results-body").innerHTML = "";
}




function renumberPackages() {



    document

        .querySelectorAll(".package-row")

        .forEach((row, index) => {



            row.querySelector(".package-title")

                .textContent =

                `Package ${index + 1}`;



        });



}





function updatePackageCount() {



    const count =

        document.querySelectorAll(

            ".package-row"

        ).length;



    $("package-count")

        .textContent =

        `${count} ${count === 1 ? "package" : "packages"}`;



}





/* ======================================================

   READ PACKAGES

====================================================== */



function readPackages() {



    const packages = [];



    document

        .querySelectorAll(".package-row")

        .forEach((row, index) => {



            const qty =

                numberFrom(

                    row.querySelector(

                        ".package-qty"

                    )

                );



            const length =

                numberFrom(

                    row.querySelector(

                        ".package-length"

                    )

                );



            const width =

                numberFrom(

                    row.querySelector(

                        ".package-width"

                    )

                );



            const height =

                numberFrom(

                    row.querySelector(

                        ".package-height"

                    )

                );



            const weight =

                numberFrom(

                    row.querySelector(

                        ".package-weight"

                    )

                );



            packages.push({

                number:index + 1,

                qty,

                length,

                width,

                height,

                weight

            });



        });



    return packages;



}





function numberFrom(element) {



    return parseFloat(element.value) || 0;



}





/* ======================================================

   ROUNDING

====================================================== */



function applyDimensionRounding(

    value,

    requested,

    carrierRule

) {



    let mode = requested;



    if (requested === "rule") {



        mode =

            carrierRule.dimensionRounding;



    }



    if (

        mode === "up"

    ) {

        return Math.ceil(value);

    }



    if (

        mode === "nearest"

    ) {

        return Math.round(value);

    }



    /*

    "carrier" means retain the entered dimension.

    The actual carrier-specific rule may be more

    nuanced and can be added later.

    */



    return value;



}





/* ======================================================

   CALCULATE ONE PACKAGE

====================================================== */



function calculatePackage(

    pkg,

    rule,

    unit,

    rounding

) {



    let length =

        applyDimensionRounding(

            pkg.length,

            rounding,

            rule

        );



    let width =

        applyDimensionRounding(

            pkg.width,

            rounding,

            rule

        );



    let height =

        applyDimensionRounding(

            pkg.height,

            rounding,

            rule

        );





    const volume =

        length *

        width *

        height;





    const divisor =

        unit === "imp"

            ? rule.imperialDivisor

            : rule.metricDivisor;





    let dimWeight =

        volume / divisor;





    /*

    DIM weight fractions are rounded up

    for this calculator's planning output.

    */



    dimWeight =

        Math.ceil(dimWeight);





    const billable =

        Math.max(

            pkg.weight,

            dimWeight

        );





    let cubicFeet;



    if (unit === "imp") {



        cubicFeet =

            volume / 1728;



    } else {



        cubicFeet =

            volume *

            0.0000353147;



    }





    return {



        ...pkg,



        length,

        width,

        height,

        volume,

        dimWeight,

        billable,

        cubicFeet



    };



}





/* ======================================================

   MAIN CALCULATION

====================================================== */



function calculate() {



    const current =

        getCurrentRule();



    if (!current.rule)

        return;





    const packages =

        readPackages();





    const unit =

        $("unit").value;



    const rounding =

        $("rounding").value;





    const invalid =

        packages.some(pkg =>

            pkg.qty <= 0 ||

            pkg.length <= 0 ||

            pkg.width <= 0 ||

            pkg.height <= 0 ||

            pkg.weight <= 0

        );





    if (invalid) {



        alert(

            "Please enter valid dimensions and actual weight for every package."

        );



        return;



    }





    const results =

        packages.map(pkg =>

            calculatePackage(

                pkg,

                current.rule,

                unit,

                rounding

            )

        );





    renderResults(

        results,

        current,

        unit

    );



}





/* ======================================================

   RENDER RESULTS

====================================================== */



function renderResults(

    results,

    current,

    unit

) {



    let totalActual = 0;

    let totalDim = 0;

    let totalBillable = 0;

    let totalVolume = 0;





    let html = "";





    results.forEach(result => {



        const quantity =

            result.qty;





        totalActual +=

            result.weight *

            quantity;





        totalDim +=

            result.dimWeight *

            quantity;





        totalBillable +=

            result.billable *

            quantity;





        totalVolume +=

            result.cubicFeet *

            quantity;





        const weightUnit =

            unit === "imp"

                ? "lb"

                : "kg";





        html += `



            <tr>



                <td>

                    <strong>

                        ${quantity} × Package ${result.number}

                    </strong>

                </td>



                <td>

                    ${formatNumber(result.weight)}

                    ${weightUnit}

                </td>



                <td>

                    ${formatNumber(result.dimWeight)}

                    ${weightUnit}

                </td>



                <td>

                    <span class="billable">

                        ${formatNumber(result.billable)}

                        ${weightUnit}

                    </span>

                </td>



                <td>

                    ${result.cubicFeet.toFixed(2)}

                    ft³

                </td>



            </tr>



        `;



    });





    $("results-body")

        .innerHTML = html;





    $("total-actual")

        .textContent =

        `${formatNumber(totalActual)} ${

            unit === "imp" ? "lb" : "kg"

        }`;





    $("total-dim")

        .textContent =

        `${formatNumber(totalDim)} ${

            unit === "imp" ? "lb" : "kg"

        }`;





    $("total-billable")

        .textContent =

        `${formatNumber(totalBillable)} ${

            unit === "imp" ? "lb" : "kg"

        }`;





    $("total-volume")

        .textContent =

        `${totalVolume.toFixed(2)} ft³`;





    /*

    Density is always calculated in lb/ft³.

    */



    const actualPounds =

        unit === "imp"

            ? totalActual

            : totalActual * 2.20462;





    const density =

        totalVolume > 0

            ? actualPounds / totalVolume

            : 0;





    $("density-num-val")

        .textContent =

        `${density.toFixed(2)} lb/ft³`;





    $("freight-class-val")

        .textContent =

        `Class ${calculateFreightClass(density)}`;





    $("results-subtitle")

        .textContent =

        `${CARRIER_RULES[current.carrier].name} • ${current.rule.name}`;





    renderRuleAudit(

        current,

        unit

    );





    $("results-container")

        .hidden = false;





    $("results-container")

        .scrollIntoView({

            behavior:"smooth",

            block:"start"

        });



}





/* ======================================================

   RULE AUDIT

====================================================== */



function renderRuleAudit(

    current,

    unit

) {



    const rule =

        current.rule;





    const divisor =

        unit === "imp"

            ? rule.imperialDivisor

            : rule.metricDivisor;





    $("detail-carrier")

        .textContent =

        CARRIER_RULES[current.carrier].name;





    $("detail-service")

        .textContent =

        rule.name;





    $("detail-divisor")

        .textContent =

        `${divisor} ${

            unit === "imp"

                ? "in³/lb"

                : "cm³/kg"

        }`;





    $("detail-effective")

        .textContent =

        rule.effectiveFrom;





    $("detail-verified")

        .textContent =

        rule.lastVerified;





    $("detail-source")

        .textContent =

        rule.sourceName;



}





/* ======================================================

   COMPARE SERVICES

====================================================== */



function compareServices() {



    const packages =

        readPackages();





    const invalid =

        packages.some(pkg =>

            pkg.qty <= 0 ||

            pkg.length <= 0 ||

            pkg.width <= 0 ||

            pkg.height <= 0 ||

            pkg.weight <= 0

        );





    if (invalid) {



        alert(

            "Enter valid shipment dimensions and weight before comparing services."

        );



        return;



    }





    const unit =

        $("unit").value;





    const comparisonRows = [];





    Object.entries(CARRIER_RULES)

        .forEach(([carrierKey, carrier]) => {



            Object.entries(carrier.services)

                .forEach(([serviceKey, rule]) => {



                    if (rule.status !== "active")

                        return;





                    let totalDim = 0;

                    let totalBillable = 0;





                    packages.forEach(pkg => {



                        const result =

                            calculatePackage(

                                pkg,

                                rule,

                                unit,

                                "rule"

                            );





                        totalDim +=

                            result.dimWeight *

                            pkg.qty;





                        totalBillable +=

                            result.billable *

                            pkg.qty;



                    });





                    const divisor =

                        unit === "imp"

                            ? rule.imperialDivisor

                            : rule.metricDivisor;





                    comparisonRows.push({



                        carrier:

                            carrier.name,



                        service:

                            rule.name,



                        divisor,



                        dim:

                            totalDim,



                        billable:

                            totalBillable



                    });



                });



        });





    comparisonRows.sort(

        (a,b) =>

            a.billable -

            b.billable

    );





    let html = "";





    comparisonRows.forEach(row => {



        const unitLabel =

            unit === "imp"

                ? "lb"

                : "kg";





        html += `



            <tr>



                <td>

                    <strong>

                        ${row.carrier}

                    </strong>

                </td>



                <td>

                    ${row.service}

                </td>



                <td>

                    ${row.divisor}

                </td>



                <td>

                    ${formatNumber(row.dim)}

                    ${unitLabel}

                </td>



                <td>

                    <span class="billable">

                        ${formatNumber(row.billable)}

                        ${unitLabel}

                    </span>

                </td>



            </tr>



        `;



    });





    $("comparison-body")

        .innerHTML = html;





    $("comparison-container")

        .hidden = false;



}





/* ======================================================

   VERIFICATION STATUS

====================================================== */



function buildVerificationStatus() {



    const container =

        $("status-list");



    container.innerHTML = "";





    Object.entries(CARRIER_RULES)

        .filter(([key]) =>

            key !== "general"

        )

        .forEach(([key, carrier]) => {



            const rules =

                Object.values(

                    carrier.services

                );





            const dates =

                rules

                    .map(rule =>

                        rule.lastVerified

                    )

                    .sort()

                    .reverse();





            const latest =

                dates[0] || "—";





            const activeCount =

                rules.filter(

                    rule =>

                        rule.status === "active"

                ).length;





            const div =

                document.createElement("div");





            div.className =

                "status-item";





            div.innerHTML = `



                <div class="status-name">

                    ${carrier.name}

                </div>



                <div class="status-state">

                    ● ${activeCount} active rule${

                        activeCount === 1

                            ? ""

                            : "s"

                    }

                </div>



                <div class="status-date">

                    Last verified: ${latest}

                </div>



            `;





            container.appendChild(div);



        });



}





/* ======================================================

   FREIGHT CLASS ESTIMATE

====================================================== */



function calculateFreightClass(
    density
) {
    if (density < 1)
        return "400";

    if (density < 2)
        return "300";

    if (density < 4)
        return "250";

    if (density < 6)
        return "175";

    if (density < 8)
        return "125";

    if (density < 10)
        return "100";

    if (density < 12)
        return "92.5";

    if (density < 15)
        return "85";

    if (density < 22.5)
        return "70";

    if (density < 30)
        return "65";

    if (density < 35)
        return "60";

    if (density < 50)
        return "55";

    return "50";
}





/* ======================================================

   FORMATTING

====================================================== */



function formatNumber(value) {



    if (

        Number.isInteger(value)

    ) {

        return value.toString();

    }





    return value.toFixed(2);



}


