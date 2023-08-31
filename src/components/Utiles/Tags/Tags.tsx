import React, { useContext } from 'react';
import tags from '../../../data/tags.json';
import { TagsList } from '../../contexts';

const Tags = () => {
  const tagsList = useContext(TagsList);

  return (
    <div className="centuries">
      <ul>
        {tagsList.map((tag, key) => (
          <li key={key}>
            <label>
              <input type="checkbox" /> {tag.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
