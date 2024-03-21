import { validateBufferMIMEType } from "validate-image-type";

export const validateImage = async (pfp: File): Promise<string | Buffer> => {
	//image file validation
	if (!pfp)
		return 'Image is required.';
	if (pfp.size > 10 * 1024 * 1024)
		return 'File size exceeds the maximum allowed limit (10MB).';

	const buffer = Buffer.from(await pfp.arrayBuffer());

	const FileSigHeader = buffer.toString('hex', 0, 8).toUpperCase();
	const FileSigTrailer = buffer.toString('hex', buffer.length - 8, buffer.length).toUpperCase();
	const WEBPSIG = buffer.toString('hex', 8, 12).toUpperCase();
	
	// Signatures
	const jpegStartingSignature = 'FFD8';
	const jpegEndingSignature = 'FFD9';

	const pngStartingSignature = '89504E470D0A1A0A';
	const pngEndingSignature = '49454E44AE426082';

	const webpStartingRIFFSignature = '52494646';
	const webpStartingWEBPSignature = '57454250';
	//webp has no end sig
	
	if (
		!(
			(FileSigHeader.startsWith(jpegStartingSignature) && FileSigTrailer.endsWith(jpegEndingSignature)) ||
			(FileSigHeader.startsWith(pngStartingSignature) &&  FileSigTrailer.endsWith(pngEndingSignature)) ||
			(FileSigHeader.startsWith(webpStartingRIFFSignature) && WEBPSIG.endsWith(webpStartingWEBPSignature))
		)
	) 
	{
		return 'Please upload a valid .jpeg, .png, or .webp file';
	}
	
	const res = await validateBufferMIMEType(buffer, {
		allowMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
	});
	if (!res.ok)
		return 'Please upload a .jpeg, .png, or .webp file.';
	return buffer;
}