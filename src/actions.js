/*
 * action types
 */
​
export const NEW_DISCUSSION = 'NEW_DISCUSSION'
export const NEW_COMMENT = 'NEW_COMMENT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
​
/*
 * other constants
 */
​
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
​
/*
 * action creators
 */
​
export function addDiscussion(discussion) {
  return { type: NEW_DISCUSSION, discussion }
}
​
export function addComment(comment) {
  return { type: NEW_COMMENT, comment }
}
​
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
