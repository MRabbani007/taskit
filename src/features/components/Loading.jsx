import { Spin } from "antd";
import React from "react";

export default function Loading({ size = "large" }) {
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, .2)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  return (
    <div className="mx-auto w-fit my-4">
      <Spin tip="Loading" size={size}>
        {content}
      </Spin>
    </div>
  );
}
