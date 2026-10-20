export type OptionKey = "a" | "b" | "c" | "d";

export type Topic =
  | "cloud-concepts"
  | "azure-architecture"
  | "security-and-governance";

export interface AnswerOption {
  // Stable id. The UI assigns display letters (A-D) AFTER shuffling.
  key: OptionKey;
  text: string;
  // Shown after answering. Only set on wrong options.
  whyNot?: string;
}

export interface Question {
  id: number;
  topic: Topic;
  prompt: string;
  options: AnswerOption[];
  correctKey: OptionKey;
  explanation: string;
}