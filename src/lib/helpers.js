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

// Takes the buildData and returns only the options that contain the filter string ie min, max, median
export function filterData(data, filterName) {
  const validFilters = [`category_performance_${filterName}`, `category_seo_${filterName}`, `category_accessibility_${filterName}`, `category_best-practices_${filterName}`];
  const relevantData = data.filter((d) => validFilters.includes(d.name));
  return relevantData;
}

export function flattenArray(arr, key) {
  return [...arr].map(([name, value]) => ({ name, [key]: Object.assign({}, ...value) }))
}

export function filterAndGroupData(d, f) {
  const data = filterData(d, f);
  let renamedMetrics = [];

  // Sort the urls ascending so that the table output is consistent
  const sortedData = data.sort((a, b) => {
    return a.url.length - b.url.length
  });

  // Create an object of just the values we want to store
  sortedData.forEach((d) => {
    let newMetrics = {};
    newMetrics.url = d.url;
    newMetrics.name = d.name.split('_')[1];
    newMetrics.value = d.value;
    renamedMetrics.push(newMetrics);
  });

  // Group the data by url
  const dataMap = groupBy(renamedMetrics, d => d.url);
  return dataMap;
}

// Takes the initial fetched build data and returns only the relevant categories
export function cleanBuildData(data) {
  const validFilters = [
    'category_performance_min',
    'category_performance_max', 
    'category_performance_median', 
    'category_seo_min',
    'category_seo_max',
    'category_seo_median',
    'category_accessibility_min',
    'category_accessibility_max', 
    'category_accessibility_median', 
    'category_best-practices_min',
    'category_best-practices_max',
    'category_best-practices_median'];
  const relevantData = data.filter((d) => validFilters.includes(d.name));
  return relevantData;
}