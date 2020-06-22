// Styles
import "./styles/main.scss";
import "./styles/tripTiles.scss";
import "./styles/result.scss";

import { eventListening } from "./js/eventListening";
import { tripSubmit } from "./js/tripSubmit";
import { validateInput } from "./js/validateInput";
import { updateUI } from "./js/updateUI";
import { newSearch } from "./js/newSearch";
import { saveTrip } from "./js/saveTrip";
import { removeTrip } from "./js/removeTrip";
import { clickSavedTrip } from "./js/clickSavedTrip";

export {
    eventListening,
    tripSubmit,
    validateInput,
    updateUI,
    newSearch,
    saveTrip,
    removeTrip,
    clickSavedTrip
}