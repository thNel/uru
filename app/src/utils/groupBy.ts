import {Dict} from "@/interfaces";

const groupBy = <T>(array: T[], filter: (string | number)) => {
  const filterArray = filter.toString().split('.');
  return array.reduce<Dict<T[]>>((response, elem, currentIndex) => {
    const key: unknown = filterArray.reduce((acc: any, item) => acc[item], {...elem});
    if (typeof key === 'string' || typeof key === 'number') {
      (response[key] = response[key] ?? []).push(elem);
    } else {
      throw new Error(`array[${currentIndex}]["${filterArray.join('"]["')}"] type is NOT string or number. Can't create group with such name.`);
    }
    return response;
  }, {})
};

export default groupBy;