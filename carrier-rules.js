/*

=========================================================

CARRIER RULE DATABASE

=========================================================



IMPORTANT:



This file contains calculation rules only.



The calculator engine does NOT contain carrier-specific

divisors. That separation is intentional.



Eventually this data can be moved into an API/database

and updated through the automated monitoring + approval

system.



STATUS VALUES:



active

pending

unverified

retired



Never activate an unverified rule.



=========================================================

*\



const CARRIER_RULES = {





&#x20;   /\* ===================================================

&#x20;      GENERAL

&#x20;   =================================================== \*/



&#x20;   general: {



&#x20;       name: "General",



&#x20;       services: {



&#x20;           standard: {



&#x20;               name: "Standard DIM",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "carrier",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "General",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName: "General industry reference",



&#x20;               sourceUrl: null,



&#x20;               notes:

&#x20;                   "Use only when a specific carrier/service rule is not selected."



&#x20;           }



&#x20;       }



&#x20;   },





&#x20;   /\* ===================================================

&#x20;      UPS

&#x20;   =================================================== \*/



&#x20;   ups: {



&#x20;       name: "UPS",



&#x20;       services: {





&#x20;           daily: {



&#x20;               name: "Daily Rates",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "nearest",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "UPS Package Dimensions, Size Limits and Weight Guide",



&#x20;               sourceUrl:

&#x20;                   "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight",



&#x20;               notes:

&#x20;                   "UPS states the Daily Rate divisor is 139."



&#x20;           },





&#x20;           retail: {



&#x20;               name: "Retail Rates",



&#x20;               status: "active",



&#x20;               imperialDivisor: 166,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "nearest",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "UPS Package Dimensions, Size Limits and Weight Guide",



&#x20;               sourceUrl:

&#x20;                   "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight",



&#x20;               notes:

&#x20;                   "UPS states the Retail Rate divisor is 166."



&#x20;           }



&#x20;       }



&#x20;   },





&#x20;   /\* ===================================================

&#x20;      FEDEX

&#x20;   =================================================== \*/



&#x20;   fedex: {



&#x20;       name: "FedEx",



&#x20;       services: {





&#x20;           expressDomestic: {



&#x20;               name: "Express — U.S. Domestic",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "nearest",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2025-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "FedEx Dimensional Weight Calculator / 2026 Service Guide",



&#x20;               sourceUrl:

&#x20;                   "https://page.message.fedex.com/weight\_calculator",



&#x20;               notes:

&#x20;                   "FedEx states DIM weight applies to Express packages."



&#x20;           },





&#x20;           groundDomestic: {



&#x20;               name: "Ground — U.S. Domestic",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "nearest",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2025-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "FedEx Dimensional Weight Calculator / 2026 Service Guide",



&#x20;               sourceUrl:

&#x20;                   "https://page.message.fedex.com/weight\_calculator",



&#x20;               notes:

&#x20;                   "FedEx states DIM weight applies to Ground packages."



&#x20;           },





&#x20;           expressInternational: {



&#x20;               name: "Express — International",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "nearest",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "FedEx 2026 Service Guide",



&#x20;               sourceUrl:

&#x20;                   "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service\_Guide\_2026.pdf",



&#x20;               notes:

&#x20;                   "International service rules can vary by origin, destination and service."



&#x20;           },





&#x20;           groundInternational: {



&#x20;               name: "Ground — International",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "nearest",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "FedEx 2026 Service Guide",



&#x20;               sourceUrl:

&#x20;                   "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service\_Guide\_2026.pdf",



&#x20;               notes:

&#x20;                   "International service rules can vary by origin, destination and service."



&#x20;           }



&#x20;       }



&#x20;   },





&#x20;   /\* ===================================================

&#x20;      USPS

&#x20;   =================================================== \*/



&#x20;   usps: {



&#x20;       name: "USPS",



&#x20;       services: {





&#x20;           groundAdvantage: {



&#x20;               name: "Ground Advantage",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "up",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-07-12",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "USPS Postal Bulletin 22705",



&#x20;               sourceUrl:

&#x20;                   "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt\_001.htm",



&#x20;               notes:

&#x20;                   "USPS changed the DIM factor to 139 effective July 12, 2026."



&#x20;           },





&#x20;           priorityMail: {



&#x20;               name: "Priority Mail",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "up",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-07-12",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "USPS Postal Bulletin 22705",



&#x20;               sourceUrl:

&#x20;                   "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt\_001.htm",



&#x20;               notes:

&#x20;                   "USPS changed the DIM factor to 139 effective July 12, 2026."



&#x20;           },





&#x20;           priorityMailExpress: {



&#x20;               name: "Priority Mail Express",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "up",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-07-12",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "USPS Postal Bulletin 22705",



&#x20;               sourceUrl:

&#x20;                   "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt\_001.htm",



&#x20;               notes:

&#x20;                   "USPS changed the DIM factor to 139 effective July 12, 2026."



&#x20;           },





&#x20;           parcelSelect: {



&#x20;               name: "Parcel Select",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "up",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-07-12",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "USPS Postal Bulletin 22705",



&#x20;               sourceUrl:

&#x20;                   "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt\_001.htm",



&#x20;               notes:

&#x20;                   "USPS changed the DIM factor to 139 effective July 12, 2026."



&#x20;           }



&#x20;       }



&#x20;   },





&#x20;   /\* ===================================================

&#x20;      DHL

&#x20;   =================================================== \*/



&#x20;   dhl: {



&#x20;       name: "DHL",



&#x20;       services: {





&#x20;           express: {



&#x20;               name: "Express",



&#x20;               status: "active",



&#x20;               imperialDivisor: 139,



&#x20;               metricDivisor: 5000,



&#x20;               dimensionRounding: "carrier",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "DHL Express Volumetric Weight Guidance",



&#x20;               sourceUrl:

&#x20;                   "https://www.dhl.com/discover/en-sg/ship-with-dhl/start-shipping/how-to-calculate-dhl-volumetric-weight",



&#x20;               notes:

&#x20;                   "DHL Express commonly documents 5000 cm³/kg."



&#x20;           },





&#x20;           ecommerce: {



&#x20;               name: "eCommerce",



&#x20;               status: "active",



&#x20;               imperialDivisor: 166,



&#x20;               metricDivisor: 6000,



&#x20;               dimensionRounding: "carrier",



&#x20;               weightRounding: "up",



&#x20;               effectiveFrom: "2026-01-01",



&#x20;               lastVerified: "2026-08-21",



&#x20;               sourceName:

&#x20;                   "DHL eCommerce Chargeable Shipping Weight",



&#x20;               sourceUrl:

&#x20;                   "https://www.dhl.com/us-en/home/ecommerce/business-help-center/chargeable-weight.html",



&#x20;               notes:

&#x20;                   "DHL eCommerce documents 166 in³/lb or 6000 cm³/kg."



&#x20;           }



&#x20;       }



&#x20;   }



};

