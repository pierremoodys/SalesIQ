import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  type?: "warning" | "danger" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  type = "warning",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-6 h-6 ${getIconColor()}`}>
              <ExclamationTriangleIcon className="w-6 h-6" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <DialogTitle className="text-lg font-medium text-gray-900 mb-2">
                {title}
              </DialogTitle>
              <p className="text-sm text-gray-700 mb-6">{message}</p>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  palette="secondary"
                  size="m"
                >
                  {cancelButtonText}
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirm}
                  variant="outline"
                  palette={type === "danger" ? "negative" : "primary"}
                  size="m"
                >
                  {confirmButtonText}
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
