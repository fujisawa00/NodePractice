import * as React from 'react';
import inspirations from './inspirations';
import FancyText from './FancyText';
import Color from './Color';

// ランダムなカラーコードを生成する
function getRandomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, '0')
  );
}

export default function InspirationGenerator({ children }) {
  // 初期状態では何も表示しない
  const [index, setIndex] = React.useState(null);

  // ランダム生成したカラーを管理する
  const [currentColor, setCurrentColor] =
    React.useState(null);

  // ボタン名を管理する
  const [buttonLabel, setButtonLabel] =
    React.useState('閃きをもらう');

  // 名言だけを取り出す
  const quotes = inspirations.filter(
    item => item.type === 'quote'
  );

  // 選択中の名言を取得する
  const inspiration =
    index === null ? null : inspirations[index];

  const next = () => {
    // 初回はランダムな名言を表示
    if (inspiration === null) {
      const randomIndex = Math.floor(
        Math.random() * quotes.length
      );

      setIndex(
        inspirations.indexOf(quotes[randomIndex])
      );
      setCurrentColor(null);
      return;
    }

    // 名言を表示中なら、次はカラーを生成
    if (inspiration.type === 'quote') {
      setIndex(null);
      setCurrentColor(getRandomColor());

      // 一度変更したボタン名は元に戻さない
      setButtonLabel('もう一度、閃きをもらう');
    } else {
      // カラーを表示中なら、次はランダムな名言
      const randomIndex = Math.floor(
        Math.random() * quotes.length
      );

      setIndex(
        inspirations.indexOf(quotes[randomIndex])
      );
      setCurrentColor(null);
    }
  };

  return (
    <>
      {/* 名言を表示 */}
      {inspiration !== null && (
         <div className="inspiration-quote">
             <p>今日のあなたへの名言はこちらです：</p>
             <FancyText text={inspiration.value} />
         </div>
      )}

      {/* ランダムカラーを表示 */}
      {currentColor !== null && (
        <>
          <p>今日のインスピレーションカラーはこちら：</p>
          <Color value={currentColor} />
        </>
      )}

      {/* ボタン */}
      <button
        className="inspire-button"
        onClick={next}
      >
        {buttonLabel}
      </button>

      {/* 呼び出し元から渡された子要素 */}
      {children}
    </>
  );
}
