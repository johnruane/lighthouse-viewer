import React from 'react';

const calcDiff = (cnum, pnum) => {
  const diff = cnum - pnum;
  return diff > 0 ? `+${diff}` : diff;
}

const r = (num) => {
  return Math.round(num * 100);
}

const Row = ({data}) => {
  const url = data.name;
  const { performance: p1, seo: s1, accessibility: a1, "best-practices": b1 } = data.current;
  const { performance: p2, seo: s2, accessibility: a2, "best-practices": b2 } = data.prev;

  return (
    <tr>
      <td style={{textAlign: "left"}}>{url}</td>
      <td>{r(p1)} <span className="diff-score">{calcDiff(r(p1), r(p2))}</span></td>
      <td>{r(s1)} <span className="diff-score">{calcDiff(r(s1), r(s2))}</span></td>
      <td>{r(a1)} <span className="diff-score">{calcDiff(r(a1), r(a2))}</span></td>
      <td>{r(b1)} <span className="diff-score">{calcDiff(r(b1), r(b2))}</span></td>
    </tr>
  )
}

const Table = ({stats}) => {
  console.log(stats)
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
        {stats.map((stat) => {
          return <Row data={stat}/>
         })}
      </tbody>
    </table>
  )
}

export default Table;