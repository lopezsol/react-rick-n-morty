import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { getEpisode } from "../../episodes/services/episode.service";
import type { Character } from "../interfaces/character.interface";
import type { Episode } from "../../episodes/interfaces/episode.interface";
import { Avatar } from "primereact/avatar";
import { ProgressSpinner } from "primereact/progressspinner";

interface Props {
  visible: boolean;
  character: Character | null;
  handleHide: () => void;
}

export const CharacterDialog = ({ visible, character, handleHide }: Props) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMore = (character?.episode?.length ?? 0) > currentIndex;
  const [isLoading, setIsLoading] = useState(false);
  const EPISODES_PER_PAGE = 5;

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar image={character?.image} shape="circle" size="large" />
      <span className="font-bold white-space-nowrap">{character?.name}</span>
    </div>
  );

  useEffect(() => {
    if (!character) return;

    setEpisodes([]);
    setCurrentIndex(0);

    fetchEpisodes(0);
  }, [character]);

  const fetchEpisodes = async (startIndex: number) => {
    if (!character) return;
    setIsLoading(true);

    const urls = character.episode.slice(
      startIndex,
      startIndex + EPISODES_PER_PAGE
    );

    if (urls.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await Promise.all(urls.map((url) => getEpisode(url)));
      setEpisodes((prev) => [...prev, ...data]);
      setCurrentIndex(startIndex + EPISODES_PER_PAGE);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fetchEpisodes(currentIndex);
  };

  if (!character) return null;

  return (
    <Dialog
      visible={visible}
      style={{ width: "50vw" }}
      onHide={handleHide}
      header={headerElement}
    >
      <p className="m-0">Status: {character.status}</p>
      <p className="m-0">Species: {character.species}</p>
      <p className="m-0">Gender: {character.gender}</p>
      <p className="m-0">Origin: {character.origin.name}</p>
      <p className="m-0">Location: {character.location.name}</p>

      <h4>List of Episodes appearances</h4>

      <ul>
        {episodes.map((ep) => (
          <li key={`${ep.episode} —${ep.name}-'${ep.id}`}>
            {ep.episode} — {ep.name}
          </li>
        ))}
      </ul>

      {isLoading && (
        <div className="flex justify-content-center my-3">
          <ProgressSpinner className="w-3rem h-3rem" />
        </div>
      )}

      {hasMore && !isLoading && (
        <button className="cursor-pointer" onClick={handleClick}>
          (more)
        </button>
      )}
    </Dialog>
  );
};
