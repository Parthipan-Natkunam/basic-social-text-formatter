import type { AISession } from "../types/ai";

class EdgeAI {
  private languageModelSession: AISession | undefined;
  private readonly systemPrompt: string =
    "You are a Psychologist. Review the given text and determine the sentiment of the text. If it is positive respond as 'positive', if negative respond as 'negative', if neutral respond as 'neutral'.";

  constructor() {}

  private isEnabled() {
    return typeof window !== "undefined" && window.ai?.languageModel;
  }

  async init() {
    if (this.languageModelSession) {
      return;
    }
    if (!this.isEnabled()) {
      throw new Error("Edge AI feature is not enabled on this browser.");
    }
    const { languageModel } = window.ai;
    this.languageModelSession = await languageModel.create({
      systemPrompt: this.systemPrompt,
    });
  }

  async prompt(prompt: string) {
    if (!this.languageModelSession) {
      throw new Error("AI model is not initialized.");
    }
    const response = await this.languageModelSession.prompt(prompt);
    const acceptableResponses = ["positive", "negative", "neutral"];
    if (!acceptableResponses.includes(response)) {
      return "insufficient";
    }
    return response;
  }

  disposeSession() {
    if (this.languageModelSession) {
      this.languageModelSession.destroy();
      this.languageModelSession = undefined;
    }
  }
}

export default new EdgeAI();
