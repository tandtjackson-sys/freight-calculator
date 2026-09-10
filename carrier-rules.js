/*
=========================================================
CARRIER RULES DEFINITIONS
=========================================================
*/

const CARRIER_RULES = {
    ups: {
        name: "UPS",
        services: {
            standard: {
                name: "Daily / Standard Rates (Domestic)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                notes: "Applies 139 divisor for domestic packages exceeding 1,728 cubic inches or daily rates.",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            },
            retail: {
                name: "Retail / Counter Rates (Domestic)",
                imperialDivisor: 166,
                metricDivisor: 6000,
                dimensionRounding: "up",
                notes: "Applies 166 divisor for domestic retail counter shipments.",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            },
            international: {
                name: "UPS Worldwide / International",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                notes: "Standard global 139 imperial / 5000 metric divisor for export and import shipments.",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            }
        }
    },
    fedex: {
        name: "FedEx",
        services: {
            express: {
                name: "Daily / Standard Rates (Domestic)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                notes: "Applies standard 139 divisor across domestic FedEx Express and Ground services.",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            },
            retail: {
                name: "Retail Rates (Domestic)",
                imperialDivisor: 166,
                metricDivisor: 6000,
                dimensionRounding: "up",
                notes: "Applies 166 divisor for retail/counter shipments.",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            },
            international: {
                name: "FedEx International Economy / Priority",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                notes: "Standard international express divisor (139 imperial / 5000 metric).",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            }
        }
    },
    usps: {
        name: "USPS",
        services: {
            priority: {
                name: "Priority Mail / Ground Advantage (> 1 cu ft)",
                imperialDivisor: 166,
                metricDivisor: 6000,
                dimensionRounding: "nearest",
                notes: "Applies 166 divisor ONLY to packages exceeding 1 cubic foot (1,728 cu in).",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            }
        }
    },
    dhl: {
        name: "DHL Express",
        services: {
            express: {
                name: "DHL Express Worldwide",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                notes: "Standard global IATA 5000 metric / 139 imperial divisor.",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24"
            }
        }
    }
};
