import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { BiX } from "react-icons/bi";

export default function Drawer({
  show,
  setShow,
  children,
  onSubmit,
  title,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  title: string;
  onSubmit: (event: FormEvent) => void;
}) {
  const handleReset = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShow(false); // Call the function to close the form
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [show]);

  return (
    <>
      <div
        onClick={() => setShow(false)}
        className={
          (show ? "" : " translate-y-full ") +
          " fixed inset-0 bg-zinc-900/50 z-10 duration-100 ease-linear"
        }
      />
      <div
        className={
          (show ? "" : "translate-y-full ") +
          "fixed bottom-0 left-0 right-0 w-full lg:max-w-[90vw] mx-auto flex items-center justify-center z-20"
        }
      >
        <form
          onSubmit={onSubmit}
          onReset={handleReset}
          className={
            (show ? "" : " translate-y-full ") +
            " bg-white min-h-[60vh] max-h-[90vh] flex-1 flex flex-col rounded-t-lg duration-200"
          }
        >
          <div className="flex items-center justify-between p-4">
            <p className="text-2xl font-bold">{title}</p>
            <button
              type="reset"
              className="hover:bg-zinc-100 duration-200 rounded-md p-1"
            >
              <BiX size={25} />
            </button>
          </div>
          <div className="flex-1 overflow-y-scroll">
            <div className="p-4 flex flex-col">{children}</div>
          </div>
        </form>
      </div>
    </>
  );
}
