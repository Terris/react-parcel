# React Parcel

React components for fetching and displaying Parcels.

## Installation

```bash
npm install @lumberyard/@lumberyard/react-parcel
# or
yarn add @lumberyard/@lumberyard/react-parcel
```

This package uses [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize HTML content and prevent XSS attacks.

## Usage

### Basic Usage

```jsx
import { Parcel, ParcelReader } from "@lumberyard/react-parcel";

function MyComponent() {
  return (
    <Parcel apiKey="your-api-key" parcelKey="your-parcel-key">
      {({ name, description, document }) => (
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <ParcelReader document={document} />
        </div>
      )}
    </Parcel>
  );
}
```

### With Provider

You can also use the `ParcelProvider` to provide the API key to all Parcel components in your application:

```jsx
import { ParcelProvider, Parcel, ParcelReader } from "@lumberyard/react-parcel";

function App() {
  return (
    <ParcelProvider apiKey="your-api-key">
      <YourAppContent />
    </ParcelProvider>
  );
}

function YourAppContent() {
  return (
    <Parcel parcelKey="your-parcel-key">
      {({ name, description, document }) => (
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <ParcelReader document={document} />
        </div>
      )}
    </Parcel>
  );
}
```

### Using with Parcel Editor

When using the `ParcelReader` with content generated in the Parcel Editor, you can use the built-in sanitizer configuration:

```jsx
import {
  Parcel,
  ParcelReader,
  defaultSanitizerConfig,
} from "@lumberyard/react-parcel";

function ParcelContentRenderer() {
  return (
    <Parcel apiKey="your-api-key" parcelKey="your-parcel-key">
      {({ document }) => (
        <ParcelReader
          document={document}
          sanitizeOptions={defaultSanitizerConfig}
        />
      )}
    </Parcel>
  );
}
```

This configuration ensures that all HTML elements and attributes generated by Parcel Editor are preserved, while still protecting against XSS attacks.

### Next.js Support

For Next.js applications, import from the `/next` subpath:

```jsx
import {
  Parcel,
  ParcelProvider,
  ParcelReader,
} from "@lumberyard/react-parcel/next";
```

This ensures that the "use client" directive is properly applied to components used in Next.js server components.

## API Reference

### Parcel Component

| Prop        | Type                                                                          | Required | Description                                          |
| ----------- | ----------------------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `parcelKey` | string                                                                        | Yes      | The key to identify the parcel to fetch              |
| `apiKey`    | string                                                                        | No\*     | API key for authentication (required if no provider) |
| `children`  | (props: { name: string, description: string, document: string }) => ReactNode | Yes      | Render prop function to display the parcel data      |
| `className` | string                                                                        | No       | CSS class to apply to the container                  |

\*The apiKey can be provided either through the component prop or through a ParcelProvider higher in the component tree.

### ParcelReader Component

| Prop              | Type                      | Required | Description                             |
| ----------------- | ------------------------- | -------- | --------------------------------------- |
| `document`        | string                    | Yes      | HTML content to render                  |
| `className`       | string                    | No       | CSS class to apply to the container     |
| `sanitizeOptions` | DOMPurify.SanitizeOptions | No       | Options for DOMPurify HTML sanitization |

### ParcelProvider Component

| Prop         | Type      | Required | Description                                              |
| ------------ | --------- | -------- | -------------------------------------------------------- |
| `apiKey`     | string    | Yes      | API key to use for all child Parcel components           |
| `apiBaseUrl` | string    | No       | Base URL for the API (defaults to http://127.0.0.1:3211) |
| `children`   | ReactNode | Yes      | Child components                                         |

## License

MIT
