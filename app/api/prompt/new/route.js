import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
        // connect to DB
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        // create new Prompt
        await newPrompt.save();

        // return response saying its created
        return new Response(JSON.stringify(newPrompt, { status: 201 }));
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}