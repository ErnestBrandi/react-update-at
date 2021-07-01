import React from "react";

interface UpdateAtProps {
  dates: Date[];
  delay?: number;
  [x: string]: unknown;
}

interface UpdateAtCompProps extends UpdateAtProps {
  children: React.ReactElement;
}

function useForceUpdate() {
  const [, setValue] = React.useState(0);
  return () => setValue((value) => value + 1);
}

const wouldUpdate = (date: Date): boolean => {
  if (date > new Date()) return true;
  return false;
};

const shouldProcessDates = (dates: Date[]) => {
  for (const date of dates) {
    if (wouldUpdate(date)) return true;
  }
  return false;
};

const UpdateAt = ({
  dates,
  delay = 10,
  children
}: UpdateAtCompProps): JSX.Element => {
  // init hook
  const forceUpdate = useForceUpdate();
  // useEffect hook
  React.useEffect(() => {
    if (!dates || dates.length < 1) return;

    const timeoutRefs: number[] = [];
    const timeoutFactory = () => {
      for (const date of dates) {
        if (wouldUpdate(date)) {
          timeoutRefs.push(
            window.setTimeout(
              () => forceUpdate(),
              Math.abs(date.getTime() - Date.now()) + delay
            )
          );
        }
      }
    };
    // is there any date in future
    if (shouldProcessDates(dates)) timeoutFactory();
    // cleanup
    return () => {
      if (timeoutRefs.length) {
        for (const timeout of timeoutRefs) {
          clearTimeout(timeout);
        }
      }
    };
  }, [dates, delay, forceUpdate]);
  // clone element so it can be updated
  return children ? (
    React.cloneElement(children)
  ) : (
    <React.Fragment></React.Fragment>
  );
};

const withUpdateAt =
  (Component: React.ElementType): React.ElementType =>
  ({ dates, delay, ...props }: UpdateAtProps): JSX.Element => {
    if (Component === undefined) {
      throw new Error(
        [
          "You are calling withUpdateAt(Component) with an undefined component.",
          "You may have forgotten to import it."
        ].join("\n")
      );
    }
    return (
      <UpdateAt dates={dates} delay={delay}>
        <Component {...props} />
      </UpdateAt>
    );
  };

export { withUpdateAt };
export default UpdateAt;