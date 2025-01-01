import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants.mjs";

export async function createAssistant(client: OpenAI): Promise<Assistant>{
    return await client.beta.assistants.create({
        model: "chatgpt-4o-latest",
        name: "My Assistant",
        instructions: "You can ask me anything!",
        tools: []
    });
}