import React from "react";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserState";
import { GlobalProvider } from "./GlobalState";
import { ListProvider } from "./ListState";
import { TaskProvider } from "./TaskState";
import { NotesProvider } from "./NotesState";
import { JournalProvider } from "./JournalState";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { App, ConfigProvider } from "antd";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalProvider>
          <ListProvider>
            <TaskProvider>
              <NotesProvider>
                <JournalProvider>
                  <App>
                    <ConfigProvider>
                      <DndProvider backend={HTML5Backend}>
                        {children}
                      </DndProvider>
                    </ConfigProvider>
                  </App>
                </JournalProvider>
              </NotesProvider>
            </TaskProvider>
          </ListProvider>
        </GlobalProvider>
      </UserProvider>
    </AuthProvider>
  );
}
