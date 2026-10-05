# React Image Converter

A browser-based image converter built with **React**, **Vite**, and **Tailwind CSS**.

Convert, resize, and optimize images directly in your browser without uploading files to a server.

> **Project status:** Active development

## Features

### Image Conversion

- WebP
- AVIF
- JPEG / JPG
- PNG
- Browser-side image processing
- No server-side image upload required

### Image Processing

- Resize images
- Keep aspect ratio
- Set custom width and height
- Quality control for supported formats
- Batch image conversion

### File Management

- Drag and drop images
- Multiple file selection
- Image previews
- Original image dimensions
- Converted image dimensions
- Original and converted file size comparison
- Per-file download
- Remove individual files
- Clear all files
- Automatic ZIP download after batch conversion
- Duplicate filename handling inside ZIP files

### Conversion Process

- Conversion progress
- Per-file conversion status
- Cancel conversion
- Web Worker based image encoding
- Client-side processing

## Privacy

All image processing is performed locally in the user's browser.

Images are not uploaded to a backend server as part of the conversion process.

This project is designed to work without a separate Node.js / Express backend.

## Technology Stack

- React
- Vite
- JavaScript
- Tailwind CSS v4
- Web Workers
- Canvas API
- OffscreenCanvas
- `@jsquash/avif`
- JSZip
- pnpm

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── ImageConverter.jsx
│   ├── DropZone.jsx
│   ├── FileList.jsx
│   ├── FileItem.jsx
│   └── ConverterSettings.jsx
│
├── utils/
│   ├── cx.js
│   ├── imageResize.js
│   ├── imageConverter.js
│   ├── createZip.js
│   └── imageDimensions.js
│
├── workers/
│   └── image.worker.js
│
├── App.jsx
├── main.jsx
└── index.css
```

The project structure is intentionally kept simple.

New functionality should generally be added as a focused component, utility, or processing module rather than introducing unnecessary abstraction.

## Architecture

The application follows a client-side processing architecture:

```text
User
 │
 ▼
React UI
 │
 ├── File Selection
 │
 ├── Conversion Settings
 │
 └── Conversion Controls
 │
 ▼
Image Converter
 │
 ├── Load Image
 ├── Resize
 └── Prepare ImageData
 │
 ▼
Web Worker
 │
 ├── WebP Encoder
 ├── AVIF Encoder
 ├── JPEG Encoder
 └── PNG Encoder
 │
 ▼
Blob
 │
 ├── Individual Download
 │
 └── ZIP Archive
```

Image encoding is moved into a Web Worker where possible so that CPU-intensive processing does not unnecessarily block the main UI thread.

## Supported Formats

| Format | Input | Output | Quality Control |
|---|---:|---:|---:|
| WebP | Yes | Yes | Yes |
| AVIF | Yes | Yes | Yes |
| JPEG | Yes | Yes | Yes |
| PNG | Yes | Yes | No |

Support for additional formats may be added in the future depending on browser support, codec availability, and project requirements.

## Requirements

- Node.js
- pnpm
- A modern browser with support for the required browser APIs

Recommended development environment:

```text
Node.js
pnpm
Modern Chromium / Firefox / Safari
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ghuninew1/React-Image-Converter.git
```

Enter the project directory:

```bash
cd React-Image-Converter
```

Install dependencies:

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

Then open the local development URL shown by Vite.

## Build

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Development Principles

This project follows a few simple principles.

### 1. Browser-first processing

Image processing should remain client-side whenever practical.

Avoid introducing a backend simply for operations that can be safely performed in the browser.

### 2. Keep the architecture simple

The project is intentionally not over-engineered.

Prefer:

- Small React components
- Focused utility modules
- Clear data flow
- Minimal dependencies
- Reusable processing functions

Avoid introducing complex state-management or abstraction layers unless they solve an actual problem.

### 3. Preserve existing behavior

When adding new functionality:

- Keep existing features working
- Avoid unnecessary refactoring
- Make changes incrementally
- Test existing conversion formats after significant changes

### 4. Separate UI and processing

React components should primarily handle:

- User interaction
- State
- Display
- Settings

Image processing logic should remain in utilities and workers where appropriate.

### 5. Add functionality as modules

New functionality should preferably be isolated into an appropriate module.

For example:

```text
components/
    NewFeature.jsx

utils/
    newFeature.js

workers/
    newFeature.worker.js
```

The exact structure can evolve as the project grows.

## Future Development

The project is designed to support additional functionality without requiring a major architectural rewrite.

Potential future modules include:

### Image Processing

- Crop
- Rotate
- Flip
- Sharpen
- Blur
- Grayscale
- Brightness
- Contrast
- Saturation
- Image metadata handling
- Additional optimization options

### Conversion

- Additional image formats
- Format-specific encoding options
- Advanced compression controls
- Automatic format selection
- Presets for common use cases

### Batch Processing

- Larger batch workflows
- Per-file settings
- Batch presets
- Improved queue management
- More detailed progress information

### User Experience

- Before / After preview
- Image comparison
- Better conversion result cards
- Conversion history
- Improved error reporting
- Dark mode
- Responsive mobile interface

### Export

- ZIP configuration
- Custom output filenames
- Filename templates
- Folder structure inside ZIP archives

### Performance

- Improved Web Worker architecture
- Parallel processing where appropriate
- Memory usage optimization
- Large image handling
- Better cancellation and queue management

Not all planned features will necessarily be implemented. Features should be added based on actual requirements and browser capabilities.

## Browser Compatibility

The application relies on modern browser APIs such as:

- Canvas API
- Web Workers
- OffscreenCanvas
- Blob
- File API
- Object URLs
- WebAssembly for selected codecs

Some features may have different levels of browser support.

AVIF encoding is handled through `@jsquash/avif` rather than relying exclusively on browser-native image encoding.

## Deployment

The application is a static client-side application and can be deployed to services such as:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- Other static hosting providers

No application server is required for the core image conversion workflow.

## Repository

GitHub:

https://github.com/ghuninew1/React-Image-Converter

## License

This project is licensed under the MIT License.

See [LICENSE](./LICENSE) for details.

## Roadmap

The roadmap is intentionally flexible and will evolve with the project.

Current development priorities:

- [x] Basic React application
- [x] Drag & Drop
- [x] Batch image selection
- [x] WebP conversion
- [x] AVIF conversion
- [x] JPEG conversion
- [x] PNG conversion
- [x] Image resizing
- [x] Aspect ratio control
- [x] Quality control
- [x] Web Worker processing
- [x] Conversion progress
- [x] Conversion cancellation
- [x] Individual file download
- [x] ZIP export
- [x] Duplicate filename handling
- [x] Original / converted dimensions
- [x] File size comparison
- [ ] Improved result preview
- [ ] Additional image processing tools
- [ ] Additional conversion formats
- [ ] UI/UX improvements
- [ ] Deployment configuration
- [ ] Performance optimization

The roadmap may change as new requirements and use cases are identified.