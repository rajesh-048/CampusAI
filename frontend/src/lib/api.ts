import type { ApiResponse, LoginRequest, LoginResponse, SearchRequest, SearchResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000";

async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || `Request failed with status ${response.status}`,
      };
    }

    return { success: true, data: data.data ?? data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export const authApi = {
  login: (data: LoginRequest) =>
    fetchApi<LoginResponse>(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetchApi(`${API_URL}/auth/logout`, {
      method: "POST",
    }),

  me: () => fetchApi<LoginResponse["user"]>(`${API_URL}/auth/me`),
};

export const aiApi = {
  search: (data: SearchRequest) =>
    fetchApi<SearchResponse>(`${AI_API_URL}/api/search`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  chatStream: async function* (
    message: string,
    conversationHistory: Array<{ role: string; content: string }>,
    language: string = "en"
  ) {
    const response = await fetch(`${AI_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
        language,
      }),
    });

    if (!response.ok) throw new Error("Chat request failed");
    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") return;
          try {
            yield JSON.parse(data);
          } catch {
            yield { content: data };
          }
        }
      }
    }
  },

  uploadDocument: async (formData: FormData) => {
    try {
      const response = await fetch(`${AI_API_URL}/api/documents/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  },
};
