// import React from "react";
// import "./App.css";
// import { faker } from "@faker-js/faker";
// import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
// interface DataType {
//   name: string;
//   email: string;
//   address: string;
//   jobArea: string;
//   phone: string;
// }

// const tableRows = 10;

// const createUser = () => {
//   return {
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     address: faker.address.streetAddress(),
//     jobArea: faker.name.jobArea(),
//     phone: faker.phone.number(),
//   };
// };

// const createUsers = (numUsers = tableRows) => {
//   return Array.from({ length: numUsers }, createUser);
// };

// const data = createUsers();
// //@ts-ignore
// const Row = ({ index, style }) => (
//   <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
//     Row {index}
//   </div>
// );

// function App() {
//   return (
//     <div style={{ height: 400 }}>
//       <AutoSizer>
//         {
//           // @ts-ignore
//           ({ height, width }) => (
//             <Table
//               width={width}
//               height={height}
//               headerHeight={20}
//               rowHeight={30}
//               // @ts-ignore
//               rowGetter={({ index }) => data[index]}
//             >
//               <Column label="Name" dataKey="name" width={200} />
//               <Column width={300} label="Description" dataKey="description" />
//             </Table>
//           )
//         }
//       </AutoSizer>
//     </div>
//   );
// }

// export default App;

// @ts-nocheck

import React, { createRef, Fragment, PureComponent } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { faker } from "@faker-js/faker";

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 0)
  );
};

class Row extends PureComponent {
  render() {
    const { index, style } = this.props;
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        jobArea: faker.name.jobArea(),
        phone: faker.phone.number(),
      };
    } else {
      label = "Loading...";
    }
    return (
      <div className="row" style={style}>
        <span className="cell">{label.name}</span>
        <span className="cell">{label.email}</span>
        <span className="cell">{label.address}</span>
        <span className="cell">{label.jobArea}</span>
        <span className="cell">{label.phone}</span>
      </div>
    );
  }
}

const Table = () => (
  <div className="table">
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={1000}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={height}
              itemCount={1000}
              itemSize={30}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
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
