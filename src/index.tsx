import React from "react";

interface UpdateAtProps {
  dates: Date[];
  delay?: number;
}

interface UpdateAtCompProps extends UpdateAtProps {
  children: React.ReactElement;
}

function useForceUpdate() {
  const [, setValue] = React.useState(0);
  return () => setValue((value) => value + 1);
}

const shouldUpdate = (date: Date): boolean => {
  if (new Date() < date) return false;
  return true;
};

const checkDates = (dates: Date[]) => {
  for (const date of dates) {
    if (shouldUpdate(date)) return true;
  }
  return false;
};

const UpdateAt = ({ dates, delay = 10, children }: UpdateAtCompProps) => {
  const forceUpdate = useForceUpdate();
  React.useEffect(() => {
    let timeoutRefs: number[] = [];
    const timeoutFactory = () => {
      for (const date of dates) {
        timeoutRefs.push(
          window.setTimeout(
            () => forceUpdate(),
            Math.abs(date.getTime() - Date.now()) + delay
          )
        );
      }
    };
    // is there any date in future
    if (!checkDates(dates)) timeoutFactory();
    // cleanup
    return () => {
      if (timeoutRefs.length) {
        for (const timeout of timeoutRefs) {
          clearTimeout(timeout);
        }
      }
    };
  }, [dates]);
  return React.cloneElement(children);
};

const withUpdateAt = (Component: typeof React.Component) => ({
  dates,
  delay,
  ...props
}: UpdateAtProps) => {
  if (Component === undefined) {
    throw new Error(
      [
        "You are calling withUpdateAt(props)(Component) with an undefined component.",
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
