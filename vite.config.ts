import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";

// Plugin to handle API routes
function apiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "api-plugin",
    configureServer(server) {
      server.middlewares.use("/api/groq-chat", async (req, res, next) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", async () => {
            try {
              const { prompt } = JSON.parse(body);

              if (!prompt || typeof prompt !== "string") {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing or invalid prompt" }));
                return;
              }

              const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
              if (!apiKey) {
                console.error("GROQ_API_KEY not found in environment variables");
                console.error("Available env keys:", Object.keys(env).filter(k => k.includes('GROQ')));
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    error: "Server not configured with GROQ_API_KEY. Please check your .env file.",
                  })
                );
                return;
              }

              const groqRes = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                      {
                        role: "system",
                        content:
                          "You are Tree Whisperer, an assistant that helps people care for trees. Be concise and practical. Provide helpful advice about tree planting, watering, health, and maintenance.",
                      },
                      {
                        role: "user",
                        content: prompt,
                      },
                    ],
                  }),
                }
              );

              if (!groqRes.ok) {
                const errorText = await groqRes.text();
                console.error("Groq API error:", groqRes.status, errorText);
                let errorMessage = "Failed to get response from AI service";
                try {
                  const errorData = JSON.parse(errorText);
                  if (errorData.error?.message) {
                    errorMessage = errorData.error.message;
                  }
                } catch (e) {
                  // Keep default error message
                }
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    error: errorMessage,
                  })
                );
                return;
              }

              const data = await groqRes.json();
              const reply =
                data?.choices?.[0]?.message?.content ??
                "No response from model.";

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ reply }));
            } catch (err) {
              console.error("API error:", err);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({ error: "Internal server error" })
              );
            }
          });
        } catch (err) {
          console.error("Request parsing error:", err);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid request" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      apiPlugin(env),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
