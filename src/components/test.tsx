import React, { useEffect, useState } from "react";

// react hook 与 闭包
export default function Test() {
  const [num, setNum] = useState(0);

  //引用的是页面加载时的值
  useEffect(() => {
    return () => {
      console.log("卸载时", num);
    };
  }, []);

  return (
    <div>
      {num}
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        {" "}
        add
      </button>
    </div>
  );
}
