import React from "react";

// Usage
// 1. child component update its data and changedData
// 2. leaving tab or changing device, update data and changedData to null
// 3. between 1 and 2, have to check date and changedData are different or not
const DataContext = React.createContext({});

export default DataContext;