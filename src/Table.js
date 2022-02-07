import React from 'react';

const calcDiff = (cnum, pnum) => {
  const diff = cnum - pnum;
  return diff > 0 ? `+${diff}` : diff;
}

const r = (num) => {
  return Math.round(num * 100);
}

const Row = ({url, current, prev}) => {

  if ( !current || !prev) return <></>

  const metricScores = Object.assign({}, ...current);
  const { performance: p1, seo: s1, accessibility: a1, "best-practices": b1 } = metricScores;

  const prevMetricScores = Object.assign({}, ...prev);
  const { performance: p2, seo: s2, accessibility: a2, "best-practices": b2 } = prevMetricScores;
  
  return (
    <tr>
      <td style={{textAlign: "left"}}>{url}</td>
      <td><span className="score">{r(p1)}</span> <span className="diff-score">{calcDiff(r(p1), r(p2))}</span></td>
      <td><span className="score">{r(s1)}</span> <span className="diff-score">{calcDiff(r(s1), r(s2))}</span></td>
      <td><span className="score">{r(a1)}</span> <span className="diff-score">{calcDiff(r(a1), r(a2))}</span></td>
      <td><span className="score">{r(b1)}</span> <span className="diff-score">{calcDiff(r(b1), r(b2))}</span></td>
    </tr>
  )
}

const Table = ({data, prev}) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Url</th>
          <th>Performance</th>
          <th>Seo</th>
          <th>Accessibility</th>
          <th>Best practices</th>
        </tr>
      </thead>
      <tbody>
        {[...data].map(([key, value]) => {
          const prevDataByCurrentKey = prev?.get(key);
          return <Row key={key} url={key} current={value} prev={prevDataByCurrentKey}/>
         })}
      </tbody>
    </table>
  )
}

export default Table;