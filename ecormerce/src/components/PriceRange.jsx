import { Slider } from "antd";
import React from "react";

const onChange = (value) => {
  console.log("onChange: ", value);
};

const onChangeComplete = (value) => {
  console.log("onChangeComplete: ", value);
};

function PriceRange() {
  return (
    <div>
      <Slider
        defaultValue={0}
        step={50000}
        max={5000000}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />
      <div className="flex justify-between  items-center">
        <span>0đ</span>
        <span>5.000.000đ</span>
      </div>
    </div>
  );
}

export default PriceRange;
