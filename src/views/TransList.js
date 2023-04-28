// import React from 'react';  
import styled from 'styled-components'
import transData from '../constants/trans-rst.json';
import Table from './Table';


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function TransList() {
  
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: 'From',
  //       columns: [
  //         {
  //           Header: '부서코드',
  //           accessor: 'fromOrgId',
  //         },
  //         {
  //           Header: '부서명',
  //           accessor: 'fromName',
  //         },
  //       ],
  //     },
  //     {
  //       Header: 'Target',
  //       columns: [
  //         {
  //           Header: '부서코드',
  //           accessor: 'targetOrgId',
  //         },
  //         {
  //           Header: '부서명',
  //           accessor: 'targetName',
  //         }
  //       ],
  //     },
  //     {
  //       Header: "개수",
  //       accessor: "cnt",
  //     },
  //     {
  //       Header: "수행",
  //       accessor: "fnc1",
  //     },
  //     {
  //       Header: "결과",
  //       accessor: "rst",
  //     },
  //   ],
  //   []
  // ) 
  // const columns = ["From 부서코드", "From 부서명", "Target 부서코드",  "Target 부서명", "개수", "수행", "결과"];
  // const tranList = useMemo(() => transData.item.sort( (a,b) => a.cnt*1 - b.cnt*1).map( (v, index ) => {
  //   v["key"] = index;
  //   return v;
  // }), []); 
  const columns = ["From 부서코드", "From 부서명", "Target 부서코드",  "Target 부서명", "개수", "수행"];
  const tranList = transData.item.sort( (a,b) => a.cnt*1 - b.cnt*1).map( (v, index ) => {
    v["key"] = index;
    v["disabled"] = !(v.rst === "R"); 
    return v;
  })
  return ( 
    <Styles>
	    <Table columns={columns} data={tranList} />
    </Styles> 
  );
}
 
export default TransList;