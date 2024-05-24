export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const

export const FILTER_BUTTONS = {
  [FILTERS.ALL]: {
    literal: 'All',
    href: `/?filter=${FILTERS.ALL}`,
  },
  [FILTERS.ACTIVE]: {
    literal: 'Active',
    href: `/?filter=${FILTERS.ACTIVE}`,
  },
  [FILTERS.COMPLETED]: {
    literal: 'Completed',
    href: `/?filter=${FILTERS.COMPLETED}`,
  },
}
