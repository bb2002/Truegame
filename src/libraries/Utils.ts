export const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export const checkIsPro = () => {
    return false
}

export const PRO_VERSION_GOOGLEPLAY = "market://details?id=kr.saintdev.truegamepro"
export const PRO_VERSION_APPSTORE = "itms-apps://itunes.apple.com/us/app/id1553604322?mt=8"