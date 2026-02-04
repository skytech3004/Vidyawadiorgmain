import mongoose, { Schema, model, models } from 'mongoose';

const SectionSchema = new Schema({
    pageId: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: true,
        index: true,
    },
    type: {
        type: String,
        required: true, // e.g., 'hero', 'gallery', 'features', 'text-content'
    },
    order: {
        type: Number,
        default: 0,
    },
    // The flexible content object
    content: {
        type: Schema.Types.Mixed,
        default: {},
    },
    // Optional: Settings for the section (e.g., background color, padding)
    settings: {
        type: Schema.Types.Mixed,
        default: {},
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});

const Section = models.Section || model('Section', SectionSchema);

export default Section;
