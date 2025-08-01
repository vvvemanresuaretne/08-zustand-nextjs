"use client";

import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import ErrorText from "../Error/ErrorText";
import { fetchNoteById } from "@/lib/api/clientApi";

type NotePreviewProps = {
  id: string;
  onClose: () => void;
};

export default function NotePreview({ id, onClose }: NotePreviewProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  console.log("Note preview", id);

  console.log("Note preview", note);

  const formattedDate = note?.createdAt
    ? new Date(note.createdAt).toLocaleString("en-GB", { timeZone: "UTC" })
    : "";

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorText message="Something went wrong." />}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
              <button className={css.backBtn} onClick={onClose}>
                Go back
              </button>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        </div>
      )}
    </>
  );
}
