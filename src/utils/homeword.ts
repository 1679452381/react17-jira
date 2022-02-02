import { useState } from "react";

//使用泛型
export const userArray = <A>(initailArray: A[]) => {
  const [value, setValue] = useState(initailArray);
  return {
    value,
    setValue,
    add: (item: A) => setValue([...value, item]),
    clear: () => setValue([]),
    delete: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
