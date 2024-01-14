import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Promot is required.']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    }
});

// either get prompt that already exists or create new Prompt model if it doesn't already exist
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;