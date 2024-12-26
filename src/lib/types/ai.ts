export type AISession = {
  prompt: (prompt: string) => Promise<string>;
  destroy: () => void;
};

type AILanguageModel = {
  create: ({ systemPrompt }: { systemPrompt: string }) => Promise<AISession>;
};

declare global {
  interface Window {
    ai: {
      languageModel: AILanguageModel;
    };
  }
}
