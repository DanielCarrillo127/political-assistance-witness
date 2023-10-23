// Import the JSZip library (make sure you include it in your project)
import JSZip from 'jszip';

// Function to download and zip the images
export default async function downloadAndZipImages(imageUrls) {
    const zip = new JSZip();

    // Iterate through the image URLs
    console.log('init', imageUrls);
    // imageUrls.map((imageUrl) => {
    //     console.log('iteration', imageUrl);
    // })
    // const imagetest = [
    //     "https://firebasestorage.googleapis.com/v0/b/vote-cdn.appspot.com/o/77030275-IE%20CIRO%20PUPO%20MARTINEZ-23?alt=media&token=aa28f6c6-7fce-4f1d-ba97-17fb59bdba0d",
    //     "https://firebasestorage.googleapis.com/v0/b/vote-cdn.appspot.com/o/1192812094-IE%20CIRO%20PUPO%20MARTINEZ-5?alt=media&token=b62056ff-725e-4250-ab5f-d43b6d4f537c"
    // ]


    for (const imageUrl of imageUrls) {
        // Fetch the image data
        const response = await fetch(imageUrl);
        console.log('iteration', imageUrl);
        if (response.ok) {
            const imageData = await response.blob();

            const match = imageUrl.match(/\/o\/(.*?)\?alt/);
            const extractedSubstring = match[1];
            // Replace % with spaces in the extracted substring
            let replacedSubstring = extractedSubstring.replace(/%/g, ' ');

            const filename = replacedSubstring + '.png';
            // Add the image data to the ZIP file
            zip.file(filename, imageData);
        } else {
            console.error(`Failed to fetch ${imageUrl}`);
        }
    }

    //  Generate the ZIP file
    zip.generateAsync({ type: 'blob' }).then((content) => {
        // Create a download link and trigger the download
        const blobUrl = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'images.zip'; // Change the filename as needed
        a.click();
        URL.revokeObjectURL(blobUrl);
    });
}
