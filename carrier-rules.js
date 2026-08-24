/*
=========================================================
CARRIER RULE DATABASE
=========================================================
*/

const CARRIER_RULES = {

    general: {
        name: "General & Industry Standards",
        services: {
            standard: {
                name: "Standard Parcel DIM (139)",
                status: "active",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "carrier",
                weightRounding: "up",
                effectiveFrom: "General",
                lastVerified: "2026-08-24",
                sourceName: "General industry reference",
                sourceUrl: null,
                notes: "Standard parcel dimensional factor."
            },
            iataAir: {
                name: "IATA Air Cargo Standard (166)",
                status: "active",
                imperialDivisor: 166,
                metricDivisor: 6000,
                dimensionRounding: "nearest",
                weightRounding: "up",
                effectiveFrom: "Standard",
                lastVerified: "2026-08-24",
                sourceName: "IATA Volumetric Weight Standard",
                sourceUrl: null,
                notes: "Standard international air freight divisor (6000 cm³/kg or 166 in³/lb)."
            },
            ltlStandard: {
                name: "Standard LTL Freight (194)",
                status: "active",
                imperialDivisor: 194,
                metricDivisor: 7000,
                dimensionRounding: "nearest",
                weightRounding: "up",
                effectiveFrom: "Standard",
                lastVerified: "2026-08-24",
                sourceName: "Motor Freight Industry Standard",
                sourceUrl: null,
                notes: "Common baseline DIM factor used for LTL density calculations."
            }
        }
    },

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
                lastVerified: "2026-08-24",
                sourceName: "UPS Package Dimensions and Weight Guide",
                sourceUrl: "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight",
                notes: "UPS Daily Rate divisor."
            },
            retail: {
                name: "Retail Rates",
                status: "active",
                imperialDivisor: 166,
                metricDivisor: 5000,
                dimensionRounding: "nearest",
                weightRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                sourceName: "UPS Package Dimensions and Weight Guide",
                sourceUrl: "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight",
                notes: "UPS Retail Rate divisor."
            }
        }
    },

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
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                sourceName: "FedEx 2026 Service Guide",
                sourceUrl: "https://page.message.fedex.com/weight_calculator",
                notes: "Domestic Express DIM factor."
            },
            groundDomestic: {
                name: "Ground — U.S. Domestic",
                status: "active",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "nearest",
                weightRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                sourceName: "FedEx 2026 Service Guide",
                sourceUrl: "https://page.message.fedex.com/weight_calculator",
                notes: "Domestic Ground DIM factor."
            }
        }
    },

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
                lastVerified: "2026-08-24",
                sourceName: "USPS Postal Bulletin 22705",
                sourceUrl: "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt_001.htm",
                notes: "USPS Ground Advantage DIM factor."
            },
            priorityMail: {
                name: "Priority Mail",
                status: "active",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                weightRounding: "up",
                effectiveFrom: "2026-07-12",
                lastVerified: "2026-08-24",
                sourceName: "USPS Postal Bulletin 22705",
                sourceUrl: "https://about.usps.com/postal-bulletin/2026/pb22705/html/updt_001.htm",
                notes: "USPS Priority Mail DIM factor."
            }
        }
    },

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
                lastVerified: "2026-08-24",
                sourceName: "DHL Express Volumetric Weight Guidance",
                sourceUrl: "https://www.dhl.com/discover/en-sg/ship-with-dhl/start-shipping/how-to-calculate-dhl-volumetric-weight",
                notes: "DHL Express volumetric divisor."
            },
            ecommerce: {
                name: "eCommerce",
                status: "active",
                imperialDivisor: 166,
                metricDivisor: 6000,
                dimensionRounding: "carrier",
                weightRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                sourceName: "DHL eCommerce Chargeable Shipping Weight",
                sourceUrl: "https://www.dhl.com/us-en/home/ecommerce/business-help-center/chargeable-weight.html",
                notes: "DHL eCommerce divisor."
            }
        }
    }
};
