import DisplayFolder from "@/features/components/DisplayFolder";
import UploadFile from "@/features/components/UploadFile";
import { useState } from "react";
import { IoListOutline } from "react-icons/io5";

export default function AdminListsPage() {
  const [url, setUrl] = useState<string | null>("");

  return (
    <main className="text-gray-400">
      <header>
        <IoListOutline size={40} />
        <h1 className="font-normal">Lists</h1>
      </header>
      <section className=" flex flex-col gap-4">
        <h2 className="">Icons</h2>
        <DisplayFolder initialFolder="lists" />
        <UploadFile foldername="lists" url={url ?? ""} setUrl={setUrl} />
      </section>
      <section>
        <h2>Templates</h2>
      </section>
    </main>
  );
}
