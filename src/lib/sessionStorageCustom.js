export default {
    setJsonItem: setJsonItem,
    getJsonItem: getJsonItem,
  };
  
  function setJsonItem(key, jsonItem) {
    const jsonString = JSON.stringify(jsonItem);
    sessionStorage.setItem(key, jsonString);
  }
  
  function getJsonItem(key) {
    const jsonString = sessionStorage.getItem(key);
    return JSON.parse(jsonString);
  }
  