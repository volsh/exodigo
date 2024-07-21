import { ChangeEventHandler } from "react";

export default function ({ onChange }: { onChange: ChangeEventHandler }) {
  return (
    <div className="search-bar">
      <label>Search for cocktail:</label>
      <input type="text" onChange={onChange} />
    </div>
  );
}
