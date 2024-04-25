import React from "react";
import { Popconfirm as PopconfirmM } from "antd";
import Button from "../Button";

export default function Popconfirm({
  showCancel = true,
  description,
  ...props
}) {
  return (
    <PopconfirmM
      {...props}
      showCancel={false}
      okButtonProps={{ hidden: true }}
      description={
        <>
          {description}
          <div className="flex justify-end gap-2 mt-2">
            {showCancel && (
              <Button
                outline={true}
                className="btn-xs"
                onClick={props.onCancel}
              >
                {props.cancelText || "Cancel"}
              </Button>
            )}
            <Button className="btn-xs" onClick={props.onConfirm}>
              {props.okText || "Ok"}
            </Button>
          </div>
        </>
      }
    />
  );
}
