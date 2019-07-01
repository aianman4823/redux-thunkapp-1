export const nextCountAPI = currentCount => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(currentCount + 1)
        }, 1000)
    })
}
