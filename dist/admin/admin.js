import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJSExpress from "@adminjs/express";
import DeveloperInfo from "../models/DeveloperInfo.js";
import Project from "../models/Project.js";
import Skills from "../models/Skills.js";
import Experience from "../models/Experience.js";
import Testimonial from "../models/Testimonial.js";
import ContactMessage from "../models/ContactMessage.js";
AdminJS.registerAdapter(AdminJSMongoose);
export const buildAdminRouter = () => {
    const admin = new AdminJS({
        rootPath: "/admin",
        resources: [
            {
                resource: DeveloperInfo,
                options: {
                    properties: {
                        id: {
                            isVisible: {
                                list: false,
                                show: false,
                                edit: false,
                                filter: false,
                            },
                        },
                        bio: { type: "textarea" },
                        social: {
                            label: "Social Links",
                            type: "mixed",
                            isArray: true,
                        },
                    },
                    navigation: { icon: "User" },
                },
            },
            {
                resource: Project,
                options: {
                    properties: {
                        id: {
                            isVisible: {
                                list: false,
                                show: false,
                                edit: false,
                                filter: false,
                            },
                        },
                        github_url: {
                            isVisible: false,
                        },
                        tech_stack: {
                            type: "string[]",
                            isArray: true,
                            components: {},
                        },
                        features: {
                            type: "string[]",
                            isArray: true,
                        },
                        images: {
                            type: "string[]",
                            isArray: true,
                            components: {
                                list: false,
                            },
                        },
                        github_repos: {
                            type: "mixed",
                            isArray: true,
                            label: "GitHub Repositories",
                        },
                        "github_repos.name": {
                            isVisible: { list: false, filter: false, show: true, edit: true },
                            label: "Repo Name",
                        },
                        "github_repos.url": {
                            isVisible: { list: false, filter: false, show: true, edit: true },
                            type: "url",
                            label: "Repo URL",
                        },
                        created_at: {
                            isVisible: { edit: false, filter: false },
                        },
                        updated_at: {
                            isVisible: { edit: false, filter: false },
                        },
                    },
                    listProperties: ["title", "category", "status", "order", "demo_url"],
                    showProperties: [
                        "title",
                        "description",
                        "long_description",
                        "tech_stack",
                        "features",
                        "images",
                        "demo_url",
                        "github_repos",
                        "status",
                        "category",
                        "order",
                        "created_at",
                        "updated_at",
                    ],
                    validation: {},
                    navigation: { icon: "Folder" },
                },
            },
            {
                resource: Skills,
                options: {
                    properties: {
                        id: {
                            isVisible: {
                                list: false,
                                show: true,
                                edit: false,
                                filter: false,
                            },
                        },
                    },
                    navigation: { icon: "Tool" },
                },
            },
            {
                resource: Experience,
                options: {
                    properties: {
                        id: {
                            isVisible: {
                                list: false,
                                show: true,
                                edit: false,
                                filter: false,
                            },
                        },
                    },
                    navigation: { icon: "Briefcase" },
                },
            },
            {
                resource: Testimonial,
                options: {
                    properties: {
                        id: {
                            isVisible: {
                                list: false,
                                show: true,
                                edit: false,
                                filter: false,
                            },
                        },
                    },
                    navigation: { icon: "Star" },
                },
            },
            {
                resource: ContactMessage,
                options: {
                    properties: {
                        id: {
                            isVisible: {
                                list: false,
                                show: true,
                                edit: false,
                                filter: false,
                            },
                        },
                    },
                    actions: {
                        new: { isVisible: false },
                    },
                    navigation: { icon: "MessageCircle" },
                },
            },
        ],
        branding: {
            companyName: "Portfolio Admin",
            logo: false,
        },
        locale: {
            language: "en",
            translations: {
                labels: {
                    loginWelcome: "Welcome to Portfolio Admin",
                },
            },
        },
    });
    const adminRouter = AdminJSExpress.buildRouter(admin);
    return { admin, adminRouter };
};
//# sourceMappingURL=admin.js.map