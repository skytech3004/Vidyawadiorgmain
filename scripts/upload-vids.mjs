import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
import FormData from 'form-data';

// Load .env.local
dotenv.config({ path: '.env.local' });

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary credentials in .env.local");
  process.exit(1);
}

const publicDir = path.join(process.cwd(), 'public');
const videos = fs.readdirSync(publicDir).filter(f => f.startsWith('IMG_') && f.endsWith('.webm'));

console.log(`Found ${videos.length} videos to upload...`);

const uploadVideo = async (filename) => {
  const filePath = path.join(publicDir, filename);
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // Create signature
  const paramsToSign = `timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    return { filename, url: res.data.secure_url };
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error.response?.data || error.message);
    return null;
  }
};

const run = async () => {
  const results = [];
  for (const video of videos) {
    console.log(`Uploading ${video}...`);
    const result = await uploadVideo(video);
    if (result) {
      console.log(`Successfully uploaded ${video}: ${result.url}`);
      results.push(result);
    }
  }

  console.log('\n--- UPLOAD MAPPING ---');
  console.log(JSON.stringify(results, null, 2));
  console.log('--- END MAPPING ---\n');

  // Save to a temporary file for the agent to read easily
  fs.writeFileSync('cloudinary_mapping.json', JSON.stringify(results, null, 2));
  console.log('Mapping saved to cloudinary_mapping.json');
};

run();
