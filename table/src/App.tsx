import React, { useMemo } from "react";
import "./App.css";
import { data } from "./data/createData";
import { columns } from "./data/createData";
import { Table } from "antd";
import { VList } from "virtuallist-antd";

const App: React.FC = () => {
  const vComponents = useMemo(() => {
    return VList({
      height: 1000,
    });
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      sticky={true}
      // loading={loading}
      scroll={{
        y: 1000,
      }}
      components={vComponents}
    />
  );
};

export default App;
