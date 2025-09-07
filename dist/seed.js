import 'dotenv/config';
import { connectToMongo, closeMongoConnection } from './database/mongo';
import DeveloperInfo from './models/DeveloperInfo';
import Project from './models/Project';
import Skills from './models/Skills';
import Experience from './models/Experience';
import Testimonial from './models/Testimonial';
import './models/ContactMessage';
const ProjectStatus = {
    LIVE: 'Live',
    IN_DEVELOPMENT: 'In Development',
    COMPLETED: 'Completed'
};
const seedDeveloperInfo = async () => {
    const data = {
        name: "Roohan G.M",
        title: "React Native Developer",
        subtitle: "Building Cross-Platform Mobile Experiences",
        bio: "Passionate React Native developer with 1+ years of experience creating high-performance mobile applications. I specialize in building scalable cross-platform solutions that deliver native-like experiences across iOS and Android platforms.",
        location: "karachi, Sindh",
        email: "gmroohan@gmail.com",
        phone: "03034064651",
        social: {
            github: "https://github.com/Roohan-gm",
            linkedin: "https://www.linkedin.com/in/roohan-g-m/",
            twitter: "https://x.com/GmRoohan",
            portfolio: "https://alexmorgan.dev"
        },
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    };
    await DeveloperInfo.deleteMany({});
    await DeveloperInfo.create(data);
    console.log("✅ Developer info seeded");
};
const seedProjects = async () => {
    const data = [
        {
            title: "FoodieApp",
            description: "A comprehensive food delivery app with real-time tracking, payment integration, and social features. Built with React Native and Firebase backend.",
            long_description: "FoodieApp is a full-featured food delivery platform that connects users with local restaurants. The app includes features like real-time order tracking, in-app payments, user reviews, and a social feed where users can share their food experiences.",
            tech_stack: ["React Native", "Firebase", "Stripe API", "Google Maps API", "TypeScript"],
            features: [
                "Real-time order tracking with Google Maps integration",
                "Secure payment processing via Stripe",
                "Social feed and user reviews system",
                "Push notifications for order updates",
                "Cross-platform compatibility (iOS & Android)"
            ],
            images: [
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=600&fit=crop",
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=600&fit=crop"
            ],
            demo_url: "https://expo.dev/@alexmorgan/foodie-app",
            github_url: "https://github.com/alexmorgan/foodie-app",
            status: ProjectStatus.LIVE,
            category: "E-commerce",
            order: 1
        },
        {
            title: "FitTracker Pro",
            description: "A fitness tracking app with workout planning, progress analytics, and social challenges. Features native performance optimizations and offline capability.",
            long_description: "FitTracker Pro helps users achieve their fitness goals through comprehensive workout tracking, personalized training plans, and community challenges. The app works offline and syncs data when connection is restored.",
            tech_stack: ["React Native", "SQLite", "D3.js", "React Query", "AsyncStorage"],
            features: [
                "Offline-first architecture with SQLite database",
                "Interactive charts and progress analytics",
                "Custom workout builder with exercise library",
                "Social challenges and leaderboards",
                "Wearable device integration (Apple Watch, Fitbit)"
            ],
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=600&fit=crop",
                "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=300&h=600&fit=crop"
            ],
            demo_url: "https://expo.dev/@alexmorgan/fit-tracker",
            github_url: "https://github.com/alexmorgan/fit-tracker-pro",
            status: ProjectStatus.IN_DEVELOPMENT,
            category: "Health & Fitness",
            order: 2
        },
        {
            title: "CryptoWallet",
            description: "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and advanced security features. Built with biometric authentication.",
            long_description: "A next-generation cryptocurrency wallet that supports multiple blockchain networks. Features include DeFi protocol integration, NFT gallery, and institutional-grade security measures.",
            tech_stack: ["React Native", "Web3.js", "Biometric Auth", "Encrypted Storage", "GraphQL"],
            features: [
                "Multi-chain cryptocurrency support (Bitcoin, Ethereum, etc.)",
                "Biometric authentication (Face ID, Fingerprint)",
                "DeFi protocol integration for yield farming",
                "NFT collection gallery and marketplace",
                "Hardware wallet integration support"
            ],
            images: [
                "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=600&fit=crop",
                "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300&h=600&fit=crop"
            ],
            demo_url: "https://expo.dev/@alexmorgan/crypto-wallet",
            github_url: "https://github.com/alexmorgan/crypto-wallet",
            status: ProjectStatus.LIVE,
            category: "Fintech",
            order: 3
        },
        {
            title: "TaskFlow",
            description: "Team collaboration and project management app with real-time updates, file sharing, and advanced workflow automation.",
            long_description: "TaskFlow streamlines team productivity with intelligent task management, automated workflows, and seamless collaboration tools. Perfect for agile development teams and creative agencies.",
            tech_stack: ["React Native", "Socket.io", "Redux Toolkit", "React Hook Form", "Expo"],
            features: [
                "Real-time collaboration with WebSocket integration",
                "Automated workflow triggers and notifications",
                "File sharing with cloud storage integration",
                "Advanced analytics and team performance metrics",
                "Offline mode with automatic sync capabilities"
            ],
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=600&fit=crop",
                "https://images.unsplash.com/photo-1553028826-f4804151e2e2?w=300&h=600&fit=crop"
            ],
            demo_url: "https://expo.dev/@alexmorgan/taskflow",
            github_url: "https://github.com/alexmorgan/taskflow",
            status: ProjectStatus.LIVE,
            category: "Productivity",
            order: 4
        }
    ];
    await Project.deleteMany({});
    await Project.insertMany(data);
    console.log(`✅ ${data.length} projects seeded`);
};
const seedSkills = async () => {
    const data = {
        primary: ["React Native", "JavaScript (ES6+)", "TypeScript", "React.js", "Node.js"],
        mobile: ["iOS Development", "Android Development", "Expo", "React Navigation", "Native Modules"],
        backend: ["Firebase", "GraphQL", "REST APIs", "MongoDB", "PostgreSQL"],
        tools: ["Git & GitHub", "Xcode", "Android Studio", "VS Code", "Figma"]
    };
    await Skills.deleteMany({});
    await Skills.create(data);
    console.log("✅ Skills data seeded");
};
const seedExperience = async () => {
    const data = [
        {
            title: "Senior React Native Developer",
            company: "TechFlow Inc.",
            period: "2022 - Present",
            description: "Led development of cross-platform mobile applications serving 100K+ users. Implemented CI/CD pipelines and mentored junior developers.",
            achievements: [
                "Reduced app bundle size by 40% through code optimization",
                "Improved app performance scores by 35% on both platforms",
                "Led team of 4 developers on flagship mobile product"
            ],
            order: 1
        },
        {
            title: "React Native Developer",
            company: "StartupHub",
            period: "2020 - 2022",
            description: "Developed MVP mobile applications for early-stage startups. Worked closely with product teams to validate concepts and iterate rapidly.",
            achievements: [
                "Built 8 mobile apps from concept to production",
                "Implemented real-time features using WebSocket technology",
                "Achieved 4.5+ star rating on both App Store and Play Store"
            ],
            order: 2
        }
    ];
    await Experience.deleteMany({});
    await Experience.insertMany(data);
    console.log(`✅ ${data.length} experience entries seeded`);
};
const seedTestimonials = async () => {
    const data = [
        {
            name: "Sarah Chen",
            title: "Product Manager",
            company: "TechFlow Inc.",
            content: "Alex is an exceptional React Native developer who consistently delivers high-quality mobile applications. His attention to detail and problem-solving skills are outstanding.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            order: 1
        },
        {
            name: "Michael Rodriguez",
            title: "CTO",
            company: "StartupHub",
            content: "Working with Alex was a game-changer for our mobile strategy. He not only delivered exceptional code but also provided valuable insights on user experience and performance optimization.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            order: 2
        },
        {
            name: "Emily Johnson",
            title: "UI/UX Designer",
            company: "Design Studio Pro",
            content: "Alex has an incredible ability to transform design concepts into pixel-perfect mobile experiences. His collaboration and technical expertise make him a valuable team member.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            order: 3
        }
    ];
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(data);
    console.log(`✅ ${data.length} testimonials seeded`);
};
const seedAll = async () => {
    console.log("🌱 Starting database seeding...");
    try {
        await connectToMongo();
        await seedDeveloperInfo();
        await seedProjects();
        await seedSkills();
        await seedExperience();
        await seedTestimonials();
        console.log("🎉 Database seeding completed!");
    }
    catch (error) {
        console.error("❌ Seeding failed:", error.message);
    }
    finally {
        await closeMongoConnection();
    }
};
if (require.main === module) {
    seedAll().catch(console.error);
}
export default seedAll;
//# sourceMappingURL=seed.js.map