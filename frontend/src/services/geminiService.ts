import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface FeedbackResponse {
  score: number;
  userTranscript?: string;
  fluencyFeedback: string;
  vocabularyFeedback: string;
  structureFeedback: string;
  sampleAnswer: string;
  vietnameseTips: string;
}

export async function getSpeakingFeedback(
  topicTitle: string,
  question: string,
  userSpeech: string,
  keywords: string[],
  audioBase64?: string
): Promise<FeedbackResponse> {
  const prompt = `
    You are an expert IELTS Speaking Examiner and English coach. 
    Topic: ${topicTitle}
    Question: ${question}
    ${audioBase64 ? "The user's answer is provided as an audio file. " : ""}User's Answer ${audioBase64 ? "(if transcribed text is available)" : "(transcribed)"}: "${userSpeech}"
    Target Keywords for today: ${keywords.join(", ")}

    Please evaluate the user's answer (listen to the audio if provided, otherwise check the transcript) and provide feedback in JSON format with the following fields:
    - score (1-9 based on IELTS standards)
    - userTranscript (if audio is provided, please transcribe exactly what the user said. If only text was provided, repeat that text here)
    - fluencyFeedback (short advice on pace and fillers)
    - vocabularyFeedback (did they use keywords? suggestions for better words)
    - structureFeedback (did they follow a logical flow?)
    - sampleAnswer (a band 8.0+ sample answer for this question)
    - vietnameseTips (advice in Vietnamese for better understanding)

    Be encouraging and constructive.
  `;

  try {
    const contents: any[] = [{ role: 'user', parts: [{ text: prompt }] }];
    
    if (audioBase64) {
      contents[0].parts.push({
        inlineData: {
          mimeType: "audio/webm", // Common for MediaRecorder
          data: audioBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Use the latest flash model
      contents: contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}") as FeedbackResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to get feedback from AI coach.");
  }
}

export async function getExampleExplanation(example: string, targetLanguage: string = "Vietnamese"): Promise<string> {
  const prompt = `
    You are an expert IELTS Speaking coach who helps ${targetLanguage} students.
    Below is a Band 8.0+ sample answer for an IELTS Speaking question:
    "${example}"

    Please explain why this answer is considered high-level (Band 8.0 or above). 
    Your entire response MUST be in ${targetLanguage}.
    
    Focus on:
    1. Advanced vocabulary and collocations used (keep the English terms but explain them in ${targetLanguage}).
    2. Complex sentence structures (e.g., relative clauses, conditionals, passive voice).
    3. Cohesion and coherence.
    
    Keep the explanation concise, professional, and formatted in a way that is easy to read (use bullet points if needed).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "No explanation available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate explanation at this time.";
  }
}

export async function translateKeywords(keywords: { word: string, vietnamese: string, example: string }[], targetLanguage: string): Promise<string[]> {
  if (targetLanguage === "Vietnamese") {
    return keywords.map(k => k.vietnamese);
  }

  const prompt = `
    You are a professional translator and IELTS coach.
    Translate the following English words/phrases (with their Vietnamese equivalents provided for context) into ${targetLanguage}.
    Return ONLY a JSON array of strings, where each string is the translation in ${targetLanguage}.
    
    Keywords:
    ${keywords.map(k => `- ${k.word} (VN: ${k.vietnamese})`).join("\n")}
    
    Format:
    ["translation1", "translation2", ...]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "[]");
    return result;
  } catch (error) {
    console.error("Translation Error:", error);
    return keywords.map(k => k.vietnamese); // Fallback to Vietnamese
  }
}
