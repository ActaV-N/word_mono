export const cookieParser = () => {
    const {cookie} = document;

    return Object.fromEntries(
        cookie.split(';')
        .map(prop => prop.split('='))
        .map(([key, value]) => [
            decodeURIComponent(key),
            decodeURIComponent(value)
        ])
    )
}