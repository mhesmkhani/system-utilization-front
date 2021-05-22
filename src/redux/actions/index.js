import {
    SET_MENU_TAB_NAME,
    SET_USER_INFO,
    SET_IS_AUTH,
    SET_WATCH_LIST,
    SET_WATCHLIST_NAMES,
    SET_WATCHLIST_ACTIVE,
    SET_DATATO_TRADES,
    SET_SEARCH_HISTORY,
    SET_VISIBLE_MODAL,
    SET_USERNOTIFICATION,
    SET_WEBSOCKET_BEST_LIMIT,
    SET_WEBSOCKET_TRADE,
    SET_WEBSOCKET_CLOSING_PRICE,
    SET_WEBSOCKET_STATIC_THRESHOLD,
    SET_WATCH_LIST_EMPTY,
    SET_SUBSCRIBE,
    SET_PORTFO,
    SET_ADMINMESSAGES, SET_USERFINANCE_INFO, SET_BOTTOM_SHEET, SET_ALLOW_NOTIF, SET_CURRENT_PASSWORD,

} from "./ActionTypes"


export const setMenuTabs = tabName => {
    return {
        type: SET_MENU_TAB_NAME,
        tabName
    }
}

export const setUserInfo = users => {
    return {
        type: SET_USER_INFO,
        users
    }
}


export const setIsAuth = auth => {
    return {
        type: SET_IS_AUTH,
        auth
    }
}

export const setPortfolio = portfolio => {
    return {
        type: SET_PORTFO,
        portfolio
    }
}

export const setWatchList = watchList => {
    return {
        type: SET_WATCH_LIST,
        watchList
    }
}
export const setWatchListEmpty = watchListEmpty => {
    return {
        type: SET_WATCH_LIST_EMPTY,
        watchListEmpty
    }
}

export const setWatchListNames = watchListNames => {
    return {
        type: SET_WATCHLIST_NAMES,
        watchListNames
    }
}

export const setWatchlistActivated = watchListActive => {
    return {
        type: SET_WATCHLIST_ACTIVE,
        watchListActive
    }
}

export const setDataToTrades = symbolData => {
    return {
        type: SET_DATATO_TRADES,
        symbolData
    }
}
export const setHistorySearch = historySearch => {
    return {
        type: SET_SEARCH_HISTORY,
        historySearch
    }
}


export const setModal = visibleModal => {
    return {
        type: SET_VISIBLE_MODAL,
        visibleModal
    }
}

export const setAllowNotification = allowNotif => {
    return {
        type: SET_ALLOW_NOTIF,
        allowNotif
    }
}

export const setUserNotification = userNotification => {
    return {
        type: SET_USERNOTIFICATION,
        userNotification
    }
}


export const setWsTrade = trade => {
    return {
        type: SET_WEBSOCKET_TRADE,
        trade: trade
    }
}

export const setWsClosingPrice = closingPrice => {
    return {
        type: SET_WEBSOCKET_CLOSING_PRICE,
        closingPrice
    }
}

export const setWsBestLimit = bestLimit => {
    return {
        type: SET_WEBSOCKET_BEST_LIMIT,
        bestLimit
    }
}

export const setWsStaticThreshold = staticThreshold => {
    return {
        type: SET_WEBSOCKET_STATIC_THRESHOLD,
        staticThreshold
    }
}

export const setSubscribe = title => {
    return {
        type: SET_SUBSCRIBE,
        title
    }
}

export const setAdminMessage = messages => {
    return {
        type: SET_ADMINMESSAGES,
        messages
    }
}

export const setUserFinanceInfo = financeInfo => {
      return {
          type: SET_USERFINANCE_INFO,
          financeInfo
      }
}


export const setOpenBottomSheet = bottomSheet => {
    return {
        type: SET_BOTTOM_SHEET,
        bottomSheet
    }
}


