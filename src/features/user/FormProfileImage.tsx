import { Dispatch, FormEvent, SetStateAction } from "react";
import UploadFile from "../components/UploadFile";
import FormContainer from "../components/FormContainer";

export default function FormProfileImage({
  url,
  setUrl,
  filename,
  edit,
  setEdit,
}: {
  url: string;
  setUrl: Dispatch<SetStateAction<string | null>>;
  filename: string;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setEdit(false);
  };

  console.log(url);

  return (
    <FormContainer
      title="Update Profile Image"
      submitButton="Save"
      showForm={edit}
      setShowForm={setEdit}
      onSubmit={onSubmit}
    >
      <div className="text-zinc-400">
        <UploadFile
          foldername="users/profile"
          setUrl={setUrl}
          url={url}
          filename={filename}
          className="rounded-full max-w-20 max-h-20"
        />
      </div>
    </FormContainer>
  );
}
