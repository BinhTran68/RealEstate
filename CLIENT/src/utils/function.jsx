

export const formatMoney = (number) => {
    if (!+number) return 0
    return Number(+number.toFixed(1)).toLocaleString()

}

// ** MoneyFormat
export const moneyFormat = (money, locale = 'en-US', currency = 'USD', maximumFractionDigits = 3) => {
    let moneyFormat = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: maximumFractionDigits,
    })

    return moneyFormat.format(money)
}

// ** MoneyFormat
export const formatNumber = (number) => {
    let moneyFormat = new Intl.NumberFormat()

    return moneyFormat.format(number)
}


export const renderRagePanigationNumber = ({start, end}) => {
    const length = end - start+1
    return Array.from({length},(_, index) => start + index)
}