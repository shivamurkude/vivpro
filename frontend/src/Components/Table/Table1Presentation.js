import React, { useState } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { FaSearch, FaSortUp, FaSortDown } from 'react-icons/fa';

const Table1Presentation = ({ data, columns }) => {
  const [showAll, setShowAll] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="w-full overflow-x-auto min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col gap-4">
        <GlobalSearchFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="relative">
          <table {...getTableProps()} className="min-w-max rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-3 py-2 text-left text-sm font-medium text-gray-700 uppercase cursor-pointer"
                      style={{ width: column.width }}
                      key={column.id}
                    >
                      <div className="flex items-center justify-between">
                        <span>{column.render('Header')}</span>
                        <div className="flex flex-col">
                          <FaSortUp
                            className={`text-xs ${
                              column.isSorted && !column.isSortedDesc
                                ? 'text-red-400'
                                : 'text-gray-300'
                            }`}
                          />
                          <FaSortDown
                            className={`text-xs ${
                              column.isSortedDesc
                                ? 'text-red-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {(showAll ? data : page).map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50" key={row.id}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-3 py-2 text-sm font-normal text-gray-700"
                          key={cell.column.id}
                        >
                          {cell.column.id === 'mode' ? (cell.value ? 1 : 0) : cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
        
       
      </div>
      
    </div>
  );
};

const GlobalSearchFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>
    </div>
  );
};



export { Table1Presentation };
