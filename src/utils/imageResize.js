export function calculateResize({ originalWidth, originalHeight, targetWidth, targetHeight, keepAspectRatio = true }) {
    const width = Number(targetWidth) || null;
    const height = Number(targetHeight) || null;

    if (!width && !height) {
        return {
            width: originalWidth,
            height: originalHeight,
        };
    }

    if (!keepAspectRatio) {
        return {
            width: width || originalWidth,
            height: height || originalHeight,
        };
    }

    const aspectRatio = originalWidth / originalHeight;

    if (width && !height) {
        return {
            width,
            height: Math.round(width / aspectRatio),
        };
    }

    if (!width && height) {
        return {
            width: Math.round(height * aspectRatio),
            height,
        };
    }

    const widthRatio = width / originalWidth;
    const heightRatio = height / originalHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    return {
        width: Math.round(originalWidth * ratio),
        height: Math.round(originalHeight * ratio),
    };
}
