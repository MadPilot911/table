import { Fragment, PureComponent } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { faker } from "@faker-js/faker";
import { ThreeDots } from "react-loader-spinner";

const LOADING = 1;
const LOADED = 2;
const ROWS_NUMBER = 1000000;
const ITEM_SIZE = 30;
const LOAD_DELAY = 1200;

let itemStatusMap: { [index: string]: number } = {};

interface DataType {
  name: string;
  email: string;
  address: string;
  jobArea: string;
  phone: string;
}

const isItemLoaded = (index: number): boolean => !!itemStatusMap[index];

const loadMoreItems = (
  startIndex: number,
  stopIndex: number
): Promise<void> => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, LOAD_DELAY)
  );
};

interface RowProps {
  index: number;
  style: object;
  data: object;
}

const Row = (props: RowProps) => {
  const { index, style } = props;
  let label: DataType | Partial<DataType>;
  const isLoaded = itemStatusMap[index] === LOADED;
  if (isLoaded) {
    label = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      jobArea: faker.name.jobArea(),
      phone: faker.phone.number(),
    };
  } else {
    label = { name: "Loading" };
  }
  return isLoaded ? (
    <tr className="row" style={style}>
      <td className="cell">{label.name}</td>
      <td className="cell">{label.email}</td>
      <td className="cell">{label.address}</td>
      <td className="cell">{label.jobArea}</td>
      <td className="cell">{label.phone}</td>
    </tr>
  ) : (
    <tr className="row" style={style}>
      <ThreeDots
        height="40"
        width="40"
        radius="4"
        color="gray"
        ariaLabel="three-dots-loading"
        wrapperClass="loader"
        visible={true}
      />
    </tr>
  );
};

const Table = () => (
  <div className="table">
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={ROWS_NUMBER}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={height}
              itemCount={ROWS_NUMBER}
              itemSize={ITEM_SIZE}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
              innerElementType="table"
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  </div>
);

export default function App() {
  return (
    <Fragment>
      <Table />
    </Fragment>
  );
}
