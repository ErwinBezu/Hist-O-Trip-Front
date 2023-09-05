import React, { useContext } from 'react';
import tags from '../../../data/tags.json';
import { TagsList, SelectedTags } from '../../contexts';
type Tags = {
  id: number;
  name: string;
};

const Tags = () => {
  const tagsList = useContext(TagsList);
  const { selectedTags, setSelectedTags } = useContext(SelectedTags);

  const handleTagsSelect = (tagId: number) => {
    const newSelectedTags = [...selectedTags, tagId];
    setSelectedTags(newSelectedTags);
  };
  return (
    <div className="centuries">
      <ul>
        {tagsList.map((tag) => (
          <li key={tag.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagsSelect(tag.id)}
              />{' '}
              {tag.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
