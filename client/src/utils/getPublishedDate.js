const getPublishedDate = (date) => {
  if (date) {
    const publishedDateObject = new Date(date);
    return `${publishedDateObject.getFullYear()}/${
      publishedDateObject.getMonth() + 1
    }/${publishedDateObject.getDate()} ${publishedDateObject.getHours()}:${publishedDateObject.getMinutes()}`;
  }
  return "-";
};

export default getPublishedDate;
