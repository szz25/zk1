function date() {
    const data = new Date();
    const year = data.getFullYear(),
        month = data.getMonth() + 1,
        date = data.getDate();
    return year + '-' + month + '-' + date
}
date()