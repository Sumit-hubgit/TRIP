import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: true }
];


export default function App() {
  const [items, setItems] = useState([]);

  function HandleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function HandleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function HandleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item)
    );
  }

  function HandleClearList(){
    const confirmed=window.confirm("Are you sure you want to delete all items");
    if(confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={HandleAddItem} />
      <PackingList items={items}
       onDeleteItem={HandleDeleteItem}
      onToggleItems={HandleToggleItem}
      onClearList={HandleClearList} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 💼</h1>
}

function Form({ onAddItem }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, package: false, id: Date.now() }
    onAddItem(newItem);
    console.log(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?😍</h3>
      <select value={quantity} onChange={e => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map
          ((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
      </select>
      <input type="text" placeholder="text...." value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItems , onClearList }) {

  const [sortBy, setSortBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = items;

  if (sortBy === "description") sortedItem = items.slice().sort(
    (a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItem = items.slice().sort(
      (a, b) => Number(a.packed)- Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">
            SORT BY THE ORDER
          </option>
          <option value="description">
            SORT BY DESCRIPTION
          </option>
          <option value="packed">
            SORT BY PACKED STATUS
          </option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>

    </li>
  );
}

function Stats({ items }) {
  const numItem = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItem) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "You got Everything ! Ready to go ✈ " :
          `💼You have ${numItem} items in your list , and you already packed ${" "} ${numPacked}( ${percentage})%`
        }
      </em>
    </footer>
  );
}
