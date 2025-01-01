import OpenAI from "openai";
import { createAssistant } from "./openai/createAssistant";

async function main(){
    const client = new OpenAI();

    const Assistant = await createAssistant(client);


    console.log('Hello World');
}
main();