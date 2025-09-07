import cors from 'cors';
export default cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"]
});
//# sourceMappingURL=cors.js.map