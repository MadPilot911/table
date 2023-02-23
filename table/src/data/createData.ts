import { faker } from "@faker-js/faker";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  name: string;
  email: string;
  address: string;
  jobArea: string;
  phone: string;
}

const tableRows = 1000000;

const createUser = () => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    jobArea: faker.name.jobArea(),
    phone: faker.phone.number(),
  };
};

const createUsers = (numUsers = tableRows) => {
  return Array.from({ length: numUsers }, createUser);
};

export const data = createUsers();

export const columns: ColumnsType<DataType> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
  },
  {
    key: "jobarea",
    title: "Job Area",
    dataIndex: "jobarea",
  },
  {
    key: "phone",
    title: "Phone Number",
    dataIndex: "phone",
  },
];
