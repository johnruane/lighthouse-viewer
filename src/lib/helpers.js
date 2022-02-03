export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [{[item.name]: item.value}]);
       } else {
           collection.push({[item.name]: item.value});
       }
  });
  return map;
}

export function processData(data) {
  const validNames = ['category_performance_max', 'category_seo_max', 'category_accessibility_max', 'category_best-practices_max'];
  const relevantData = data.filter((d) => validNames.includes(d.name));
  let relevantDataStripped = [];

  relevantData.forEach((d) => {
    let dataEntry = {};
    dataEntry.url = d.url;
    dataEntry.name = d.name.slice(9, -4);
    dataEntry.value = d.value;
    relevantDataStripped.push(dataEntry);
  })

  const dataMap = groupBy(relevantDataStripped, data => data.url);
  return dataMap;
}

export function flattenArray(arr, key) {
  return [...arr].map(([name, value]) => ({ name, [key]: Object.assign({}, ...value) }))
}