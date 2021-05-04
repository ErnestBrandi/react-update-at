# react-update-at

[![NPM](https://img.shields.io/npm/v/react-update-at.svg)](https://www.npmjs.com/package/react-update-at) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-update-at
yarn add react-update-at
```

## Usage

```tsx
import UpdateAt from "react-update-at";

const ComponentToUpdate = () => {
  return <div>{new Date().toString()}</div>;
};

const App = () => {
  return (
    // update 5s after first render
    <UpdateAt dates={[new Date(Date.now() + 5e3)]}>
      <ComponentToUpdate />
    </UpdateAt>
  );
};
```

## License

MIT
