export async function validateUpload(data: FormData) {
    const file = data.get('file') as File;
  
    if (!file) {
      return 'CSV File is required';
    }
    
    if (file.type !== 'text/csv') {
        return "Please upload a .csv file.";
    }
  
    if (file.size > 50 * 1024 * 1024) {
      return "File size exceeds the maximum allowed limit (50MB).";
    }
  
    const csvData = await file.text();

    const rows = csvData.split(/\r?\n/);

    const nonEmptyRows = rows.filter(row => row.trim() !== '');

    for (const row of nonEmptyRows) {
        const values = row.trim().split(/\s*,\s*/);

        if (values.length !== 3) {
            return "All rows must contain exactly 3 values.";
        }

        if (values[0] === '') {
            return "Shop cannot be blank";
        }

        if (values[1] === '') {
            return "Product cannot be blank";
        }

        if (values[2] === '') {
            return "Code cannot be blank";
        }
    }

    return true;
}
