// export function generateData(x = 2, y = 2, z = 1, gData = []) {
//
//   function _loop(_level, _preKey, _tns) {
//     const preKey = _preKey || '0';
//     const tns = _tns || gData;
//     console.log('tns1:' + tns);
//     let children = [];
//     children.push('hello');
//     for (let i = 0; i < x; i++) {
//       const key = `${preKey}-${i}`;
//       console.log('key:' + key);
//       tns.push({ title: `${key}-label`.replace(/^0\-0\-/, ''), key: `${key}-key` });
//       console.log('tns2:' + tns);
//       if (i < y) {
//         children.push(key);
//       }
//     }
//   }
//   _loop(z);
//   return gData;
// }
// export const gData = generateData();

export const gData = [
  { title: "MAIN", key: '0-0', show: true, children: [
    { title: "Wallbook", key: '0-1', icon: 'book', no_drag: true},
    { title: "hello3", key: '0-2', icon: 'book', children: [{ title: "hello4", key: '0-4', icon: 'book'}, { title: "hello5", key: '0-5', icon: 'book'}]},
    { title: "hello6", key: '0-6', icon: 'book', children: [{ title: "hello7", key: '0-7', icon: 'book'}]},
    { title: "hello8", key: '0-8', icon: 'secret', children: [{ title: "hello9", key: '0-9', icon: 'book'}]},
    { title: "Bin", key: '0-10', icon: 'bin' }
  ]}

];








// export function calcTotal(x = 3, y = 2, z = 1) {
//   // eslint-disable-next-line no-confusing-arrow, no-mixed-operators
//   const rec = (n) => n >= 0 ? x * Math.pow(y, n--) + rec(n) : 0;
//   return rec(z + 1);
// }



// export function isInclude(smallArray, bigArray) {
//   return smallArray.every((ii, i) => ii === bigArray[i]);
// }
// console.log(isInclude(['0', '1'], ['0', '10', '1']));


// arr.length === 628, use time: ~20ms
// export function filterParentPosition(arr) {
//   const levelObj = {};
//   arr.forEach((item) => {
//     const posLen = item.split('-').length;
//     if (!levelObj[posLen]) {
//       levelObj[posLen] = [];
//     }
//     levelObj[posLen].push(item);
//   });
//
//   const levelArr = Object.keys(levelObj).sort();
//   for (let i = 0; i < levelArr.length; i++) {
//     if (levelArr[i + 1]) {
//       levelObj[levelArr[i]].forEach(ii => {
//         for (let j = i + 1; j < levelArr.length; j++) {
//           levelObj[levelArr[j]].forEach((_i, index) => {
//             if (isInclude(ii.split('-'), _i.split('-'))) {
//               levelObj[levelArr[j]][index] = null;
//             }
//           });
//           levelObj[levelArr[j]] = levelObj[levelArr[j]].filter(p => p);
//         }
//       });
//     }
//   }
//   let nArr = [];
//   levelArr.forEach(i => {
//     nArr = nArr.concat(levelObj[i]);
//   });
//   return nArr;
// }
// console.log(filterParentPosition(
//   ['0-2', '0-3-3', '0-10', '0-10-0', '0-0-1', '0-0', '0-1-1', '0-1']
// ));


// function loopData(data, callback) {
//   const loop = (d, level = 0) => {
//     d.forEach((item, index) => {
//       const pos = `${level}-${index}`;
//       if (item.children) {
//         loop(item.children, pos);
//       }
//       callback(item, index, pos);
//     });
//   };
//   loop(data);
// }

// function spl(str) {
//   return str.split('-');
// }
// function splitLen(str) {
//   return str.split('-').length;
// }

// export function getFilterExpandedKeys(data, expandedKeys) {
//   const expandedPosArr = [];
//   loopData(data, (item, index, pos) => {
//     if (expandedKeys.indexOf(item.key) > -1) {
//       expandedPosArr.push(pos);
//     }
//   });
//
//   const filterExpandedKeys = [];
//   loopData(data, (item, index, pos) => {
//     expandedPosArr.forEach(p => {
//       if (((splitLen(pos) < splitLen(p)
//         && p.indexOf(pos) === 0) || pos === p)
//         && filterExpandedKeys.indexOf(item.key) === -1) {
//         filterExpandedKeys.push(item.key);
//       }
//     });
//   });
//   return filterExpandedKeys;
// }

// function isSibling(pos, pos1) {
//   pos.pop();
//   pos1.pop();
//   return pos.join(',') === pos1.join(',');
// }

// export function getRadioSelectKeys(data, selectedKeys, key) {
//   const res = [];
//   const pkObjArr = [];
//   const selPkObjArr = [];
//   loopData(data, (item, index, pos) => {
//     if (selectedKeys.indexOf(item.key) > -1) {
//       pkObjArr.push([pos, item.key]);
//     }
//     if (key && key === item.key) {
//       selPkObjArr.push(pos, item.key);
//     }
//   });
//   const lenObj = {};
//   const getPosKey = (pos, k) => {
//     const posLen = splitLen(pos);
//     if (!lenObj[posLen]) {
//       lenObj[posLen] = [[pos, k]];
//     }
//     else {
//       lenObj[posLen].forEach((pkArr, i) => {
//         if (isSibling(spl(pkArr[0]), spl(pos))) {
//
//           lenObj[posLen][i] = [pos, k];
//         }
//         else if (spl(pkArr[0]) !== spl(pos)) {
//           lenObj[posLen].push([pos, k]);
//         }
//       });
//     }
//   };
//   pkObjArr.forEach((pk) => {
//     getPosKey(pk[0], pk[1]);
//   });
//   if (key) {
//     getPosKey(selPkObjArr[0], selPkObjArr[1]);
//   }
//
//   Object.keys(lenObj).forEach((item) => {
//     lenObj[item].forEach((i) => {
//       if (res.indexOf(i[1]) === -1) {
//         res.push(i[1]);
//       }
//     });
//   });
//   return res;
// }
