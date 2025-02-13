import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";

interface FileData {
  name: string;
  url: string;
  isFolder: boolean;
}

export default function DisplayFolder({
  initialFolder,
  icon,
  handleSelectIcon,
  showFileName = false,
}: {
  initialFolder: string;
  icon?: string;
  handleSelectIcon?: (icon: string) => void;
  showFileName?: boolean;
}) {
  const [folderName, setFolderName] = useState(initialFolder);
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const folderRef = ref(storage, folderName);
      try {
        const result = await listAll(folderRef);
        const fileDataPromises = result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url, isFolder: false };
        });

        const folderData = result.prefixes.map((folder) => ({
          name: folder.name,
          url: "",
          isFolder: true,
        }));

        const fileData = await Promise.all(fileDataPromises);
        setFiles([...folderData, ...fileData]);
      } catch (error) {
        console.error("Error fetching folder contents:", error);
      }
    };

    fetchFiles();
  }, [folderName]);

  return (
    <div className="">
      {/* <h2 className="text-lg font-semibold">Contents of {folderName}</h2> */}
      <div className="mt-2 flex items-stretch flex-wrap gap-4">
        {files.map((file, index) => (
          <div key={index} className="rounded-lg overflow-clip">
            {file.isFolder ? (
              <button
                className="p-2 bg-zinc-500/40 text-blue-500 font-medium"
                onClick={() => setFolderName(file.url)}
              >
                📁 {file.name}
              </button>
            ) : (
              <div
                className={
                  (icon === file.url
                    ? "bg-yellow-500/40 "
                    : "bg-zinc-500/40 ") + " p-2 flex flex-col items-center"
                }
                onClick={() => handleSelectIcon && handleSelectIcon(file.url)}
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-16 w-16 object-cover object-center inline-block mr-2"
                />
                {showFileName === true && <span>{file.name}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
