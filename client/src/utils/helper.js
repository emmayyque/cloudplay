export const formatNumber = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
        return num
    }
}

export const percentageCounter = (views, max) => {
    return ((views * 100 ) / max).toFixed(2) + "%"
}

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`
  if (hours < 24) return `${hours} hr${hours !== 1 ? "s" : ""} ago`
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`

  // If more than 7 days, return formatted date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const errorHandler = (err) => {
    if (err?.response) {
        if (err.response?.status == 400) {
            if (Array.isArray(err.response?.data)) return err.response?.data[0]?.msg
            else if (err.response?.data) return err.response?.data
            else return err.response?.statusText
        }
        else if (err.response?.status == 401) {
            if (err.response?.data) return err.response?.data
            else return err.response?.statusText
        }
        else if (err.response?.status == 404) {
            if (err.response?.data) return err.response?.data
            else err.response?.statusText
        }
        else if (err.response?.status == 500) {   
            if (err.response?.data) return err.response?.data
            else return err.response?.statusText
        }
        else return err.response?.statusText
    } 
    else return err.toString()
}