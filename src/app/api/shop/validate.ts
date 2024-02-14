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
  
    return true;
  }
  