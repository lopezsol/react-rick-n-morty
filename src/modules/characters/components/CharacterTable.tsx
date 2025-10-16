import { useEffect, useState } from "react";
import { DataTable, type DataTableStateEvent } from "primereact/datatable";
import { Column, type ColumnBodyOptions } from "primereact/column";
import { Button } from "primereact/button";
import { getCharactersByPage } from "../services/character.service";
import type { Character } from "../interfaces/character.interface";

export const CharacterTable = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<1 | -1 | 0>(0);
  const ROWS_PER_PAGE = 20;
  
  useEffect(() => {
    getCharactersByPage(page).then((data) => {
      setCharacters(data.results);
      setTotalRecords(data.info.count);
    });
  }, [page]);

  const onPageChange = (event: DataTableStateEvent) => {
    const newPage = (event.page || 0) + 1;
    setPage(newPage);
  };

  const viewDetailsTemplate = (
    rowData: Character,
    options: ColumnBodyOptions
  ) => {
    const icon = "pi pi-eye";
    // const disabled = options.frozenRow ? false : lockedCustomers.length >= 2;

    console.log({ rowData });
    console.log({ options });
    return (
      <Button
        type="button"
        icon={icon}
        // disabled={disabled}
        className="p-button-sm p-button-text"
        // onClick={() => toggleLock(rowData, options.frozenRow, options.rowIndex)}
      />
    );
  };

  const onSort = (event: DataTableStateEvent) => {
    setSortField(event.sortField || null);
    setSortOrder(event.sortOrder || 0);

    const sorted = [...characters].sort((a, b) => {
      if (!event.sortField) return 0;

      const value1 = a[event.sortField as keyof Character];
      const value2 = b[event.sortField as keyof Character];

      let compareResult = 0;
      if (value1 < value2) {
        compareResult = -1;
      } else if (value1 > value2) {
        compareResult = 1;
      }

      return compareResult * (event.sortOrder || 1);
    });

    setCharacters(sorted);
  };

  return (
    <div className="card">
      <DataTable
        value={characters}
        stripedRows
        paginator
        lazy
        first={(page - 1) * ROWS_PER_PAGE}
        rows={ROWS_PER_PAGE}
        totalRecords={totalRecords}
        onPage={onPageChange}
        scrollable
        scrollHeight="700px"
        tableStyle={{ minWidth: "50rem" }}
        onSort={onSort}
        sortField={sortField || undefined}
        sortOrder={sortOrder || undefined}
        sortMode="single"
      >
        <Column
          field="name"
          header="Name"
          style={{ width: "25%" }}
          sortable
        ></Column>
        <Column
          field="status"
          header="Status"
          style={{ width: "25%" }}
          sortable
        ></Column>
        <Column field="gender" header="Gender"></Column>
        <Column
          field="origin.name"
          header="Origin"
          style={{ width: "25%" }}
        ></Column>

        <Column
          style={{ flex: "0 0 4rem" }}
          body={viewDetailsTemplate}
        ></Column>
      </DataTable>
    </div>
  );
};
