import { Link } from 'react-router-dom'
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
        <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly} 
        />  
        <ProductList
            products={products}
            filterText={filterText}
            inStockOnly={inStockOnly}
        />    
    </div>
  );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );

}

function ProductRow({product}) {
    const name = product.stocked ? product.name :
        <span style={{color: 'red'}}>
            {product.name}
        </span>;

    return(
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );    
}

function ProductList({products, filterText, inStockOnly}){
    const rows = [];
    let lastCategory =null;

    products.forEach((product) => {
        if(
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ){return;

        }
        if(inStockOnly && !product.stocked){
            return;
        }
        if(product.category !== lastCategory){
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
        );
            lastCategory = product.category;
    });
            return(
                <table>
                    <thead>
                        <tr>
                            <th>商品名</th>
                            <th>価格</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            );     
}

function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
}) {
    return (
        <form className="product-search">
            <input
                type="text"
                value={filterText} placeholder="検索する"
                onChange={(e) => onFilterTextChange(e.target.value)} />
            <label>
                <input
                    type="checkbox"
                checked={inStockOnly} 
                onChange={(e) => onInStockOnlyChange(e.target.checked)} />
                {' '}
                在庫がある商品のみ表示する
            </label>
        </form>
    );
}

const PRODUCTS = [
    {category: "果物", price: "200円", stocked: true, name: "林檎"},
    {category: "果物", price: "250円", stocked: true, name: "ドラゴンフルーツ"},
    {category: "果物", price: "400円", stocked: false, name: "パッションフルーツ"},
    {category: "野菜", price: "200円", stocked: true, name: "ほうれん草"},
    {category: "野菜", price: "300円", stocked: false, name: "カボチャ"},
    {category: "野菜", price: "150円", stocked: true, name: "エンドウ豆"}
];

export default function ProductTable() {
  return (
    <div className="product-page">
      <h1>React の流儀（商品表）</h1>

      <FilterableProductTable products={PRODUCTS} />

      <p>
        <Link to="/day3">
          ← Day 3 の目次へ戻る
        </Link>
      </p>
    </div>
  );
}