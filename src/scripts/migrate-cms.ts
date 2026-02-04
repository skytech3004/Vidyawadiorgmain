import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables IMMEDIATELY
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const migrateData = async () => {
    try {
        console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);

        // Dynamic imports to ensure MONGODB_URI is picked up
        const dbConnect = (await import('../lib/mongodb')).default;
        const PageContent = (await import('../models/PageContent')).default;
        const Page = (await import('../models/Page')).default;
        const Section = (await import('../models/Section')).default;

        await dbConnect();
        console.log('Connected to MongoDB for migration...');

        // 1. Fetch all unique pages from old collection
        const oldPages = await PageContent.distinct('page');
        console.log(`Found ${oldPages.length} pages to migrate: ${oldPages.join(', ')}`);

        for (const slug of oldPages) {
            console.log(`\nMigrating page: ${slug}...`);

            // 2. Create or find the Page entry
            let page = await Page.findOne({ slug });
            if (!page) {
                page = await Page.create({
                    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
                    slug: slug,
                    status: 'published',
                });
                console.log(`Created new Page entry for ${slug}`);
            }

            // 3. Fetch all sections for this page
            const oldSections = await PageContent.find({ page: slug });

            for (const oldSec of oldSections) {
                // Check if section already exists in new structure
                const existingSection = await Section.findOne({
                    pageId: page._id,
                    type: oldSec.section
                });

                if (!existingSection) {
                    await Section.create({
                        pageId: page._id,
                        type: oldSec.section,
                        content: oldSec.content,
                        order: 0, // Default order
                        isVisible: true
                    });
                    console.log(`  - Migrated section: ${oldSec.section}`);
                } else {
                    console.log(`  - Section ${oldSec.section} already exists, skipping.`);
                }
            }
        }

        console.log('\nMigration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateData();
