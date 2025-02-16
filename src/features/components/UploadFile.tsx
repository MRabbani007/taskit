import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useState,
} from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";

export default function UploadFile({
  url,
  setUrl,
  foldername,
  filename,
  showUploadedImage = false,
  className = "",
}: {
  foldername: string;
  filename?: string;
  showUploadedImage?: boolean;
  className?: string;
  url: string;
  setUrl: Dispatch<SetStateAction<string | null>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileName = filename?.trim() ?? file.name;

    const storageRef = ref(storage, `${foldername}/${fileName}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      setFile(null);
      console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={
          " w-80 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer relative " +
          className
        }
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap">
            Drag & Drop or Click to Upload
          </p>
        )}
        {file && (
          <div className="absolute bottom-0 bg-white bg-opacity-75 w-full text-center text-sm">
            {file.name}
          </div>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
      {showUploadedImage && url && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={url} alt="Uploaded" className="max-w-xs max-h-40 mt-2" />
        </div>
      )}
    </div>
  );
}
