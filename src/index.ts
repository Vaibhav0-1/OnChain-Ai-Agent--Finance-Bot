import OpenAI from "openai";
import { createAssistant } from "./openai/createAssistant";
import { createThread } from "./openai/createThread";

async function main(){
    const client = new OpenAI();
    const message = "Hello My Assistant"

    const Assistant = await createAssistant(client);
    const thread = await createThread(client, message);


    console.log('Hello World');
}
main();