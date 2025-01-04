import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";
import { handleRunToolCalls} from "./handleRunToolCalls";

export async function performRun(run: Run, client: OpenAI, thread:Thread){
    while (run.status === "requires_action"){
        run = await handleRunToolCalls(run, client, thread);
    }

    if(run.status === "failed"){
        const errorMessage = `I encountered an error: ${run.last_error?.message || "Unknown Error"}`;
        console.log('Run failed:', run.last_error);
        await client.beta.threads.messages.create(thread.id, {
            role: 'assistant',
            content: errorMessage
        });
        return{
            type:'text',
            text: {
                value: errorMessage,
                annotations: []
            }
        };
    }

    const message = await client.beta.threads.messages.list(thread.id);
    const assistantMessage = message.data.find(message => message.role === 'assistant');

    return assistantMessage?.content[0] || {
        type:'text', text: {value: "I'm sorry, I don't have a response for that.", annotations: []} 
    }
}