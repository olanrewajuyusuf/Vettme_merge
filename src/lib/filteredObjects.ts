export function getFilteredObjects(
  x: Record<string, any> = {},
  s: Record<string, any> = {},
  t: Record<string, any> = {},
  str: string,
  u: Record<string, any>,
  str2?: string,
): { claim?: any; finding?: any; data?: any; verdict: any }[] {

  // Step 1: Get key-value pairs based on filtering conditions
  const resultEntries = Object.entries(x)
    .filter(([key]) => {
      if (typeof str2 === "string") {
        return key.startsWith(str) && key.endsWith(str2);
      } else {
        return key.startsWith(str);
      }
    })
    .sort(([keyA], [keyB]) => {
      const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
      const secondaryKeys = ['piFirstName', 'piMiddleName', 'piLastName', 'giFirstName1', 'giMiddleName1', 'giLastName1', 'giFirstName2', 'giMiddleName2', 'giLastName2', 'giFirstName3', 'giMiddleName3', 'giLastName3', 'giFirstName4', 'giMiddleName4', 'giLastName4'];

      const aPriority = priorityKeys.includes(keyA) ? 0 : secondaryKeys.includes(keyA) ? 1 : 2;
      const bPriority = priorityKeys.includes(keyB) ? 0 : secondaryKeys.includes(keyB) ? 1 : 2;

      return aPriority - bPriority || keyA.localeCompare(keyB);
    });

  // Step 2: Extract values from all parameters in the same order as resultEntries
  const resultValues = resultEntries.map(([_, value]) => value);
  const filteredSValues = resultEntries.map(([key]) => s[key]);
  const filteredTValues = resultEntries.map(([key]) => t[key]);
  const filteredUValues = resultEntries.map(([key]) => u[key]);

  // Step 3: Create array of objects with claim, findings, data, and verdict
  const items = resultEntries.map((_, i) => ({
    claim: resultValues[i] ?? null,
    finding: filteredSValues[i] ?? null,
    data: filteredTValues[i] ?? null,
    verdict: filteredUValues[i] === null ? null : filteredUValues[i] ?? false,
  }));
  
  return items;
}

//filtering claims and initial data only
export function getFilteredData(
  x: Record<string, any> = {},
  s: Record<string, any> = {},
  str: string,
  str2?: string,
): { id: string; claim?: any; data?: any }[] {

  // Step 1: Get key-value pairs based on filtering conditions
  const resultEntries = Object.entries(x)
    .filter(([key]) => (typeof str2 === "string" ? key.startsWith(str) && key.endsWith(str2) : key.startsWith(str)))
    .sort(([keyA], [keyB]) => {
      const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
      const secondaryKeys = ['piFirstName', 'piMiddleName', 'piLastName', 'giFirstName1', 'giMiddleName1', 'giLastName1', 'giFirstName2', 'giMiddleName2', 'giLastName2', 'giFirstName3', 'giMiddleName3', 'giLastName3', 'giFirstName4', 'giMiddleName4', 'giLastName4'];

      const aPriority = priorityKeys.includes(keyA) ? 0 : secondaryKeys.includes(keyA) ? 1 : 2;
      const bPriority = priorityKeys.includes(keyB) ? 0 : secondaryKeys.includes(keyB) ? 1 : 2;

      return aPriority - bPriority || keyA.localeCompare(keyB);
    });

  // Step 2: Convert sorted key-value pairs into an array of objects
  return resultEntries.map(([key, value]) => ({
    id: key, // Include key as "id"
    claim: value ?? null,
    data: s[key] ?? null,
  }));
}

