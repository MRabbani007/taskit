import { DatePicker, Modal, Switch } from "antd";

import CardFilterList from "./CardFilterList";
import CardFilterDueDate from "./CardFilterDueDate";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskState";
const { RangePicker } = DatePicker;

export default function TaskFilter() {
  const { filters, setFilters } = useContext(TaskContext);

  return (
    <Modal
      open={filters?.viewFilter}
      title="Filter Tasks"
      okText="Apply"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setFilters((curr) => ({ ...curr, viewFilter: false }))}
      onOk={() => setFilters((curr) => ({ ...curr, viewFilter: false }))}
      destroyOnClose={true}
      modalRender={(dom) => <>{dom}</>}
    >
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex items-center gap-2">
          <Switch
            size="small"
            checked={filters?.showCompleted ?? true}
            onChange={() =>
              setFilters((curr) => ({
                ...curr,
                showCompleted: !curr.showCompleted,
              }))
            }
            id="filter_completed"
            label="Completed"
          />
          <label htmlFor="filter_completed">Completed</label>
        </div>
        <div>
          <Switch
            checked={filters?.showPLow ?? true}
            onChange={() =>
              setFilters((curr) => ({ ...curr, viewFilter: false }))
            }
            id="showPLow"
            size="small"
          />
          <label htmlFor="showPLow">Low</label>
        </div>
        <div>
          <Switch
            checked={filters?.showPNormal ?? true}
            onChange={() =>
              setFilters((curr) => ({ ...curr, viewFilter: false }))
            }
            id="showPNormal"
            size="small"
          />
          <label htmlFor="showPNormal">Normal</label>
        </div>
        <div>
          <Switch
            checked={filters?.showPlow}
            onChange={() =>
              setFilters((curr) => ({ ...curr, viewFilter: false }))
            }
            id="showPHigh"
            size="small"
          />
          <label htmlFor="showPHigh">High</label>
        </div>
        <CardFilterList filters={filters} setFilters={setFilters} />
        <CardFilterDueDate />
      </div>
    </Modal>
  );
}
