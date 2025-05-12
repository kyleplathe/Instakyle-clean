import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvFilePath = path.join(__dirname, '../pricing.csv');
const pricingConfigPath = path.join(__dirname, '../src/config/pricing.js');

try {
  // Read and parse CSV
  const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true, // Trim whitespace
    relax_column_count: true // Handle extra commas
  });

  // Convert to pricing object
  const screenRepairPrices = {};
  records.forEach(record => {
    if (record.device) {
      // Handle "coming soon" or other text values
      const price = record.price?.toLowerCase().includes('coming soon') 
        ? null 
        : parseFloat(record.price);
      
      if (price !== null) {
        screenRepairPrices[record.device] = price;
      }
    }
  });

  // Generate the pricing configuration file content
  const configContent = `// This file is auto-generated from pricing.csv
// Last updated: ${new Date().toISOString()}

export const screenRepairPrices = ${JSON.stringify(screenRepairPrices, null, 2)};
`;

  // Write to pricing.js
  fs.writeFileSync(pricingConfigPath, configContent);
  console.log('Pricing configuration updated successfully!');
} catch (error) {
  console.error('Error updating pricing:', error);
  if (error.code === 'ENOENT') {
    console.error('Could not find pricing.csv file. Please make sure it exists in the root directory.');
  }
} 