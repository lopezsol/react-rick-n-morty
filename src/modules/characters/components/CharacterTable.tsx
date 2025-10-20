import { useEffect, useState } from "react";
import { DataTable, type DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { CharacterDialog } from "./CharacterDialog";
import { ToastService } from "../../common/services/ToastService";
import { getCharactersByPage } from "../services/character.service";
import type { Character } from "../interfaces/character.interface";

export const CharacterTable = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<1 | -1 | 0>(0);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const ROWS_PER_PAGE = 20;

  useEffect(() => {
    setIsLoading(true);

    getCharactersByPage(page)
      .then((data) => {
        setCharacters(data.results);
        setTotalRecords(data.info.count);
      })
      .catch((error) => {
        console.error(error);
        ToastService.showError("Error loading characters");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const onPageChange = (event: DataTableStateEvent) => {
    const newPage = (event.page || 0) + 1;
    setPage(newPage);
  };

  const viewDetailsTemplate = (rowData: Character) => {
    const icon = "pi pi-eye";
    return (
      <Button
        type="button"
        icon={icon}
        className="p-button-sm p-button-text"
        onClick={() => {
          setIsDialogVisible(true);
          setSelectedCharacter(rowData);
        }}
      />
    );
  };

  const onSort = (event: DataTableStateEvent) => {
    const field = event.sortField as keyof Character;
    const order = event.sortOrder === 1 ? 1 : -1;

    setSortField(field);
    setSortOrder(order);

    const sorted = [...characters].sort((a, b) => {
      const rawA = a[field];
      const rawB = b[field];
      const valA = (
        typeof rawA === "object" && rawA !== null ? "" : String(rawA ?? "")
      ).toLowerCase();
      const valB = (
        typeof rawB === "object" && rawB !== null ? "" : String(rawB ?? "")
      ).toLowerCase();

      if (valA < valB) return -1 * order;
      if (valA > valB) return 1 * order;
      return 0;
    });

    setCharacters(sorted);
  };

  const handleHideDialog = () => {
    if (!isDialogVisible) return;
    setIsDialogVisible(false);
  };

  return (
    <>
      <CharacterDialog
        visible={isDialogVisible}
        character={selectedCharacter}
        handleHide={handleHideDialog}
      />
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
          emptyMessage="No characters available"
          loading={isLoading}
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
    </>
  );
};
