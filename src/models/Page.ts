import mongoose, { Schema, model, models } from 'mongoose';

const PageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    metadata: {
        metaTitle: String,
        metaDescription: String,
        ogImage: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

PageSchema.pre('save', async function (this: any) {
    this.updatedAt = new Date();
});

const Page = models.Page || model('Page', PageSchema);

export default Page;
