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

*/



const CARRIER_RULES = {





    /* ===================================================

       GENERAL

    =================================================== */



    general: {



        name: "General",



        services: {



            standard: {



                name: "Standard DIM",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "carrier",



                weightRounding: "up",



                effectiveFrom: "General",



                lastVerified: "2026-08-21",



                sourceName: "General industry reference",



                sourceUrl: null,



                notes:

                    "Use only when a specific carrier/service rule is not selected."



            }



        }



    },





    /* ===================================================

       UPS

    =================================================== */



    ups: {



        name: "UPS",



        services: {





            daily: {



                name: "Daily Rates",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "nearest",



                weightRounding: "up",



                effectiveFrom: "2026-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "UPS Package Dimensions, Size Limits and Weight Guide",



                sourceUrl:

                    "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight",



                notes:

                    "UPS states the Daily Rate divisor is 139."



            },





            retail: {



                name: "Retail Rates",



                status: "active",



                imperialDivisor: 166,



                metricDivisor: 5000,



                dimensionRounding: "nearest",



                weightRounding: "up",



                effectiveFrom: "2026-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "UPS Package Dimensions, Size Limits and Weight Guide",



                sourceUrl:

                    "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight",



                notes:

                    "UPS states the Retail Rate divisor is 166."



            }



        }



    },





    /* ===================================================

       FEDEX

    =================================================== */



    fedex: {



        name: "FedEx",



        services: {





            expressDomestic: {



                name: "Express — U.S. Domestic",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "nearest",



                weightRounding: "up",



                effectiveFrom: "2025-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "FedEx Dimensional Weight Calculator / 2026 Service Guide",



                sourceUrl:

                    "https://page.message.fedex.com/weight_calculator",



                notes:

                    "FedEx states DIM weight applies to Express packages."



            },





            groundDomestic: {



                name: "Ground — U.S. Domestic",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "nearest",



                weightRounding: "up",



                effectiveFrom: "2025-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "FedEx Dimensional Weight Calculator / 2026 Service Guide",



                sourceUrl:

                    "https://page.message.fedex.com/weight_calculator",



                notes:

                    "FedEx states DIM weight applies to Ground packages."



            },





            expressInternational: {



                name: "Express — International",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "nearest",



                weightRounding: "up",



                effectiveFrom: "2026-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "FedEx 2026 Service Guide",



                sourceUrl:

                    "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf",



                notes:

                    "International service rules can vary by origin, destination and service."



            },





            groundInternational: {



                name: "Ground — International",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "nearest",



                weightRounding: "up",



                effectiveFrom: "2026-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "FedEx 2026 Service Guide",



                sourceUrl:

                    "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf",



                notes:

                    "International service rules can vary by origin, destination and service."



            }



        }



    },





    /* ===================================================

       USPS

    =================================================== */



    usps: {



        name: "USPS",



        services: {





            groundAdvantage: {



                name: "Ground Advantage",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "up",



                weightRounding: "up",



                effectiveFrom: "2026-07-12",



                lastVerified: "2026-08-21",



                sourceName:

                    "USPS Postal Bulletin 22705",



                sourceUrl:

                    "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt_001.htm",



                notes:

                    "USPS changed the DIM factor to 139 effective July 12, 2026."



            },





            priorityMail: {



                name: "Priority Mail",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "up",



                weightRounding: "up",



                effectiveFrom: "2026-07-12",



                lastVerified: "2026-08-21",



                sourceName:

                    "USPS Postal Bulletin 22705",



                sourceUrl:

                    "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt_001.htm",



                notes:

                    "USPS changed the DIM factor to 139 effective July 12, 2026."



            },





            priorityMailExpress: {



                name: "Priority Mail Express",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "up",



                weightRounding: "up",



                effectiveFrom: "2026-07-12",



                lastVerified: "2026-08-21",



                sourceName:

                    "USPS Postal Bulletin 22705",



                sourceUrl:

                    "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt_001.htm",



                notes:

                    "USPS changed the DIM factor to 139 effective July 12, 2026."



            },





            parcelSelect: {



                name: "Parcel Select",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "up",



                weightRounding: "up",



                effectiveFrom: "2026-07-12",



                lastVerified: "2026-08-21",



                sourceName:

                    "USPS Postal Bulletin 22705",



                sourceUrl:

                    "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt_001.htm",



                notes:

                    "USPS changed the DIM factor to 139 effective July 12, 2026."



            }



        }



    },





    /* ===================================================

       DHL

    =================================================== */



    dhl: {



        name: "DHL",



        services: {





            express: {



                name: "Express",



                status: "active",



                imperialDivisor: 139,



                metricDivisor: 5000,



                dimensionRounding: "carrier",



                weightRounding: "up",



                effectiveFrom: "2026-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "DHL Express Volumetric Weight Guidance",



                sourceUrl:

                    "https://www.dhl.com/discover/en-sg/ship-with-dhl/start-shipping/how-to-calculate-dhl-volumetric-weight",



                notes:

                    "DHL Express commonly documents 5000 cm³/kg."



            },





            ecommerce: {



                name: "eCommerce",



                status: "active",



                imperialDivisor: 166,



                metricDivisor: 6000,



                dimensionRounding: "carrier",



                weightRounding: "up",



                effectiveFrom: "2026-01-01",



                lastVerified: "2026-08-21",



                sourceName:

                    "DHL eCommerce Chargeable Shipping Weight",



                sourceUrl:

                    "https://www.dhl.com/us-en/home/ecommerce/business-help-center/chargeable-weight.html",



                notes:

                    "DHL eCommerce documents 166 in³/lb or 6000 cm³/kg."



            }



        }



    }



};


