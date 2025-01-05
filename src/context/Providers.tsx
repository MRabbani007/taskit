import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserState";
import { TaskProvider } from "./TaskState";
import { NotesProvider } from "./NotesState";
import { JournalProvider } from "./JournalState";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { App, ConfigProvider } from "antd";
import { ListProvider } from "./ListState";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ListProvider>
          <TaskProvider>
            <NotesProvider>
              <JournalProvider>
                <App>
                  <ConfigProvider
                    theme={{
                      components: {
                        Menu: { margin: 0 },
                      },
                    }}
                  >
                    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
                  </ConfigProvider>
                </App>
              </JournalProvider>
            </NotesProvider>
          </TaskProvider>
        </ListProvider>
      </UserProvider>
    </AuthProvider>
  );
}
