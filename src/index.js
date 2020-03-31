/**
 * Helper functions
 */
const byId = (id) => document.getElementById(id)

const getSelectedLocale = () => byId('selected-locale').value

const addHighlightClass = (domElement) => {
    domElement.className = 'bold'
    return domElement
}

const addTextAndHighlight = (domElement, text) => addHighlightClass(domElement).innerText = text

/**
 * Intl.Collator
 */

const elementsToSort = [
    'al',
    'äng',
    'zahl',
]

const renderSortedElements = (locale) => {
    const sortedElements = elementsToSort.concat().sort(new Intl.Collator(locale).compare)
    const sortedElementsList = byId('sorted-elements')
    sortedElementsList.innerHTML = ''
    sortedElements.forEach(item => {
        const element = document.createElement('li')
        addTextAndHighlight(element, item)
        sortedElementsList.appendChild(element)
    })
}

/**
 * Intl.DateTimeFOrmat
 */

const renderFormattedDate = (locale) =>
    addTextAndHighlight(byId('formatted-date'), new Intl.DateTimeFormat(locale).format(new Date()))

/**
 * Intl.ListFormat
 */

const elementsForListFormat = [
    'Eggs',
    'Salami',
    'Macaroni'
]

const renderListFormat = (locale) =>
    addTextAndHighlight(byId('list-format'), new Intl.ListFormat(locale, {
        style: 'long',
        type: 'conjunction'
    }).format(elementsForListFormat))

/**
 * Intl.NumberFormat
 */

const renderNumberFormat = (locale) => {
    const numberToFormat = byId('number-format').value
    const currency = byId('number-format-currency').value
    addTextAndHighlight(byId('number-format-output'), new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(numberToFormat))
}

/**
 * Intl.PluralRules
 */

const renderPluralRules = (locale) => {
    const count = byId('plural-rules-cat-count').value
    const pluralRule = new Intl.PluralRules(locale, {
        type: 'ordinal'
    }).select(count)
    addTextAndHighlight(
        byId('plural-rules'),
        `For ${count} elements, in the locale ${locale} the plural rule is ${pluralRule}`
    )
}

/**
 * Intl.RelativeTimeFormat
 */

const renderRelativeTimeFormat = (locale) => {
    const value = byId('relative-time-format-value').value
    const unit = byId('relative-time-format-unit').value
    addTextAndHighlight(byId('relative-time-format'), new Intl.RelativeTimeFormat(locale, {
        style: 'narrow'
    }).format(value, unit))
}

/**
 * Intl.Locale
 */

const renderUnicodeLocale = (locale) => {
    const localeObj = new Intl.Locale(locale)
    addHighlightClass(
        byId('int-locale-formatted'),
        `Properties of selected locale are: baseName ${localeObj.baseName}, calendar ${localeObj.calendar} , language ${localeObj.language}, region ${localeObj.region}`
    )
}

const renderAllExamples = () => {
    const locale = getSelectedLocale()
    renderSortedElements(locale)
    renderFormattedDate(locale)
    renderListFormat(locale)
    renderNumberFormat(locale)
    renderPluralRules(locale)
    renderRelativeTimeFormat(locale)
    renderUnicodeLocale(locale)
}

/**
 * Add event listener to re-render examples
 */
const inputs = document.querySelectorAll('input, select')
inputs.forEach(input => input.addEventListener('change', renderAllExamples))

renderAllExamples()