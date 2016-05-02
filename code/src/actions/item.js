import {
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_CHANGE_UNDO,
  ITEM_CHANGE_REDO,
  ITEM_ERROR
} from '../constants/actions';

export function addItem(dispatch, data) {
  dispatch({
    type: ITEM_ADD,
    payload: data
  });
}

export function removeItem(dispatch, data) {
  dispatch({
    type: ITEM_REMOVE,
    payload: data
  });
}

export function undoItemChange(dispatch) {
  dispatch({
    type: ITEM_CHANGE_UNDO
  });
}

export function redoItemChange(dispatch) {
  dispatch({
    type: ITEM_CHANGE_REDO
  });
}

export function itemError(dispatch, data) {
  dispatch({
    type: ITEM_ERROR,
    payload: data
  });
}
