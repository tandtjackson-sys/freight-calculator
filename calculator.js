/\*

=========================================================

FREIGHT CALCULATOR ENGINE

=========================================================



This file contains calculation logic only.



Carrier-specific rules live in carrier-rules.js.



=========================================================

\*/





let packageCounter = 0;





/\* ======================================================

&#x20;  DOM HELPERS

====================================================== \*/



const $ = id =>

&#x20;   document.getElementById(id);





/\* ======================================================

&#x20;  INITIALIZATION

====================================================== \*/



document.addEventListener("DOMContentLoaded", () => {



&#x20;   populateCarriers();



&#x20;   addPackage();



&#x20;   updateServices();



&#x20;   buildVerificationStatus();



&#x20;   bindEvents();



&#x20;   updateRuleDisplay();



});





/\* ======================================================

&#x20;  EVENT BINDING

====================================================== \*/



function bindEvents() {



&#x20;   $("carrier")

&#x20;       .addEventListener("change", () => {



&#x20;           updateServices();



&#x20;           updateRuleDisplay();



&#x20;       });





&#x20;   $("service")

&#x20;       .addEventListener("change", updateRuleDisplay);





&#x20;   $("unit")

&#x20;       .addEventListener("change", updateRuleDisplay);





&#x20;   $("rounding")

&#x20;       .addEventListener("change", updateRuleDisplay);





&#x20;   $("add-package")

&#x20;       .addEventListener("click", () => {



&#x20;           addPackage();



&#x20;       });





&#x20;   $("calculate-button")

&#x20;       .addEventListener("click", calculate);





&#x20;   $("compare-button")

&#x20;       .addEventListener("click", compareServices);



}





/\* ======================================================

&#x20;  CARRIER SELECTOR

====================================================== \*/



function populateCarriers() {



&#x20;   const select = $("carrier");



&#x20;   select.innerHTML = "";



&#x20;   Object.keys(CARRIER\_RULES)

&#x20;       .forEach(key => {



&#x20;           const option =

&#x20;               document.createElement("option");



&#x20;           option.value = key;



&#x20;           option.textContent =

&#x20;               CARRIER\_RULES\[key].name;



&#x20;           select.appendChild(option);



&#x20;       });



}





/\* ======================================================

&#x20;  SERVICE SELECTOR

====================================================== \*/



function updateServices() {



&#x20;   const carrier =

&#x20;       $("carrier").value;



&#x20;   const select =

&#x20;       $("service");



&#x20;   select.innerHTML = "";



&#x20;   const services =

&#x20;       CARRIER\_RULES\[carrier].services;



&#x20;   Object.entries(services)

&#x20;       .forEach((\[key, rule]) => {



&#x20;           if (rule.status !== "active")

&#x20;               return;



&#x20;           const option =

&#x20;               document.createElement("option");



&#x20;           option.value = key;



&#x20;           option.textContent =

&#x20;               rule.name;



&#x20;           select.appendChild(option);



&#x20;       });



}





/\* ======================================================

&#x20;  CURRENT RULE

====================================================== \*/



function getCurrentRule() {



&#x20;   const carrier =

&#x20;       $("carrier").value;



&#x20;   const service =

&#x20;       $("service").value;



&#x20;   const rule =

&#x20;       CARRIER\_RULES\[carrier]

&#x20;           ?.services\[service];



&#x20;   return {

&#x20;       carrier,

&#x20;       service,

&#x20;       rule

&#x20;   };



}





/\* ======================================================

&#x20;  RULE DISPLAY

====================================================== \*/



function updateRuleDisplay() {



&#x20;   const current =

&#x20;       getCurrentRule();



&#x20;   if (!current.rule)

&#x20;       return;



&#x20;   const rule =

&#x20;       current.rule;



&#x20;   const unit =

&#x20;       $("unit").value;



&#x20;   const divisor =

&#x20;       unit === "imp"

&#x20;           ? rule.imperialDivisor

&#x20;           : rule.metricDivisor;



&#x20;   $("rule-name").textContent =

&#x20;       `${CARRIER\_RULES\[current.carrier].name} — ${rule.name}`;



&#x20;   $("rule-description").textContent =

&#x20;       rule.notes || "";



&#x20;   $("rule-factor").textContent =

&#x20;       `DIM factor: ${divisor}`;



&#x20;   $("rule-effective").textContent =

&#x20;       `Effective: ${rule.effectiveFrom}`;



&#x20;   $("rule-verified").textContent =

&#x20;       `Verified: ${rule.lastVerified}`;



}





/\* ======================================================

&#x20;  PACKAGE MANAGEMENT

====================================================== \*/



function addPackage() {



&#x20;   packageCounter++;



&#x20;   const row =

&#x20;       document.createElement("div");



&#x20;   row.className =

&#x20;       "package-row";



&#x20;   row.dataset.packageId =

&#x20;       packageCounter;



&#x20;   row.innerHTML = `



&#x20;       <div class="package-row-header">



&#x20;           <div class="package-title">

&#x20;               Package ${packageCounter}

&#x20;           </div>



&#x20;           ${

&#x20;               packageCounter > 1

&#x20;                   ? `

&#x20;                   <button

&#x20;                       type="button"

&#x20;                       class="remove-package"

&#x20;                       data-remove-package="${packageCounter}"

&#x20;                   >

&#x20;                       Remove

&#x20;                   </button>

&#x20;                   `

&#x20;                   : ""

&#x20;           }



&#x20;       </div>





&#x20;       <div class="package-grid">



&#x20;           <div class="input-group">



&#x20;               <label>

&#x20;                   Qty

&#x20;               </label>



&#x20;               <input

&#x20;                   type="number"

&#x20;                   class="package-qty"

&#x20;                   value="1"

&#x20;                   min="1"

&#x20;                   step="1"

&#x20;               >



&#x20;           </div>





&#x20;           <div class="input-group">



&#x20;               <label>

&#x20;                   Length

&#x20;               </label>



&#x20;               <input

&#x20;                   type="number"

&#x20;                   class="package-length"

&#x20;                   min="0"

&#x20;                   step="any"

&#x20;                   placeholder="18"

&#x20;               >



&#x20;           </div>





&#x20;           <div class="input-group">



&#x20;               <label>

&#x20;                   Width

&#x20;               </label>



&#x20;               <input

&#x20;                   type="number"

&#x20;                   class="package-width"

&#x20;                   min="0"

&#x20;                   step="any"

&#x20;                   placeholder="14"

&#x20;               >



&#x20;           </div>





&#x20;           <div class="input-group">



&#x20;               <label>

&#x20;                   Height

&#x20;               </label>



&#x20;               <input

&#x20;                   type="number"

&#x20;                   class="package-height"

&#x20;                   min="0"

&#x20;                   step="any"

&#x20;                   placeholder="12"

&#x20;               >



&#x20;           </div>





&#x20;           <div class="input-group">



&#x20;               <label>

&#x20;                   Actual weight

&#x20;               </label>



&#x20;               <input

&#x20;                   type="number"

&#x20;                   class="package-weight"

&#x20;                   min="0"

&#x20;                   step="any"

&#x20;                   placeholder="15"

&#x20;               >



&#x20;           </div>



&#x20;       </div>



&#x20;   `;



&#x20;   $("package-list")

&#x20;       .appendChild(row);





&#x20;   const removeButton =

&#x20;       row.querySelector(

&#x20;           "\[data-remove-package]"

&#x20;       );



&#x20;   if (removeButton) {



&#x20;       removeButton.addEventListener(

&#x20;           "click",

&#x20;           () => {



&#x20;               row.remove();



&#x20;               renumberPackages();



&#x20;               updatePackageCount();



&#x20;           }

&#x20;       );



&#x20;   }



&#x20;   updatePackageCount();



}





function renumberPackages() {



&#x20;   document

&#x20;       .querySelectorAll(".package-row")

&#x20;       .forEach((row, index) => {



&#x20;           row.querySelector(".package-title")

&#x20;               .textContent =

&#x20;               `Package ${index + 1}`;



&#x20;       });



}





function updatePackageCount() {



&#x20;   const count =

&#x20;       document.querySelectorAll(

&#x20;           ".package-row"

&#x20;       ).length;



&#x20;   $("package-count")

&#x20;       .textContent =

&#x20;       `${count} ${count === 1 ? "package" : "packages"}`;



}





/\* ======================================================

&#x20;  READ PACKAGES

====================================================== \*/



function readPackages() {



&#x20;   const packages = \[];



&#x20;   document

&#x20;       .querySelectorAll(".package-row")

&#x20;       .forEach((row, index) => {



&#x20;           const qty =

&#x20;               numberFrom(

&#x20;                   row.querySelector(

&#x20;                       ".package-qty"

&#x20;                   )

&#x20;               );



&#x20;           const length =

&#x20;               numberFrom(

&#x20;                   row.querySelector(

&#x20;                       ".package-length"

&#x20;                   )

&#x20;               );



&#x20;           const width =

&#x20;               numberFrom(

&#x20;                   row.querySelector(

&#x20;                       ".package-width"

&#x20;                   )

&#x20;               );



&#x20;           const height =

&#x20;               numberFrom(

&#x20;                   row.querySelector(

&#x20;                       ".package-height"

&#x20;                   )

&#x20;               );



&#x20;           const weight =

&#x20;               numberFrom(

&#x20;                   row.querySelector(

&#x20;                       ".package-weight"

&#x20;                   )

&#x20;               );



&#x20;           packages.push({

&#x20;               number:index + 1,

&#x20;               qty,

&#x20;               length,

&#x20;               width,

&#x20;               height,

&#x20;               weight

&#x20;           });



&#x20;       });



&#x20;   return packages;



}





function numberFrom(element) {



&#x20;   return parseFloat(element.value) || 0;



}





/\* ======================================================

&#x20;  ROUNDING

====================================================== \*/



function applyDimensionRounding(

&#x20;   value,

&#x20;   requested,

&#x20;   carrierRule

) {



&#x20;   let mode = requested;



&#x20;   if (requested === "rule") {



&#x20;       mode =

&#x20;           carrierRule.dimensionRounding;



&#x20;   }



&#x20;   if (

&#x20;       mode === "up"

&#x20;   ) {

&#x20;       return Math.ceil(value);

&#x20;   }



&#x20;   if (

&#x20;       mode === "nearest"

&#x20;   ) {

&#x20;       return Math.round(value);

&#x20;   }



&#x20;   /\*

&#x20;   "carrier" means retain the entered dimension.

&#x20;   The actual carrier-specific rule may be more

&#x20;   nuanced and can be added later.

&#x20;   \*/



&#x20;   return value;



}





/\* ======================================================

&#x20;  CALCULATE ONE PACKAGE

====================================================== \*/



function calculatePackage(

&#x20;   pkg,

&#x20;   rule,

&#x20;   unit,

&#x20;   rounding

) {



&#x20;   let length =

&#x20;       applyDimensionRounding(

&#x20;           pkg.length,

&#x20;           rounding,

&#x20;           rule

&#x20;       );



&#x20;   let width =

&#x20;       applyDimensionRounding(

&#x20;           pkg.width,

&#x20;           rounding,

&#x20;           rule

&#x20;       );



&#x20;   let height =

&#x20;       applyDimensionRounding(

&#x20;           pkg.height,

&#x20;           rounding,

&#x20;           rule

&#x20;       );





&#x20;   const volume =

&#x20;       length \*

&#x20;       width \*

&#x20;       height;





&#x20;   const divisor =

&#x20;       unit === "imp"

&#x20;           ? rule.imperialDivisor

&#x20;           : rule.metricDivisor;





&#x20;   let dimWeight =

&#x20;       volume / divisor;





&#x20;   /\*

&#x20;   DIM weight fractions are rounded up

&#x20;   for this calculator's planning output.

&#x20;   \*/



&#x20;   dimWeight =

&#x20;       Math.ceil(dimWeight);





&#x20;   const billable =

&#x20;       Math.max(

&#x20;           pkg.weight,

&#x20;           dimWeight

&#x20;       );





&#x20;   let cubicFeet;



&#x20;   if (unit === "imp") {



&#x20;       cubicFeet =

&#x20;           volume / 1728;



&#x20;   } else {



&#x20;       cubicFeet =

&#x20;           volume \*

&#x20;           0.0000353147;



&#x20;   }





&#x20;   return {



&#x20;       ...pkg,



&#x20;       length,

&#x20;       width,

&#x20;       height,

&#x20;       volume,

&#x20;       dimWeight,

&#x20;       billable,

&#x20;       cubicFeet



&#x20;   };



}





/\* ======================================================

&#x20;  MAIN CALCULATION

====================================================== \*/



function calculate() {



&#x20;   const current =

&#x20;       getCurrentRule();



&#x20;   if (!current.rule)

&#x20;       return;





&#x20;   const packages =

&#x20;       readPackages();





&#x20;   const unit =

&#x20;       $("unit").value;



&#x20;   const rounding =

&#x20;       $("rounding").value;





&#x20;   const invalid =

&#x20;       packages.some(pkg =>

&#x20;           pkg.qty <= 0 ||

&#x20;           pkg.length <= 0 ||

&#x20;           pkg.width <= 0 ||

&#x20;           pkg.height <= 0 ||

&#x20;           pkg.weight <= 0

&#x20;       );





&#x20;   if (invalid) {



&#x20;       alert(

&#x20;           "Please enter valid dimensions and actual weight for every package."

&#x20;       );



&#x20;       return;



&#x20;   }





&#x20;   const results =

&#x20;       packages.map(pkg =>

&#x20;           calculatePackage(

&#x20;               pkg,

&#x20;               current.rule,

&#x20;               unit,

&#x20;               rounding

&#x20;           )

&#x20;       );





&#x20;   renderResults(

&#x20;       results,

&#x20;       current,

&#x20;       unit

&#x20;   );



}





/\* ======================================================

&#x20;  RENDER RESULTS

====================================================== \*/



function renderResults(

&#x20;   results,

&#x20;   current,

&#x20;   unit

) {



&#x20;   let totalActual = 0;

&#x20;   let totalDim = 0;

&#x20;   let totalBillable = 0;

&#x20;   let totalVolume = 0;





&#x20;   let html = "";





&#x20;   results.forEach(result => {



&#x20;       const quantity =

&#x20;           result.qty;





&#x20;       totalActual +=

&#x20;           result.weight \*

&#x20;           quantity;





&#x20;       totalDim +=

&#x20;           result.dimWeight \*

&#x20;           quantity;





&#x20;       totalBillable +=

&#x20;           result.billable \*

&#x20;           quantity;





&#x20;       totalVolume +=

&#x20;           result.cubicFeet \*

&#x20;           quantity;





&#x20;       const weightUnit =

&#x20;           unit === "imp"

&#x20;               ? "lb"

&#x20;               : "kg";





&#x20;       html += `



&#x20;           <tr>



&#x20;               <td>

&#x20;                   <strong>

&#x20;                       ${quantity} × Package ${result.number}

&#x20;                   </strong>

&#x20;               </td>



&#x20;               <td>

&#x20;                   ${formatNumber(result.weight)}

&#x20;                   ${weightUnit}

&#x20;               </td>



&#x20;               <td>

&#x20;                   ${formatNumber(result.dimWeight)}

&#x20;                   ${weightUnit}

&#x20;               </td>



&#x20;               <td>

&#x20;                   <span class="billable">

&#x20;                       ${formatNumber(result.billable)}

&#x20;                       ${weightUnit}

&#x20;                   </span>

&#x20;               </td>



&#x20;               <td>

&#x20;                   ${result.cubicFeet.toFixed(2)}

&#x20;                   ft³

&#x20;               </td>



&#x20;           </tr>



&#x20;       `;



&#x20;   });





&#x20;   $("results-body")

&#x20;       .innerHTML = html;





&#x20;   $("total-actual")

&#x20;       .textContent =

&#x20;       `${formatNumber(totalActual)} ${

&#x20;           unit === "imp" ? "lb" : "kg"

&#x20;       }`;





&#x20;   $("total-dim")

&#x20;       .textContent =

&#x20;       `${formatNumber(totalDim)} ${

&#x20;           unit === "imp" ? "lb" : "kg"

&#x20;       }`;





&#x20;   $("total-billable")

&#x20;       .textContent =

&#x20;       `${formatNumber(totalBillable)} ${

&#x20;           unit === "imp" ? "lb" : "kg"

&#x20;       }`;





&#x20;   $("total-volume")

&#x20;       .textContent =

&#x20;       `${totalVolume.toFixed(2)} ft³`;





&#x20;   /\*

&#x20;   Density is always calculated in lb/ft³.

&#x20;   \*/



&#x20;   const actualPounds =

&#x20;       unit === "imp"

&#x20;           ? totalActual

&#x20;           : totalActual \* 2.20462;





&#x20;   const density =

&#x20;       totalVolume > 0

&#x20;           ? actualPounds / totalVolume

&#x20;           : 0;





&#x20;   $("density-num-val")

&#x20;       .textContent =

&#x20;       `${density.toFixed(2)} lb/ft³`;





&#x20;   $("freight-class-val")

&#x20;       .textContent =

&#x20;       `Class ${calculateFreightClass(density)}`;





&#x20;   $("results-subtitle")

&#x20;       .textContent =

&#x20;       `${CARRIER\_RULES\[current.carrier].name} • ${current.rule.name}`;





&#x20;   renderRuleAudit(

&#x20;       current,

&#x20;       unit

&#x20;   );





&#x20;   $("results-container")

&#x20;       .hidden = false;





&#x20;   $("results-container")

&#x20;       .scrollIntoView({

&#x20;           behavior:"smooth",

&#x20;           block:"start"

&#x20;       });



}





/\* ======================================================

&#x20;  RULE AUDIT

====================================================== \*/



function renderRuleAudit(

&#x20;   current,

&#x20;   unit

) {



&#x20;   const rule =

&#x20;       current.rule;





&#x20;   const divisor =

&#x20;       unit === "imp"

&#x20;           ? rule.imperialDivisor

&#x20;           : rule.metricDivisor;





&#x20;   $("detail-carrier")

&#x20;       .textContent =

&#x20;       CARRIER\_RULES\[current.carrier].name;





&#x20;   $("detail-service")

&#x20;       .textContent =

&#x20;       rule.name;





&#x20;   $("detail-divisor")

&#x20;       .textContent =

&#x20;       `${divisor} ${

&#x20;           unit === "imp"

&#x20;               ? "in³/lb"

&#x20;               : "cm³/kg"

&#x20;       }`;





&#x20;   $("detail-effective")

&#x20;       .textContent =

&#x20;       rule.effectiveFrom;





&#x20;   $("detail-verified")

&#x20;       .textContent =

&#x20;       rule.lastVerified;





&#x20;   $("detail-source")

&#x20;       .textContent =

&#x20;       rule.sourceName;



}





/\* ======================================================

&#x20;  COMPARE SERVICES

====================================================== \*/



function compareServices() {



&#x20;   const packages =

&#x20;       readPackages();





&#x20;   const invalid =

&#x20;       packages.some(pkg =>

&#x20;           pkg.qty <= 0 ||

&#x20;           pkg.length <= 0 ||

&#x20;           pkg.width <= 0 ||

&#x20;           pkg.height <= 0 ||

&#x20;           pkg.weight <= 0

&#x20;       );





&#x20;   if (invalid) {



&#x20;       alert(

&#x20;           "Enter valid shipment dimensions and weight before comparing services."

&#x20;       );



&#x20;       return;



&#x20;   }





&#x20;   const unit =

&#x20;       $("unit").value;





&#x20;   const comparisonRows = \[];





&#x20;   Object.entries(CARRIER\_RULES)

&#x20;       .forEach((\[carrierKey, carrier]) => {



&#x20;           Object.entries(carrier.services)

&#x20;               .forEach((\[serviceKey, rule]) => {



&#x20;                   if (rule.status !== "active")

&#x20;                       return;





&#x20;                   let totalDim = 0;

&#x20;                   let totalBillable = 0;





&#x20;                   packages.forEach(pkg => {



&#x20;                       const result =

&#x20;                           calculatePackage(

&#x20;                               pkg,

&#x20;                               rule,

&#x20;                               unit,

&#x20;                               "rule"

&#x20;                           );





&#x20;                       totalDim +=

&#x20;                           result.dimWeight \*

&#x20;                           pkg.qty;





&#x20;                       totalBillable +=

&#x20;                           result.billable \*

&#x20;                           pkg.qty;



&#x20;                   });





&#x20;                   const divisor =

&#x20;                       unit === "imp"

&#x20;                           ? rule.imperialDivisor

&#x20;                           : rule.metricDivisor;





&#x20;                   comparisonRows.push({



&#x20;                       carrier:

&#x20;                           carrier.name,



&#x20;                       service:

&#x20;                           rule.name,



&#x20;                       divisor,



&#x20;                       dim:

&#x20;                           totalDim,



&#x20;                       billable:

&#x20;                           totalBillable



&#x20;                   });



&#x20;               });



&#x20;       });





&#x20;   comparisonRows.sort(

&#x20;       (a,b) =>

&#x20;           a.billable -

&#x20;           b.billable

&#x20;   );





&#x20;   let html = "";





&#x20;   comparisonRows.forEach(row => {



&#x20;       const unitLabel =

&#x20;           unit === "imp"

&#x20;               ? "lb"

&#x20;               : "kg";





&#x20;       html += `



&#x20;           <tr>



&#x20;               <td>

&#x20;                   <strong>

&#x20;                       ${row.carrier}

&#x20;                   </strong>

&#x20;               </td>



&#x20;               <td>

&#x20;                   ${row.service}

&#x20;               </td>



&#x20;               <td>

&#x20;                   ${row.divisor}

&#x20;               </td>



&#x20;               <td>

&#x20;                   ${formatNumber(row.dim)}

&#x20;                   ${unitLabel}

&#x20;               </td>



&#x20;               <td>

&#x20;                   <span class="billable">

&#x20;                       ${formatNumber(row.billable)}

&#x20;                       ${unitLabel}

&#x20;                   </span>

&#x20;               </td>



&#x20;           </tr>



&#x20;       `;



&#x20;   });





&#x20;   $("comparison-body")

&#x20;       .innerHTML = html;





&#x20;   $("comparison-container")

&#x20;       .hidden = false;



}





/\* ======================================================

&#x20;  VERIFICATION STATUS

====================================================== \*/



function buildVerificationStatus() {



&#x20;   const container =

&#x20;       $("status-list");



&#x20;   container.innerHTML = "";





&#x20;   Object.entries(CARRIER\_RULES)

&#x20;       .filter((\[key]) =>

&#x20;           key !== "general"

&#x20;       )

&#x20;       .forEach((\[key, carrier]) => {



&#x20;           const rules =

&#x20;               Object.values(

&#x20;                   carrier.services

&#x20;               );





&#x20;           const dates =

&#x20;               rules

&#x20;                   .map(rule =>

&#x20;                       rule.lastVerified

&#x20;                   )

&#x20;                   .sort()

&#x20;                   .reverse();





&#x20;           const latest =

&#x20;               dates\[0] || "—";





&#x20;           const activeCount =

&#x20;               rules.filter(

&#x20;                   rule =>

&#x20;                       rule.status === "active"

&#x20;               ).length;





&#x20;           const div =

&#x20;               document.createElement("div");





&#x20;           div.className =

&#x20;               "status-item";





&#x20;           div.innerHTML = `



&#x20;               <div class="status-name">

&#x20;                   ${carrier.name}

&#x20;               </div>



&#x20;               <div class="status-state">

&#x20;                   ● ${activeCount} active rule${

&#x20;                       activeCount === 1

&#x20;                           ? ""

&#x20;                           : "s"

&#x20;                   }

&#x20;               </div>



&#x20;               <div class="status-date">

&#x20;                   Last verified: ${latest}

&#x20;               </div>



&#x20;           `;





&#x20;           container.appendChild(div);



&#x20;       });



}





/\* ======================================================

&#x20;  FREIGHT CLASS ESTIMATE

====================================================== \*/



function calculateFreightClass(

&#x20;   density

) {



&#x20;   if (density < 1)

&#x20;       return "500";



&#x20;   if (density < 2)

&#x20;       return "400";



&#x20;   if (density < 4)

&#x20;       return "250";



&#x20;   if (density < 6)

&#x20;       return "175";



&#x20;   if (density < 8)

&#x20;       return "125";



&#x20;   if (density < 10)

&#x20;       return "100";



&#x20;   if (density < 12)

&#x20;       return "92.5";



&#x20;   if (density < 15)

&#x20;       return "85";



&#x20;   if (density < 22.5)

&#x20;       return "70";



&#x20;   if (density < 30)

&#x20;       return "60";



&#x20;   return "50";



}





/\* ======================================================

&#x20;  FORMATTING

====================================================== \*/



function formatNumber(value) {



&#x20;   if (

&#x20;       Number.isInteger(value)

&#x20;   ) {

&#x20;       return value.toString();

&#x20;   }





&#x20;   return value.toFixed(2);



}

