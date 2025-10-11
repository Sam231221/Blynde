import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteUserMutation } from "../../lib/django/userApi";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: { id: string; name: string };
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  user,
}: DeleteModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { isPending } = useDeleteUserMutation();
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-md ${
          isOpen ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Deletion
            </h3>
          </div>
          <p className="mb-6 text-sm text-gray-500">
            Are you sure you want to delete{" "}
            {user.name ? `the user "${user.name}"` : "this user"}? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isPending ? "Deleting..." : "Yes, Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
