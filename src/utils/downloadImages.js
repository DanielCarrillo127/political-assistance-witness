// import { storage } from 'firebase/app';
import 'firebase/storage';
import JSZip from 'jszip';
import { getDownloadURL } from "firebase/storage";

export default async function downloadAndZipImages(files) {
    try {

        if (files.items.length === 0) {
            console.error('No images found in Firebase Storage.');
            return;
        }

        const zip = new JSZip();

        for (const fileRef of files.items) {
            let imageUrl
            await getDownloadURL(fileRef)
                .then((url) => {
                    imageUrl = url
                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error)
                });
            const response = await fetch(imageUrl);

            if (response.ok) {
                const imageData = await response.blob();
                console.log(imageData)
                const filename = fileRef.name + '.png';
                zip.file(filename, imageData);
            } else {
                console.error(`Failed to download image from Firebase Storage: ${fileRef.name}`);
            }
        }

        if (zip.files.length === 0) {
            console.error('No valid images to zip.');
            return;
        }

        const content = await zip.generateAsync({ type: 'blob' });
        const blobUrl = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'images.zip';
        a.click();
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error downloading images from Firebase Storage:', error);
    }
}