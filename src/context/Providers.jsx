import React from "react";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserState";
import { GlobalProvider } from "./GlobalState";
import { ListProvider } from "./ListState";
import { TaskProvider } from "./TaskState";
import { NotesProvider } from "./NotesState";
import { JournalProvider } from "./JournalState";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalProvider>
          <ListProvider>
            <TaskProvider>
              <NotesProvider>
                <JournalProvider>{children}</JournalProvider>
              </NotesProvider>
            </TaskProvider>
          </ListProvider>
        </GlobalProvider>
      </UserProvider>
    </AuthProvider>
  );
}
