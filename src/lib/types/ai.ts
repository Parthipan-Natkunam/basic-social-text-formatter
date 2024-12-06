export type AIModelInstance = {
  prompt: (prompt: string) => Promise<string>;
};

type AILanguageModel = {
  create: ({
    systemPrompt,
  }: {
    systemPrompt: string;
  }) => Promise<AIModelInstance>;
};

declare global {
  interface Window {
    ai: {
      languageModel: AILanguageModel;
    };
  }
}
