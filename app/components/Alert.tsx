"use client";

import { ReactNode } from "react";

interface AlertProps {
  type: "success" | "danger" | "warning" | "info";
  message: string | ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

export default function Alert({
  type,
  message,
  onClose,
  dismissible = true,
}: AlertProps) {
  const alertTypeMap = {
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
  };

  const icons: { [key: string]: string } = {
    success: "✅",
    danger: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      className={`alert ${alertTypeMap[type]} ${
        dismissible ? "alert-dismissible fade show" : ""
      } d-flex align-items-center`}
      role="alert"
      style={{ animation: 'slideInDown 0.3s ease', fontSize: '15px', fontWeight: '500' }}
    >
      <span style={{ marginRight: '10px', fontSize: '18px' }}>{icons[type]}</span>
      <span style={{ flex: 1 }}>{message}</span>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
          style={{ opacity: '0.7' }}
        ></button>
      )}
    </div>
  );
}
