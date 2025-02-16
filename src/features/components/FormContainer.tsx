import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { BiX } from "react-icons/bi";

type Props = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  title: string;
  subtitle?: string | null;
  submitButton?: string;
  children?: ReactNode;
  onSubmit: (event: FormEvent) => void;
  deleteButton?: boolean;
  handleDelete?: () => void;
};

export default function FormContainer({
  showForm,
  setShowForm,
  title,
  subtitle = null,
  submitButton = "Submit",
  children,
  onSubmit,
  deleteButton = false,
  handleDelete = () => {},
}: Props) {
  const handleReset = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const handleEscape = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        setShowForm(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div
        className={(showForm ? "" : "") + " fixed inset-0 bg-zinc-900/50 z-10"}
      />
      <div className="fixed inset-0 flex items-center justify-center z-20 p-8">
        <form
          onSubmit={onSubmit}
          onReset={handleReset}
          className="bg-zinc-100 rounded-lg shadow-md-shadow-white z-[100] overflow-clip w-full max-w-[500px]"
        >
          {/* Form Title */}
          <div className="bg-zinc-800 text-white relative p-4">
            <p className="font-medium">{title}</p>
            {subtitle && <p>{subtitle}</p>}
            <button
              type="reset"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <BiX size={25} />
            </button>
          </div>
          {/* Body */}
          <div className="h-full max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-4 p-4">{children}</div>
          </div>
          {/* Form Buttons */}
          <div className="flex items-center justify-center gap-2 p-2">
            <button
              type="submit"
              className="bg-zinc-800 rounded-md py-2 px-4 text-white"
            >
              {submitButton}
            </button>
            <button
              type="reset"
              className="bg-zinc-200 rounded-md py-2 px-4 text-zinc-900"
            >
              Cancel
            </button>
            {deleteButton && (
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
