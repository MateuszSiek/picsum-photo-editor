# PicsumEditor

Easilly edit images from [picsum.photos](https://picsum.photos/)

![Demo](/docs/demo.mp4)

## Demo link:

Access the app at [picsumeditor.msiek.com](https://picsumeditor.msiek.com)

## Table of Content:

- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Approach](#approach)
- [Developement](#developement)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

PicsumEditor is an extension to [picsum.photos](https://picsum.photos/) that allows you to edit and download photos via friendly user interface

### Home page

![Demo](/docs/home-page.jpg)

### Editor

![Demo](/docs/editor-page.jpg)

## Technologies

PicsumEditor is built using a modern tech stack to ensure high performance and ease of development. Here are the key technologies used:

1. **Programming Languages**:

   - [TypeScript](https://www.typescriptlang.org/)

2. **Frameworks and Libraries**:

   - [Next.js](https://nextjs.org/)
   - [React](https://reactjs.org/)

3. **Styling**:

   - [Tailwind CSS](https://tailwindcss.com/)

4. **Component Library**:

   - [shadcn/ui](https://ui.shadcn.com/)

5. **Testing**:

   - [Jest](https://jestjs.io/)

6. **Linting and Formatting**:

   - [ESLint](https://eslint.org/)
   - [Prettier](https://prettier.io/)

7. **APIs**:
   - [Picsum.photos API](https://picsum.photos/)

Since PicsumEditor is a client-based project, there are no backend technologies or databases involved.

## Approach

In developing PicsumEditor, several thoughtful design decisions and approaches were adopted to ensure a seamless and efficient user experience:

### **Framework**:

- **Next.js**: Although Next.js' advanced features (like server-side rendering) are not heavily utilized at this stage, it provides a solid foundation with its built-in routing and flexibility. Future updates may leverage more of Next.js' capabilities to further improve user experience.

### **State Management**:

- **URL Parameters as State**: The state is managed using URL parameters, ensuring that the application "remembers" the user's settings and location. This allows users to easily navigate back to previous states. The `nuqs` library simplifies this process, providing a `useQueryState` hook that syncs state with the URL. Additionally, the library allows for throttling state updates. For example, when a user drags the blur slider, the URL state is not updated with every single change, preventing a long history of minor updates and instead capturing only significant state changes.

### **Design Decisions**:

- **UI Components**: The application leverages [shadcn/ui](https://ui.shadcn.com/) for its user interface components, making it easier to create a cohesive and aesthetically pleasing UI.
- **Canvas-Based Editing**: Instead of relying on server-side image modification (offered by the Picsum API), all editing is performed on the client-side using the HTML5 canvas. This enables instant feedback and interaction, significantly enhancing the user's experience. Additionally, it allows users to right-click and copy the edited image directly from the canvas.
- **Scaling with `use-resize-observer`**: To ensure images are displayed properly within the view while maintaining high resolution for download, the `use-resize-observer` hook is used to dynamically scale the canvas.

### **Testing**:

- **Jest**: The application is tested using Jest, focusing on core functionalities and snapshot testing. There are plans to extend testing with end-to-end (E2E) tests for more comprehensive coverage.

### **User Experience**:

- **Simplicity and Responsiveness**: The UI is designed to be simple and clean, with transitions that enhance the user experience. Mobile-friendliness was a priority from the beginning, ensuring the app works smoothly on various devices.

In summary, PicsumEditor focuses on providing a smooth and efficient editing experience with emphasis on frontend performance and a responsive, user-friendly interface.

## Developement

To set up and run PicsumEditor on your local machine, follow these steps:

### Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (tested on v21.6.1, but it might work on other versions as well)
- **npm** (tested on v10.2.4, but it might work on other versions as well)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/picsum-photo-editor.git
   cd picsum-photo-editor
   ```

2. **Install the dependencies:**

   ```sh
   npm install
   ```

   3. **Run the development server:**

   ```sh
   npm run dev
   ```

   4. **Open the application:**

Open your web browser and navigate to http://localhost:3000.

### Build for Production

To build the project for production, run the following command:

```sh
npm run build
```

After building, you can start the production server using:

```sh
npm start
```

### Testing

To run the test suite, use the following command:

```sh
npm test
```

To run tests in watch mode, use:

```sh
npm run test:watch
```

### Project Structure

```
picsum-photo-editor/
│
├── __tests__/
│
├── src/
│   ├── app
│   │   ├── editor/[imageId]
│   │   │   ├── page.tsx         # edit view page
│   │   │   ├── context.tsx      # canvas context
│   │   │   ├── designPanel.tsx  # edit panel component
│   │   │   └── imagePreview.tsx # canvas image preview component
│   │   └── page.tsx             # home page with images
│   │
│   ├── components
│   │   ├── ui/                  # shadnc components
│   │   ├── labeledInput.tsx     # input compomponents used by design panel
│   │   └── picsumImageCard.tsx  # image preview card used on the home page
│   │
│   └── lib
│       ├── hooks.tsx            # custom hooks used by the app(eg url state related hooks)
│       ├── picsumApi.tsx        # functions responsible to make the picsum api requests
│       ├── types.tsx            # types
│       └── utils.tsx            # additional utility functions used by the app
|
├── public/              # Public assets like images and fonts
|
└── README.md            # Project documentation
```

## Status

PicsumEditor is currently in a stable release and ready to be used by users. However, there is still room for improvement and further feature development.

### Features to Implement

- **Caching**: The API results can be cached to make navigation around the app smoother, given that the API data does not change frequently.
- **Improved Error Handling**: Currently, there is no error handling implemented, relying on the assumption that the API works correctly. Enhanced error handling will ensure better reliability and user experience.
- **More editing Options**: While the current editing options are simple, there is potential to extend the application with more advanced editing capabilities.

### Known Issues

- **Browser Compatibility**: Context filters are not supported on Safari. This issue can be resolved with the addition of a [polyfill](https://github.com/davidenke/context-filter-polyfill) in future updates.

## Credits

Special credits go to the following libraries and frameworks that significantly contributed to the development of PicsumEditor:

- [shadcn/ui](https://ui.shadcn.com/): For providing a beautiful and easy-to-use component library that significantly enhances the application's UI.
- [nuqs](https://www.npmjs.com/package/nuqs): For state management, making it easier to manage and sync state with URL parameters.
- [Next.js](https://nextjs.org/): For offering a flexible and powerful framework that facilitates the development process with built-in routing and other valuable features.

These tools have been invaluable in building and refining PicsumEditor.

## License

MIT License © [Mateusz Siek](http://msiek.com)
