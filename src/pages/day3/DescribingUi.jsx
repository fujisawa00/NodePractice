import { Link } from 'react-router-dom'
import FancyText from './FancyText';
import InspirationGenerator from "./InspirationGenerator.jsx";
import Copyright from './Copyright';

export default function DescribingUi() {
  return (
    <>
      <h1>UI用</h1>
      <FancyText title text="ひらめきを得るアプリ" />
      <InspirationGenerator>
      <Copyright year={new Date().getFullYear()}  />
      </InspirationGenerator>
      
      <p><Link to="/day3">← Day 3 の目次へ戻る</Link></p>
    </>
  )
}