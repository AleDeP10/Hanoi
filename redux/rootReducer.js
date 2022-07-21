import Bar from "../model/Bar";
import Box from "../model/Box";
import Disk from "../model/Disk";

const OPEN_BOX = 'OPEN_BOX';
const CLOSE_BOX = 'CLOSE_BOX';
const PUT_BAR = 'PUT_BAR';
const REMOVE_BAR = 'REMOVE_BAR';
const PUT_DISK = 'PUT_DISK';
const REMOVE_DISK = 'REMOVE_DISK';
const INIT = 'INIT';

export const BARS = 3;
export const DISKS = 8;

const initialState = {
    box: {},
    bars: [],
    disks: []
}

export default function itemReducer(state = initialState, action) {
    console.log({ state, action });
    switch (action.type) {
        case INIT: 
            const box = new Box(false);
            const bars = [];
            for (let i=0; i<BARS; i++) {
                bars.push(new Bar(null));
            }
            const disks = [];
            for (let i=0; i<DISKS; i++) {
                disks.push(new Disk(null, null, i));
            }
            return {
                ...state,
                box,
                bars,
                disks
            }
        case SET_ITEMS:
            console.log('set items', { payload: action.payload, items: action.payload.items });
            return {
                ...state,
                items: action.payload.items
            }
        case TOGGLE_DONE: {
            const { id } = action.payload;
            console.log('toggle done', { payload: action.payload, id });
            const array = [];
            state.items.map(item => {
                const copy = { ...item };
                if (copy.id === id) {
                    copy.done = !copy.done;
                }
                array.push(copy);
            });
            return {
                ...state,
                items: array
            }
        }
        case ADD_ITEM: {
            const { title } = action.payload;
            console.log('add item', { payload: action.payload, title });
            const array = state.items.concat({
                text: title,
                done: false,
                id: Math.random()
            });
            return {
                ...state,
                items: array
            }
        }
        default:
            return state
    }
}

export function setItems(items) {
    console.log('setItems', items);
    return {
        type: SET_ITEMS,
        payload: {
            items
        }
    }
}

export function toggleDone(id) {
    return {
        type: TOGGLE_DONE,
        payload: {
            id
        }

    }
}

export function addItem(title) {
    return {
        type: ADD_ITEM,
        payload: {
            title
        }
    }
}