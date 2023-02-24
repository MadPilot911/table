// @ts-nocheck

import React, { createRef, Fragment, PureComponent } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { faker } from "@faker-js/faker";

const LOADING = 1;
const LOADED = 2;
const ROWSNUMBER = 1000000;
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
          itemCount={ROWSNUMBER}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={height}
              itemCount={ROWSNUMBER}
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
