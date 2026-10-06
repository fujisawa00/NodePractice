import { Link } from 'react-router-dom'
import './Quickstart.css'
import {useState} from 'react';

function MyButton() {
   const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
      
  }
      return (
        
        <button onClick = {handleClick}>Clicked{count}times</button>
        
      );
      }

export default function Quickstart() {
  return (
    <div>
      <h1>クイックスタート</h1>
      <h1>Welcome to my app</h1>
      <Profile />
      <ShoppingList />
      <h1>Counters that update together</h1>
      <MyButton/>
      <MyButton/>
      <p><Link to="/day2">← Day 2 の目次へ戻る</Link></p>
    </div>
  )
}

const user = {
  name:  'Hedy lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

export function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img className = "avatar"
            src = {user.imageUrl}
            alt = {'photo of' + user.name}
            style ={{
              width: user.imageSize,
              height: user.imageSize
            }}
          />
       </>
    );
}      


const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];


export function ShoppingList(){
  const listItems = products.map(product => 
    <li
     key = {product.id}
     style ={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
     }}
     >
      {product.title}
     </li>
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

