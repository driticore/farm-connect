export const PRODUCT_CATEGORIES = [
    {
        label: "Pathway",
        value: "pathway" as const,
        featured: [
            {
                name: "Farm Community",
                href: "#",
                imageSrc: "./nav/ui-kits/community.jpg"
            },
            {
                name: "Job Acquisitions",
                href: "#",
                imageSrc: "./nav/ui-kits/jobs.jpg"
            },
            {
                name: "Verified Sellers",
                href: "#",
                imageSrc: './nav/ui-kits/verified.gif' // Correctly use myGif as a string
            }
        ]
    },
    {
        label: "Farm Life",
        value: "farm_life" as const,
        featured: [
            {
                name: "Livestock",
                href: "#",
                imageSrc: "./nav/icons/livestock.gif"
            },
            {
                name: "Agriculture",
                href: "#",
                imageSrc: "./nav/icons/agri.gif"
            },
            {
                name: "Eco-Building",
                href: "#",
                imageSrc: "./nav/icons/eco.jpg"
            }
        ]
    },
];
