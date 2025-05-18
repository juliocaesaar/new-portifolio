import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub repositories endpoint
  app.get("/api/github-repos", async (_req, res) => {
    try {
      const response = await axios.get('https://api.github.com/users/juliovt-07/repos');
      const repos = response.data.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        language: repo.language
      }));
      res.json(repos);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
    }
  });
  // Example external API call
  app.get("/api/external", async (req, res) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch external data" });
    }
  });
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      // In a production environment, you would:
      // 1. Send email notification
      // 2. Store the contact request in database
      // 3. Perhaps create a ticket in a support system
      
      // For this demo, we'll just log the contact request
      console.log("Contact form submission:", { name, email, subject, message });
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Message received! Thank you for your inquiry." 
      });
    } catch (error) {
      console.error("Error handling contact form submission:", error);
      res.status(500).json({ 
        message: "Failed to process your request. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
