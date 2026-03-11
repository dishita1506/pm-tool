import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PM Tool API",
      version: "1.0.0",
      description: "Full Project Management & Collaboration Tool API",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "64f123abc" },
            name: { type: "string", example: "Dishita" },
            email: { type: "string", example: "dishita@gmail.com" },
          },
        },

        Project: {
          type: "object",
          properties: {
            id: { type: "string", example: "project123" },
            name: { type: "string", example: "PM Tool" },
            description: {
              type: "string",
              example: "Project management application",
            },
          },
        },

        Board: {
          type: "object",
          properties: {
            id: { type: "string", example: "board123" },
            name: { type: "string", example: "Development Board" },
            projectId: { type: "string", example: "project123" },
          },
        },

        Task: {
          type: "object",
          properties: {
            id: { type: "string", example: "task123" },
            title: { type: "string", example: "Build login page" },
            description: {
              type: "string",
              example: "Implement login UI",
            },
            status: {
              type: "string",
              example: "todo",
            },
          },
        },

        Comment: {
          type: "object",
          properties: {
            id: { type: "string", example: "comment123" },
            text: { type: "string", example: "Great work!" },
            taskId: { type: "string", example: "task123" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

export default swaggerJsdoc(options);
