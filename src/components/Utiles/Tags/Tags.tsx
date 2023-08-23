import React from "react";
import tags from '../../../data/tags.json';

const Tags = () => {
  return (
    <div className="centuries">
<ul>
        {tags.map((tag, key) => (
          <li key={key}>
            <label ><input type="checkbox" /> {tag.name}</label>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tags;