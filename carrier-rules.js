/*
=========================================================
CARRIER RULES DATABASE
=========================================================
*/

const CARRIER_RULES = {
    general: {
        name: "General & Industry Standards",
        services: {
            standard: {
                name: "Standard Parcel DIM (139)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "nearest",
                effectiveFrom: "General",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "Standard parcel dimensional factor across US domestic and international air freight."
            },
            ltl: {
                name: "Standard Freight / LTL (139)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "nearest",
                effectiveFrom: "General",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "Standard motor freight / palletized shipping dimensional factor."
            }
        }
    },
    ups: {
        name: "UPS",
        services: {
            ground: {
                name: "UPS Ground / Daily Rates (139)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "Applies to standard UPS Ground daily rate packages over 1 cubic foot."
            },
            air_int: {
                name: "UPS Worldwide Express / Saver / Expedited (139)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "Applies to all UPS International express and expedited air shipments."
            }
        }
    },
    fedex: {
        name: "FedEx",
        services: {
            express: {
                name: "FedEx Express / Ground (139)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "Standard FedEx daily rate dimensional factor."
            },
            international: {
                name: "FedEx International Priority / Economy (139)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "Applies to international export and import shipments."
            }
        }
    },
    dhl: {
        name: "DHL Express",
        services: {
            express_int: {
                name: "DHL Express Worldwide (139 / 5000 Metric)",
                imperialDivisor: 139,
                metricDivisor: 5000,
                dimensionRounding: "up",
                effectiveFrom: "2026-01-01",
                lastVerified: "2026-08-24",
                status: "active",
                notes: "DHL international express standard dimensional rule."
            }
        }
    }
};
