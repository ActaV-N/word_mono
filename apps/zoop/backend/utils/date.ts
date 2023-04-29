export const getToday = () => {
    const now = new Date(Date.now());

    return new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
}