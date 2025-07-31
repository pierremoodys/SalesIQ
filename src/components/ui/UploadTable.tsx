"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// Upload data type
interface UploadFile {
  id: string;
  fileName: string;
  status: "Uploaded" | "Processing" | "Failed";
  uploadDate: string;
}

// Sample data matching the screenshot
const sampleData: UploadFile[] = [
  {
    id: "1",
    fileName: "salesforce_export_2025-05-02.csv",
    status: "Uploaded",
    uploadDate: "2025-05-02",
  },
  {
    id: "2",
    fileName: "salesforce_export_2025-05-03.csv",
    status: "Uploaded",
    uploadDate: "2025-05-03",
  },
  {
    id: "3",
    fileName: "salesforce_export_2025-05-04.csv",
    status: "Uploaded",
    uploadDate: "2025-05-04",
  },
  {
    id: "4",
    fileName: "salesforce_export_2025-05-05.csv",
    status: "Uploaded",
    uploadDate: "2025-05-05",
  },
  {
    id: "5",
    fileName: "salesforce_export_2025-05-06.csv",
    status: "Uploaded",
    uploadDate: "2025-05-06",
  },
  {
    id: "6",
    fileName: "salesforce_export_2025-05-07.csv",
    status: "Uploaded",
    uploadDate: "2025-05-07",
  },
  {
    id: "7",
    fileName: "salesforce_export_2025-05-08.csv",
    status: "Uploaded",
    uploadDate: "2025-05-08",
  },
  {
    id: "8",
    fileName: "salesforce_export_2025-05-09.csv",
    status: "Uploaded",
    uploadDate: "2025-05-09",
  },
  {
    id: "9",
    fileName: "salesforce_export_2025-05-10.csv",
    status: "Uploaded",
    uploadDate: "2025-05-10",
  },
  {
    id: "10",
    fileName: "salesforce_export_2025-05-11.csv",
    status: "Uploaded",
    uploadDate: "2025-05-11",
  },
  {
    id: "11",
    fileName: "salesforce_export_2025-05-12.csv",
    status: "Uploaded",
    uploadDate: "2025-05-12",
  },
  {
    id: "12",
    fileName: "salesforce_export_2025-05-13.csv",
    status: "Uploaded",
    uploadDate: "2025-05-13",
  },
  {
    id: "13",
    fileName: "salesforce_export_2025-05-14.csv",
    status: "Uploaded",
    uploadDate: "2025-05-14",
  },
  {
    id: "14",
    fileName: "salesforce_export_2025-05-15.csv",
    status: "Uploaded",
    uploadDate: "2025-05-15",
  },
  {
    id: "15",
    fileName: "salesforce_export_2025-05-16.csv",
    status: "Uploaded",
    uploadDate: "2025-05-16",
  },
  {
    id: "16",
    fileName: "salesforce_export_2025-05-17.csv",
    status: "Uploaded",
    uploadDate: "2025-05-17",
  },
  {
    id: "17",
    fileName: "salesforce_export_2025-05-18.csv",
    status: "Uploaded",
    uploadDate: "2025-05-18",
  },
  {
    id: "18",
    fileName: "salesforce_export_2025-05-19.csv",
    status: "Uploaded",
    uploadDate: "2025-05-19",
  },
];

interface UploadTableProps {
  data?: UploadFile[];
  onDelete?: (id: string) => void;
}

const UploadTable: React.FC<UploadTableProps> = ({
  data = sampleData,
  onDelete,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  // Define columns
  const columns: ColumnDef<UploadFile>[] = [
    {
      accessorKey: "fileName",
      header: "File name",
      cell: ({ getValue }: any) => (
        <span className="text-sm text-gray-900 font-medium">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }: any) => {
        const status = getValue() as string;
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }: any) => (
        <button
          onClick={() => onDelete?.(row.original.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-150"
          aria-label={`Delete ${row.original.fileName}`}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater: any) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
      }
    },
    manualPagination: false,
  });

  const totalRows = data.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table */}
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr
                key={headerGroup.id}
                className="border-b border-gray-200 bg-gray-50"
              >
                {headerGroup.headers.map((header: any) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        {/* Pagination controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-700 font-medium">
            {table.getState().pagination.pageIndex + 1}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          Showing {startRow}-{endRow} of {totalRows}
        </div>
      </div>
    </div>
  );
};

export default UploadTable;
