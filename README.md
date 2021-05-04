# react-update-at

> React wrapper to re-render a component at a certain time

[![NPM](https://img.shields.io/npm/v/react-update-at.svg)](https://www.npmjs.com/package/react-update-at) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Why ?

Sometime, especially when working with dates, you want your component to re-render even if neither it's `props` and `states` have changed.

For instance take an event described by the following object

```
{
    title: "My sweet event",
    dates: {
        start: "2021-01-01T10:00:00",
        end: "2021-01-01T11:00:00"
    }
}
```

You might want the component using this object to display the following labels : `upcoming`, `in progress`, `passed` depending on the current time.
Unfortunatly the object describing the event remaining the same the related component will not re-render unless you force it to.

This is where `react-update-at` comes handy. It let you simply wrap the component you wanna see updated with a `UpdateAt` component **OR** with a `withUpdateAt` function.

## Example

[![Edit react-update-at-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-update-element-forked-r0bzp?fontsize=14&hidenavigation=1&theme=dark)

## Install

```bash
npm install react-update-at
// or
yarn add react-update-at
```

## Usage

With the `UpdateAt` component

```tsx
import UpdateAt from "react-update-at";

const ComponentToUpdate = () => {
  return <div>{new Date().toString()}</div>;
};

const App = () => {
  return (
    // update 5s after first rendering
    <UpdateAt dates={[new Date(Date.now() + 5e3)]}>
      <ComponentToUpdate />
    </UpdateAt>
  );
};
```

With the `withUpateAt` function

```tsx
import { withUpdateAt } from "react-update-at";

const EventTimeLabel = ({ event }: Props) => {
  return <>{/* playing with dates */}</>;
};

const EventTimeLabelUpdateAt = withUpdateAt(EventTimeLabel);

const App = () => {
  const event = {
    /* as above */
  };
  return (
    <EventTimeLabelUpdateAt
      event={event}
      dates={[new Date(event.dates.start), new Date(event.dates.end)]}
    />
  );
};
```

## Options

| props |          | default | type     |                                                                                                                                 |
| ----- | -------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| dates | required |         | `Date[]` | When to trigger the re-render                                                                                                   |
| delay | optional | 10(ms)  | `number` | Because wrapped components will usualy interact with dates, you can set a delay in order for that component to behave correctly |

## License

MIT
