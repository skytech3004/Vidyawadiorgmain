import mongoose, { Schema, model, models } from 'mongoose';

const PageContentSchema = new Schema({
    page: {
        type: String,
        required: true,
        index: true, // e.g., 'hostel', 'co-curricular', 'leeladevi'
    },
    section: {
        type: String,
        required: true,
        index: true, // e.g., 'hero', 'amenities', 'principal_message'
    },
    // Allows any structure: { title: '...', desc: '...', images: [...] }
    content: {
        type: Schema.Types.Mixed,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

// Prevent overwrite on hot reload
const PageContent = models.PageContent || model('PageContent', PageContentSchema);

export default PageContent;
