import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJSExpress from "@adminjs/express";

// Import models
import DeveloperInfo from "../models/DeveloperInfo.ts";
import Project from "../models/Project.ts";
import Skills from "../models/Skills.ts";
import Experience from "../models/Experience.ts";
import Testimonial from "../models/Testimonial.ts";
import ContactMessage from "../models/ContactMessage.ts";

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
              // Optional: customize label
              label: "Social Links",
              type: "mixed", // tells AdminJS it's a complex type
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
              isVisible: false, // This field doesn't exist — hide it
            },
            // Make array fields editable with proper UI
            tech_stack: {
              type: "string[]",
              isArray: true,
              components: {
                // Optional: Use custom component for better UX
                // edit: YourCustomArrayInput,
              },
            },
            features: {
              type: "string[]",
              isArray: true,
            },
            images: {
              type: "string[]",
              isArray: true,
              components: {
                // Show as image previews in list view
                list: false, // hide in list if too long
              },
            },
            github_repos: {
              type: "mixed", // tells AdminJS it's a complex type
              isArray: true,
              // Optional: customize labels
              label: "GitHub Repositories",
            },

            // Make sure nested fields are editable
            "github_repos.name": {
              isVisible: { list: false, filter: false, show: true, edit: true },
              label: "Repo Name",
            },
            "github_repos.url": {
              isVisible: { list: false, filter: false, show: true, edit: true },
              type: "url",
              label: "Repo URL",
            },
            // Hide timestamps from edit form (auto-managed)
            created_at: {
              isVisible: { edit: false, filter: false },
            },
            updated_at: {
              isVisible: { edit: false, filter: false },
            },
          },
          // Customize list view
          listProperties: ["title", "category", "status", "order", "demo_url"],
          // Customize show view
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
          // Validation messages
          validation: {
            // AdminJS will use your Mongoose validators automatically
          },
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
